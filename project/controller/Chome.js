const { User, Message } = require('../model');
const pwSalt = require('../model/pwSalt');

// 메인 페이지 랜더
exports.home = (req, res) => {
  res.render('home');
};

// 로그인 페이지 랜더
exports.signIn = (req, res) => {
  res.render('signin');
  console.log('로그인 페이지 이동');
};

// 로그인 버튼 클릭 시 (암호화 추가 버전)
exports.signInUser = (req, res) => {
  User.findOne({
    where: {
      user_id: req.body.user_id,
    },
  })
    .then((result) => {
      if (result) {
        pwSalt
          .comparePassword(
            req.body.user_pw,
            result.user_pw_salt,
            result.user_pw,
          )
          .then((pwCorrect) => {
            if (pwCorrect) {
              req.session.user_id = result.user_id; // user_id도 세션에 저장 (개인 가든으로 이동하기 위함)
              req.session.user = result.id;
              console.log('signInUser : ', result);
              console.log('session', req.session);
              res.send({ result: true });
            } else {
              res.send({ result: false });
            }
          })
          .catch((error) => {
            console.error('pw error : ', error);
            res.send({ result: false });
          });
      } else {
        res.send({ result: false });
      }
    })
    .catch((error) => {
      console.error('no user : ', error);
      res.send({ result: false });
    });
};

// '로그아웃' 버튼 클릭 시
exports.signOut = (req, res) => {
  // 접속중인 사용자 세션 삭제 후 요청을 보낼 코드
  req.session.destroy((err) => {
    if (err) throw err;
    res.send({ result: true });
  });
};

// 회원 가입 페이지 랜더
exports.signUp = (req, res) => {
  res.render('signup');
};

// 회원가입 -> 아이디 중복체크 버튼 클릭 시
exports.idCheck = (req, res) => {
  console.log('req.body.user_id : ', req.body.user_id);
  User.findOne({
    where: {
      user_id: req.body.user_id,
    },
  })
    .then((result) => {
      console.log('idCheck result : ', result);
      if (result) {
        res.send({ result: false }); // 아이디가 존재할 시 false를 보냄
      } else res.send({ result: true });
    })
    .catch((err) => {
      res.send({ result: err });
    });
};

// 회원가입 버튼 클릭 시 (암호화 비교 추가)
exports.signUpUser = (req, res) => {
  const { user_id, user_pw, user_name, user_intro_self, user_mbti } = req.body;

  pwSalt
    .hashPassword(user_pw)
    .then(({ hashedPw, salt }) => {
      User.create({
        user_id: user_id,
        user_pw: hashedPw,
        user_pw_salt: salt,
        user_name: user_name,
        user_intro_self: user_intro_self,
        user_mbti: user_mbti,
      })
        .then((result) => {
          console.log('signUpUser', result);
          res.send({ result: true });
        })
        .catch((error) => {
          console.error('user 생성 에러', error);
          res.send({ result: false });
        });
    })
    .catch((error) => {
      console.error('암호화 에러', error);
      res.send({ result: false });
    });
};

// user_id 가져오기 테스트
exports.getUserId = (req, res) => {
  const userId = req.session.user_id;
  res.send({ user_id: userId });
};

// 개인 정원(롤링페이퍼) 페이지 랜더
exports.garden = (req, res) => {
  const userId = req.session.user_id;
  User.findOne({
    where: {
      user_id: userId,
    },
  }).then((result) => {
    res.render('garden', { data: result });
  });
};

// 롤링페이퍼 '작성' 버튼 클릭 시
exports.writeMsg = (req, res) => {};

// 롤링페이퍼 '삭제' 버튼 클릭 시
exports.deleteMsg = (req, res) => {};

// '산책하기' 버튼 클릭 시
// exports.randomGarden= (req, res) => {}
