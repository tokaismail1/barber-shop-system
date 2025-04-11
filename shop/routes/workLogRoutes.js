const express = require('express');
const router = express.Router();
const workLogController = require('../controllers/workLogController');

router.get('/logs', workLogController.getAllLogs);
router.post('/add', workLogController.createLog);
router.get('/logs/by-date', workLogController.getLogsByDate);
router.get('/logs/last-month', workLogController.getLogsOfLastMonth);
router.delete('/logs/by-date', workLogController.deleteLogsByDate);
router.delete('/logs/last-month', workLogController.deleteLogsOfLastMonth);
module.exports = router;