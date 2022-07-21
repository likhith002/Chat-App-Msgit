const express = require("express");

const router = express.Router();

const {
  register,
  authUser,
  allUsers,
} = require("../Controller/userController");

const { protect } = require("../Middlewares/authMiddleware");

router.post("/", register);

router.get("/", protect, allUsers);
router.post("/login", authUser);
module.exports = router;
