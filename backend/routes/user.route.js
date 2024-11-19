// import user from '../controllers/user.controller.js';
import  express, { application }  from 'express';
import { getAllAdmin, getMyProfile, login, logout, register } from '../controllers/user.controller.js';
import { isAuthenticated } from '../Middleware/authUser.js';


const router=express.Router();

router.post("/register",register)
router.post("/login",login)
router.post("/logout",isAuthenticated,logout)
router.post("/my-profile",isAuthenticated,getMyProfile)
router.post("/admins",getAllAdmin);

export default router;
