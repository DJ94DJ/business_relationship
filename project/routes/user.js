const express = require('express');
const controller = require('../controller/Cuser');
const router = express.Router();

// 마이페이지
router.get('/profile', controller.profile);

// 마이페이지 개인 정보 수정 시 비밀번호 인증
router.post('/profile', controller.searchPw);

// 마이페이지 회원 정보(닉네임, 자기소개, mbti) 수정
router.patch('/profile', controller.editUser);

// 마이페이지 회원 탈퇴
router.delete('/profile', controller.deleteUser);

module.exports = router;
