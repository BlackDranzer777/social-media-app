const router = require('express').Router();
const messageController = require('../controllers/messageController');

router.post('/', messageController.postMessage);
router.get('/:conversationId', messageController.getMessage);

module.exports = router;