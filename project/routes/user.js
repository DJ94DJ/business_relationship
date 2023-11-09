const express = require("express");
const controller = require("../controller/Cuser")
const router = express.Router()

// 개인 정원(롤링페이퍼) 페이지임
router.get("/garden/:user_id", controller.garden)

// 롤링페이퍼 작성
router.post("/garden/:user_id", controller.writeMsg)

// 롤링페이퍼 삭제
router.delete("/garden/:user_id", controller.deleteMsg)

// 마이페이지
router.get("/user/profile/:id", controller.profile)

// 마이페이지 회원 정보 수정
router.patch("/user/profile/:id", controller.editUser)

// 마이페이지 회원 탈퇴
router.delete("/user/profile/:id", controller.deleteUser)

module.exports = router;
