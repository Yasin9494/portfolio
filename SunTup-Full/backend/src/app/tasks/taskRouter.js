const express = require('express');
const { startTask, claimTask, getTasksForUser, checkTask } = require('./taskHandlers');
const logger = require('../../config/logger');

const router = express.Router();

// Получение всех задач для пользователя
router.get('/tasks/:userId', async (req, res) => {
    try {
        const tasks = await getTasksForUser(req.params.userId);
        res.json(tasks);
    } catch (error) {
        logger.error(`Error fetching tasks for user ${req.params.userId}: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
});

// Начало задачи
router.post('/tasks/:userId/start/:taskId', async (req, res) => {
    try {
        const result = await startTask(req.params.userId, req.params.taskId);
        res.json({ success: result });
    } catch (error) {
        logger.error(`Error starting task ${req.params.taskId} for user ${req.params.userId}: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
});

// Проверка задачи
router.post('/tasks/:userId/check/:taskId', async (req, res) => {
    try {
        const { userId, taskId } = req.params;
        const { link } = req.body; // Получаем link из тела запроса

        if (!link) {
            throw new Error('Link is required');
        }

        const status = await checkTask(userId, taskId, link);
        res.json({ status });
    } catch (error) {
        logger.error(`Error in task check route for user ${req.params.userId}, task ${req.params.taskId}: ${error.stack}`);
        res.status(500).json({ error: error.message });
    }
});


// Заявка на награду после завершения задачи
router.post('/tasks/:userId/claim/:taskId', async (req, res) => {
    try {
        const result = await claimTask(req.params.userId, req.params.taskId);
        res.json({ success: result });
    } catch (error) {
        logger.error(`Error claiming task ${req.params.taskId} for user ${req.params.userId}: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
