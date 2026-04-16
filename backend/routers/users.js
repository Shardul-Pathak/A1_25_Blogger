let express = require('express');
let router = express.Router();
let userController = require('../controllers/users-controller')
let validation = require('../helper/validation')
const auth = require('../helpers/auth');

router.post('/login',userController.userLogin);
router.post('/adduser', validation.userValidation ,userController.addUserDetail);
router.get('/getuser', auth.verifyToken, userController.getUserDetail);
router.post('/verify', auth.verifyToken, userController.verifyToken);
router.post('/logout', auth.verifyToken, userController.logout);

module.exports= router;
