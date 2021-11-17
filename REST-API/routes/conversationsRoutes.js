const router = require('express').Router();
const conversationController = require('../controllers/conversationController');

router.post('/', conversationController.postConversation);
router.get('/:userId', conversationController.getConversation);
router.get('/find/:firstUserId/:secondUserId', conversationController.getConversationOfTwoId);

module.exports = router;