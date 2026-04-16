let express = require('express');
let router = express.Router();
let commentController = require('../controllers/comments-controller')
const auth = require('../helpers/auth');

router.get('/commentsdata', auth.verifyToken, commentController.getAllCommentList);
router.post('/addcomment', auth.verifyToken, commentController.InsertComment);
router.put('/updatecomment/:cid', auth.verifyToken, commentController.UpdateComment);
router.delete('/deletecomment/:cid', auth.verifyToken, commentController.deleteComment);

module.exports = router;