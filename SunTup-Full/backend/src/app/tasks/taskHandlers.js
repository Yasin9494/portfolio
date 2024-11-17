const Database = require('../../config/database');
const logger = require('../../config/logger');
const axios = require('axios');

// Получение всех задач для пользователя
async function getTasksForUser(userId) {
    try {
        const tasks = await Database.getAll(`
            SELECT t.id, t.description, t.reward, t.icon_url, t.link, COALESCE(ut.status, 'not_started') as status
            FROM tasks t
            LEFT JOIN user_tasks ut ON t.id = ut.task_id AND ut.user_id = $1
        `, [userId]);

        if (!tasks || tasks.length === 0) {
            logger.debug(`No tasks found for user ${userId}`);
            return [];
        }
        
        logger.debug(`Fetched tasks for user ${userId}:`, tasks);
        return tasks;
    } catch (e) {
        logger.error(`Error fetching tasks for user ${userId}: ${e.message}`);
        throw new Error('Could not fetch tasks');
    }
}

// Старт задачи
async function startTask(userId, taskId) {
    try {
        await Database.setData(`
            INSERT INTO user_tasks (user_id, task_id, status)
            VALUES ($1, $2, 'in_progress')
            ON CONFLICT (user_id, task_id) DO UPDATE SET status = 'in_progress'
        `, [userId, taskId]);

        logger.debug(`Task ${taskId} for user ${userId} started`);
        return true;
    } catch (e) {
        logger.error(`Error starting task ${taskId} for user ${userId}: ${e.message}`);
        throw new Error('Could not start task');
    }
}

// Проверка задачи
async function checkTask(userId, taskId, link) {
    if (!link) {
        throw new Error('Task link is missing');
    }

    logger.debug(`Checking task for user ${userId} with task ${taskId} and link ${link}`);

    try {
        let status;
        if (link.includes('t.me')) {
            // Проверка подписки на Telegram
            const isSubscribed = await checkTelegramSubscription(userId);
            if (isSubscribed) {
                status = 'completed';
                await completeTask(userId, taskId); // Обновляем статус на "completed"
            } else {
                status = 'in_progress';
            }
        } else {
            // Автоматическое завершение задачи для не Telegram ссылок
            await completeTask(userId, taskId);
            status = 'completed';
        }

        logger.debug(`Task ${taskId} for user ${userId} is now ${status}`);
        return status;
    } catch (e) {
        logger.error(`Error checking task ${taskId} for user ${userId}: ${e.message}`);
        throw new Error('Could not check task');
    }
}

// Завершение задачи
// Завершение задачи
async function completeTask(userId, taskId) {
    try {
        logger.debug(`Executing query to update task with userId=${userId}, taskId=${taskId}`);
        await Database.setData(
            `UPDATE user_tasks SET status = 'completed' WHERE user_id = $1 AND task_id = $2`,
            [userId, taskId]
        );
        logger.debug(`Task ${taskId} for user ${userId} marked as completed`);
        return true;
    } catch (e) {
        logger.error(`Error completing task ${taskId} for user ${userId}: ${e.message}`);
        throw new Error('Could not complete task');
    }
}


// Клейм задачи
async function claimTask(userId, taskId) {
    try {
        const rewardResult = await Database.getFetchval(`
            SELECT reward FROM tasks WHERE id = $1
        `, [taskId]);

        const reward = parseInt(rewardResult, 10);

        await Database.setData(`
            UPDATE user_tasks SET status = 'claimed' WHERE user_id = $1 AND task_id = $2
        `, [userId, taskId]);

        await Database.setData(`
            UPDATE main SET wallet = wallet + $1 WHERE user_id = $2
        `, [reward, userId]);

        logger.debug(`Task ${taskId} for user ${userId} claimed with reward ${reward}`);
        return { success: true, reward };
    } catch (e) {
        logger.error(`Error claiming task ${taskId} for user ${userId}: ${e.message}`);
        throw new Error('Could not claim task');
    }
}

// Проверка подписки на Telegram
async function checkTelegramSubscription(userId) {
    try {
        const botToken = '6950963049:AAF0eEr885r0QbhnGxftPw0JyOKWW33Gm9Y'; // Замените на ваш реальный токен
        const channelId = '-1002218749541'; // Замените на ваш реальный ID канала

        const url = `https://api.telegram.org/bot${botToken}/getChatMember`;
        logger.debug(`Checking Telegram subscription for user ${userId} on channel ${channelId} using URL: ${url}`);

        const response = await axios.get(url, {
            params: {
                chat_id: channelId,
                user_id: userId,
            },
        });

        logger.debug(`Telegram response for user ${userId}: ${JSON.stringify(response.data)}`);

        const isMember =
            response.data.ok &&
            ['member', 'administrator', 'creator'].includes(response.data.result.status);

        if (isMember) {
            logger.debug(`User ${userId} is subscribed to ${channelId}`);
            return true;
        } else {
            logger.debug(`User ${userId} is not subscribed to ${channelId}`);
            return false;
        }
    } catch (e) {
        logger.error(`Error checking Telegram subscription for user ${userId}: ${e.message}`);
        if (e.response && e.response.data) {
            logger.error(`Telegram API error response: ${JSON.stringify(e.response.data)}`);
        }
        throw new Error('Telegram subscription check failed');
    }
}

module.exports = {
    getTasksForUser,
    startTask,
    checkTask,
    claimTask,
};
