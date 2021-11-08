const router = require('express').Router();
const postController = require('../controllers/postController');

router.post('/', postController.postCreatePost);
router.put('/:id', postController.putUpdatePost);
router.delete('/:id', postController.deleteDeletePost);
router.put('/:id/like', postController.putLikePost);
router.get('/:id', postController.getGetPost);
router.get('/timeline/:userId', postController.getTimelinePost);
router.get('/profile/:username', postController.getUserProfilePost);

module.exports = router;