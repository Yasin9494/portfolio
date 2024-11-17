const express = require('express');
const { getReferalsById, getLeaderboardWithUser, getUserRank } = require('./refHandlers');

const router = express.Router();

// Endpoint для получения списка рефералов пользователя
router.get('/getReferals/:userId', async (req, res) => {
  try {
    const result = await getReferalsById(req.params.userId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint для получения лидерборда с текущим пользователем
router.get('/getLeaderboardWithUser/:userId', async (req, res) => {
  try {
    const result = await getLeaderboardWithUser(req.params.userId);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: 'Leaderboard data not found' });
  }
});

// Endpoint для получения места пользователя в рейтинге
router.get('/getRank/:userId', async (req, res) => {
  try {
    const result = await getUserRank(req.params.userId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
