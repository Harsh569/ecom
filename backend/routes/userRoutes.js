import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  getUsers,
  deleteUser,
  getUsersByID,
  updateUser,
  updateUserProfile,
} from "../controllers/useController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(registerUser).get(protect,admin,getUsers);
router.post("/login", authUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route("/:id").delete(protect,admin,deleteUser).get(protect,admin,getUsersByID).put(protect,admin,updateUser);

export default router;
