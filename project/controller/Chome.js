const { db, User, Message, Sequelize } = require('../model');
const pwSalt = require('../model/pwSalt');
const Op = Sequelize.Op;

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
              // user_name ,id 세션에 저장 (로그인 시 유 무를 확인 등)
              req.session.userName = result.user_name;
              req.session.userId = result.id;
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

// 개인 정원(롤링페이퍼) 페이지 랜더
// 로그인 후, 정원 랜더 시 해당 user_id에 해당하는 메시지도 함께 응답에 담아 보냄
exports.garden = (req, res) => {
  User.findOne({
    where: {
      id: req.session.userId,
    },
  }).then((result) => {
    Message.findAll({
      attributes: ['message_id', 'title', 'content', 'is_public'],
      where: { id: req.session.userId },
      include: { model: User },
    }).then((msg) => {
      console.log('msg, result :', result, msg);
      res.render('garden', { result, msg, userName: req.session.userName });
    });
  });
};

// 롤링페이퍼 '작성' 버튼 클릭 시
exports.writeMsg = (req, res) => {
  Message.create({
    ...req.body,
    id: req.session.userId, // messages 테이블 id에 id 값 함께 추가(?)
  }).then((result) => {
    console.log('writeMsg : ', result);
    res.send({ result: true });
  });
};

// 롤링페이퍼 '삭제' 버튼 클릭 시 삭제는 해당 가든의 주인만 가능하다. + 삭제 버튼은 세션이 존재하는 사용자이름과 & 세션의 userName 이 일치하면 생성된다. 아닐 시 존재하지 않는다.
exports.deleteMsg = (req, res) => {
  console.log('req.mesId', req.body.mesId);
  console.log('gdName : ', req.body.gdName);
  if (req.body.gdName == req.session.userName) {
    Message.destroy({
      where: { message_id: req.body.mesId },
    }).then((result) => {
      console.log('deleteMsg : ', result);
      res.send({ result: true });
    });
  } else res.send({ result: false });
};

// '산책하기' 버튼 클릭 시
exports.randomGarden = (req, res) => {
  User.findAll().then((result) => {
    const ranId = Math.floor(Math.random() * result.length);
    const ranData = result[ranId];
    console.log('ranData :', ranData);
    console.log('ranId :', ranId);
    res.send({ data: ranId });
  });
};

// '산책하기' 페이지 랜더
exports.ranGardenPage = (req, res) => {
  console.log('req.params.id :', req.params.id);
  Message.findAll({
    attributes: ['message_id', 'title', 'content', 'is_public'],
    where: { id: req.params.id },
    include: { model: User },
  }).then((msg) => {
    console.log('ran-msg :', msg);
    res.render('garden', { msg, userName: req.session.userName });
  });
};
