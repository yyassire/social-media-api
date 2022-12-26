import express from "express";
import { login, register } from "../controllers/auth.js";

const router = express.Router();
router.get("/", async (req, res) => {
  return res.status(200).json("success");
});
router.post("/register", register);
router.post("/login", login);

export default router;
