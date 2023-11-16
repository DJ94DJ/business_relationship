const { User, Message } = require('../model');
const pwSalt = require('../model/pwSalt');

// 마이페이지 랜더
exports.profile = (req, res) => {
  console.log('req.session.userId', req.session.userId);
  User.findOne({
    where: { id: req.session.userId },
  }).then((result) => {
    console.log('result : ', result);
    if (result) res.render('profile', { data: result });
    else res.send({ result: false });
  });
};

// 마이페이지 회원 정보(닉네임, 자기소개, mbti) '수정' 버튼 클릭 시
exports.editUser = (req, res) => {
  User.update(req.body, {
    where: { id: req.session.userId },
  }).then((result) => {
    console.log('editUser : ', result); // update의 결과는 [1] or [0] 배열?로 담겨서 나온다.
    if (result[0]) res.send({ result: true });
    else res.send({ result: false });
  });
};

// 마이페이지 회원 '탈퇴' 버튼 클릭 시
exports.deleteUser = (req, res) => {
  User.destroy({
    where: { id: req.session.userId },
  }).then((result) => {
    console.log('deleteUser : ', result); // 1 or 0 == true or false

    if (result) res.send({ result: true });
    else res.send({ result: false });
  }); // 탈퇴 버튼을 클릭시 세션 destroy(삭제) 코드 추가
};

// 마이페이지 개인 정보 수정 시 비밀번호 인증
exports.searchPw = (req, res) => {
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
