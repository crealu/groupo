const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');

router.post('/getPosts', postController.getPosts);
router.post('/addPost', postController.addPost);

module.exports = router;