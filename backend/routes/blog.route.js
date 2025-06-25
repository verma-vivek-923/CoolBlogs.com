// import user from '../controllers/user.controller.js';
import  express, { application }  from 'express';
import { createBlog,  deleteBlog, getAllBlogs, getMyBlog, getSearchedBlog, singleBlog, updateBlog } from '../controllers/blog.controller.js';
import {  } from '../controllers/user.controller.js';
import { isAdmin, isAuthenticated } from '../Middleware/authUser.js';
import { createComment, deleteComment, editComment, getAllComment, likeBlog } from '../controllers/blog_activity.controller.js';


const router=express.Router();

router.post("/create",isAuthenticated, isAdmin("admin"), createBlog)
router.delete("/delete/:id",isAuthenticated, isAdmin("admin"), deleteBlog)
router.get("/allblogs",getAllBlogs)
router.get("/singleblog/:id", singleBlog);
router.get("/my-blogs",isAuthenticated,isAdmin("admin"),getMyBlog)
router.get("/search/:text",getSearchedBlog)
router.put("/updateblog/:id",isAuthenticated,isAdmin("admin"),updateBlog)

//handle like
router.post("/:blogid/like-blog",isAuthenticated,likeBlog);

//handle commment
router.post("/:blogId/add-comment",isAuthenticated,createComment)

router.post("/:blogId/get-all-comment",getAllComment);

router.put("/:blogId/edit-comment",isAuthenticated,editComment);
router.delete("/:blogId/delete-comment",isAuthenticated,deleteComment);

export default router;
