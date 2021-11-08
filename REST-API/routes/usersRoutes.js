const router = require('express').Router();
const userController = require('../controllers/userController');

router.put('/:id', userController.putUpdateUser);
router.delete('/:id', userController.deleteDeleteUser);
router.get('/', userController.getGetUser);
router.put('/:id/follow', userController.putFollowUser);
router.put('/:id/unfollow', userController.putUnfollowUser);
router.get('/friends/:userId', userController.getGetFriends);

module.exports = router;