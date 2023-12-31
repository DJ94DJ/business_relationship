const express = require('express');
const controller = require('../controller/Chome');

const router = express.Router();

// 메인 페이지
router.get('/', controller.home);

// 로그인 페이지
router.get('/signin', controller.signIn);

// 회원 로그인
router.post('/signin', controller.signInUser);

// 회원 로그아웃
router.post('/signout', controller.signOut);

// 회원 가입 페이지
router.get('/signup', controller.signUp);

// 회원 가입
router.post('/signup', controller.signUpUser);

// 아이디 중복 체크
router.post('/signup/idCheck', controller.idCheck);

// 개인 정원(롤링페이퍼) 페이지
router.get('/garden', controller.garden);

// 메시지 가져오기
router.post('/garden/getMes', controller.getMes);

// 롤링페이퍼 작성
router.post('/garden', controller.writeMsg);

// 롤링페이퍼 삭제
router.delete('/garden', controller.deleteMsg);

// 랜덤 페이지(users 테이블에 존재하는 user_id 중 랜덤 반환)
router.get('/garden/random', controller.randomGarden);

// 랜덤 페이지 이동
router.get('/garden/:id', controller.ranGardenPage);

module.exports = router;
