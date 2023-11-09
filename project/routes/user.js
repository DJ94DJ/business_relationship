const express = require("express");
const controller = require("../controller/Cuser")
const router = express.Router()

// 마이페이지
router.get("/profile/:id", controller.profile)

// 마이페이지 회원 정보 수정
router.patch("/profile/:id", controller.editUser)

// 마이페이지 회원 탈퇴
router.delete("/profile/:id", controller.deleteUser)

module.exports = router;