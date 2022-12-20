const express = require('express');
const router = express.Router();

const postsCtrl = require('../controllers/posts');
const likesCtrl = require('../controllers/likes');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


//Create and modify posts
router.get('/',postsCtrl.getAllPosts);
router.post('/',auth, multer, postsCtrl.createPost);
router.get('/:id',auth, postsCtrl.getOnePost);
router.put('/:id',auth, multer, postsCtrl.modifyPost);
router.delete('/:id',auth, postsCtrl.deletePost);

//Add and remove posts review
router.post('/:id/like',auth, likesCtrl.addLikeOrDislike);

module.exports = router;
