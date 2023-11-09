const express = require("express");
const controller = require("../controller/Chome")
const router = express.Router()

// 메인 페이지
router.get("/", controller.home)

// 로그인 페이지
router.get("/login", controller.login)

// 회원 로그인
router.post("/login", controller.loginUser)

// 회원 가입 페이지
router.get("/signup", controller.signup)

// 회원 가입
router.post("/signup", controller.signupUser)

// 개인 정원(롤링페이퍼) 페이지임
router.get("/garden/:user_id", controller.garden)

// 롤링페이퍼 작성
router.post("/garden/:user_id", controller.writeMsg)

// 롤링페이퍼 삭제
router.delete("/garden/:user_id", controller.deleteMsg)

// 랜덤 페이지(users 테이블에 존재하는 user_id 중 랜덤 반환)
// router.get("/garden/:user_id", controller.randomGarden)

module.exports = router;
