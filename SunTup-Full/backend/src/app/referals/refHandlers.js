const Database = require('../../config/database');
const logger = require('../../config/logger');
const axios = require('axios');

/**
 * Получает действительный URL аватара Telegram по File ID.
 * @param {string} fileId - File ID аватара.
 * @returns {Promise<string>} - URL аватара.
 */
async function getTelegramFileUrl(fileId) {
  const botToken = '6950963049:AAF0eEr885r0QbhnGxftPw0JyOKWW33Gm9Y'; // Прямо в коде
  try {
    const response = await axios.get(`https://api.telegram.org/bot${botToken}/getFile`, {
      params: { file_id: fileId }
    });
    
    if (response.data.ok) {
      const filePath = response.data.result.file_path;
      return `https://api.telegram.org/file/bot${botToken}/${filePath}`;
    } else {
      throw new Error('Не удалось получить файл');
    }
  } catch (e) {
    logger.error(`Ошибка при получении файла Telegram: ${e.message}`);
    throw e;
  }
}

/**
 * Получает список друзей пользователя по его ID и информацию о наградах за рефералов.
 * @param {number} userId - ID пользователя.
 * @returns {Promise<Array>} - Список друзей пользователя и награды.
 */
async function getReferalsById(userId) {
  try {
    logger.info('Получаем список друзей и наград за рефералов');

    const query = `
      SELECT 
        r.referent_id, 
        r.referal_id, 
        r.referal_name, 
        m.telegram_avatar_url AS referal_avatar, 
        r.total_bonus_coins
      FROM ref r
      LEFT JOIN main m ON r.referal_id = m.user_id
      WHERE r.referent_id = $1
    `;

    const result = await Database.getList(query, [userId]);

    // Получаем действительный URL аватара для каждого реферала
    const referals = await Promise.all(result.map(async (row) => {
      let avatarUrl = '';
      if (row.referal_avatar) {
        avatarUrl = await getTelegramFileUrl(row.referal_avatar);
      }
      return {
        referent_id: row.referent_id,
        referal_id: row.referal_id,
        referal_name: row.referal_name,
        referal_avatar: avatarUrl,
        total_bonus_coins: row.total_bonus_coins
      };
    }));

    return referals;
  } catch (e) {
    logger.error(`Ошибка при получении списка друзей и наград: ${e}`);
    throw e;
  }
}

/**
 * Получает список первых 100 пользователей с их балансами, юзернеймами и аватарами, отсортированный по балансу.
 * @param {number} userId - ID пользователя для добавления его позиции в список.
 * @returns {Promise<Array>} - Список пользователей с балансами, юзернеймами и аватарами.
 */
async function getLeaderboardWithUser(userId) {
  try {
    logger.info('Получаем данные для лидерборда с выделением пользователя');
    
    // Запрос на получение топ 100 пользователей
    const leaderboardQuery = `
      SELECT user_id, telegram_username, wallet, telegram_avatar_url
      FROM main
      ORDER BY wallet DESC
      LIMIT 100
    `;
    const leaderboard = await Database.getList(leaderboardQuery);

    // Логируем данные для отладки
    logger.debug('Лидерборд данные: ', leaderboard);

    // Запрос на получение пользователя и его позиции
    const userRankQuery = `
      SELECT user_id, wallet
      FROM main
      ORDER BY wallet DESC
    `;
    const allUsers = await Database.getList(userRankQuery);
    const userRank = allUsers.findIndex(row => row.user_id === userId) + 1;
    const userData = allUsers.find(row => row.user_id === userId);

    // Логируем позицию пользователя
    logger.debug('Позиция пользователя: ', userRank);

    // Если пользователь не найден в общем списке
    if (!userData) {
      return { leaderboard, user: null };
    }

    // Возвращаем данные лидерборда и пользователя
    return {
      leaderboard,
      user: {
        user_id: userData.user_id,
        wallet: userData.wallet,
        rank: userRank
      }
    };
  } catch (error) {
    logger.error(`Ошибка при получении лидерборда: ${error.message}`);
    throw error;
  }
}


/**
 * Получает место пользователя в рейтинге по его ID.
 * @param {number} userId - ID пользователя.
 * @returns {Promise<object>} - Позиция пользователя в рейтинге.
 */
async function getUserRank(userId) {
  try {
    logger.info('Получаем место пользователя в рейтинге');

    const query = `
      SELECT user_id, wallet
      FROM main
      ORDER BY wallet DESC
    `;

    const result = await Database.getList(query);

    // Поиск позиции пользователя
    const rank = result.findIndex(row => row.user_id == userId) + 1;
    const userStats = result.find(row => row.user_id == userId);

    return {
      rank: rank,
      wallet: userStats ? userStats.wallet : 0
    };
  } catch (e) {
    logger.error(`Ошибка при получении места пользователя: ${e}`);
    throw e;
  }
}

module.exports = {
  getReferalsById,
  getLeaderboardWithUser,
  getUserRank
};
