const express = require("express");
const controller = require("../controller/Chome")
const router = express.Router()

// 메인 페이지
router.get("/home", controller.home)

// 로그인 페이지
router.get("/home/login", controller.login)

// 회원 로그인
router.post("/home/login", controller.loginUser)

// 회원 가입 페이지
router.get("/home/signup", controller.signup)

// 회원 가입
router.post("/home/signup", controller.signupUser)

// 랜덤 페이지(users 테이블에 존재하는 user_id 중 랜덤 반환)
// router.get("/garden/:user_id", controller.randomGarden)

module.exports = router;
