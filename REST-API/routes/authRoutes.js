const router = require('express').Router();
const userController = require('../controllers/userController');

//Auth Routes
router.post('/register', userController.postRegister);
router.post('/login', userController.postLogin);

module.exports = router;