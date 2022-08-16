const express = require('express');
const { getAllBlogs, addBlogs, getBlog, updateBlog, deleteBlog, getByUserID } = require('../controllers/BlogController');
const router = express.Router();

router.get('/', getAllBlogs);
router.post('/addblog', addBlogs);
router.get('/:id', getBlog);
router.put('/updateblog/:id', updateBlog);
router.delete('/deleteblog/:id', deleteBlog);
router.get('/user/:id', getByUserID);

module.exports = router;