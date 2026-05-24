import express from "express";
import auth from "../middleware/auth.js";

import {
  createUser,
  getUsers,
  loginUser,
} from "../controllers/userController.js";

const router = express.Router();

// PUBLIC ROUTES
router.post("/register", createUser);
router.post("/login", loginUser);

// PROTECTED ROUTE
router.get("/", auth, getUsers);

export default router;