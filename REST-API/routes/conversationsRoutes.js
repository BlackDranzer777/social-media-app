const router = require('express').Router();
const conversationController = require('../controllers/conversationController');

router.post('/', conversationController.postConversation);
router.get('/:userId', conversationController.getConversation);

module.exports = router;