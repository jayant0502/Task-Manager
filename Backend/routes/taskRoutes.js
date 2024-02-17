const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const taskController = require('../controllers/taskController');

router.get('/test',auth,taskController.getTask);
router.post('/addTask',auth,taskController.addTask);

module.exports = router;
