const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/Auther-controller');
const auth = require('../helpers/auth');

router.get('/authlist', auth.verifyToken, AuthController.getAutherDetail)

router.post('/addauth', auth.verifyToken, AuthController.addAutherDetail)

router.put('/updateauth/:cid', auth.verifyToken, AuthController.updateAutherDetail)

router.delete('/deleteauth/:cid', auth.verifyToken, AuthController.deleteAutherDetail)

module.exports = router;