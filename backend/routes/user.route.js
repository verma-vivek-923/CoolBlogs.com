// import user from '../controllers/user.controller.js';
import  express, { application }  from 'express';
import { resetPassword, sendOtp, validateOtp } from '../controllers/password.controller.js';
import { getAllAdmin, getMyProfile, login, logout, register, updateUser } from '../controllers/user.controller.js';
import { isAdmin, isAuthenticated } from '../Middleware/authUser.js';
import { followAuthor } from '../controllers/author_activity.controller.js';


const router=express.Router();

router.post("/register",register)
router.post("/login",login)
router.get("/logout",isAuthenticated,logout)
router.get("/my-profile",isAuthenticated,getMyProfile)
router.get("/admins",getAllAdmin);
router.put("/updateuser/:id",isAuthenticated,isAdmin("admin"),updateUser);
router.post("/forgot-password",sendOtp);
router.post("/verifyotp",validateOtp);
router.post("/reset-password",resetPassword)

//Handle Followers

router.post("/:userId/follow",
    isAuthenticated,
    followAuthor)

export default router;
