const express = require('express')
const router = express.Router()
const postController  = require("../controllers/post-controller");
const auth = require('../helpers/auth');


router.get('/posts', auth.verifyToken, postController.getpostsdetails);
router.post('/addpost', auth.verifyToken, postController.addPosts);
router.put('/updatepost/:cid', auth.verifyToken, postController.updatePosts);
router.delete('/deletepost/:cid', auth.verifyToken, postController.deletePosts);






module.exports = router;