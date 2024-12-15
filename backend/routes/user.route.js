// import user from '../controllers/user.controller.js';
import  express, { application }  from 'express';
import { getAllAdmin, getMyProfile, login, logout, register } from '../controllers/user.controller.js';
import { isAuthenticated } from '../Middleware/authUser.js';


const router=express.Router();

router.post("/register",register)
router.post("/login",login)
router.get("/logout",isAuthenticated,logout)
router.get("/my-profile",isAuthenticated,getMyProfile)
router.get("/admins",getAllAdmin);

export default router;
