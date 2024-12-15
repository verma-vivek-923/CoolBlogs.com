// import user from '../controllers/user.controller.js';
import  express, { application }  from 'express';
import { createBlog, deleteBlog, getAllBlogs, getMyBlog, singleBlog, updateBlog } from '../controllers/blog.controller.js';
import {  } from '../controllers/user.controller.js';
import { isAdmin, isAuthenticated } from '../Middleware/authUser.js';


const router=express.Router();

router.post("/create",isAuthenticated, isAdmin("admin"), createBlog)
router.delete("/delete/:id",isAuthenticated, isAdmin("admin"), deleteBlog)
router.get("/allblogs",getAllBlogs)
router.get("/singleblog/:id", singleBlog);
router.get("/my-blogs",isAuthenticated,isAdmin("admin"),getMyBlog)
router.put("/updateblog/:id",isAuthenticated,isAdmin("admin"),updateBlog)


export default router;
