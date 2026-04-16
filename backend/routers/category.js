const express = require('express')
const router = express.Router()
const catController = require('../controllers/categroy-controller');
const auth = require('../helpers/auth');

router.get('/catlist', auth.verifyToken, catController.getcategory)

router.post('/addcat', auth.verifyToken, catController.addCategory)

router.put('/updatecat/:cid', auth.verifyToken, catController.updateStatus)

router.delete('/deletecat/:cid', auth.verifyToken, catController.deletecat)

module.exports = router;