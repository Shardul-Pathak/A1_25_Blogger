const Joi = require('joi');
const express = require('express');
const router = express.Router();


const postController = require('../controllers/posts-controller');

router.get('/getposts', postController.getPost);

router.post('/addpost',  postController.addPost);

router.get('/getpostbyid/:pid', postController.getPostById);

module.exports = router;