const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');
const validation = require('../helpers/validation');
const auth = require('../helpers/auth');

// CRUD
// C - Create
// R - Read
// U - Update
// D - Delete

router.get('/getallusers',  userController.getusers);

// http://localhost:3000/getuserbyid/2/amit/amit@gmail.com/abc123
router.get('/getuserbyid/:uid', userController.getuserbyid);

router.post('/adduser', userController.addUser);

router.post('/login', userController.login);

router.put('/updateuser/:uid', userController.updateUser );

router.delete('/deleteuser/:uid', userController.deleteUser);

router.put("/updatestatus",auth.verifyToken, userController.updateStatus );

module.exports = router;