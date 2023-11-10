const { User, Message } = require('../model')
// 메인 페이지 랜더
exports.home = (req, res) => {
  res.render("home")
}

// 로그인 페이지 랜더
exports.signIn = (req, res) => {
  res.render("signin")
}

// '로그인' 버튼 클릭 시
exports.signInUser = (req, res) => {
  User.findOne({
    where: {
      user_id: req.body.user_id, 
      user_pw: req.body.user_pw
    }
  }).then((result) => {
    console.log("signInUser : ", result)
    if(result) {
      res.send({result: true})
    } else res.send({result: false})
  })
}

// '로그아웃' 버튼 클릭 시
exports.signOut = (req, res) => {
  // 접속중인 사용자 세션 삭제 후 요청을 보낼 코드 작성
}

// 회원 가입 페이지 랜더
exports.signUp = (req, res) => {
  res.render("signup")
}

// 회원가입 -> 아이디 중복체크 버튼 클릭 시
exports.idCheck = (req, res) => {
  User.findOne({
    where: {
      user_id: req.body.user_id
    }
  }).then((result) => {
    console.log("idCheck : ", result)
    if(result) {
      res.send({result: false}) // 아이디가 존재할 시 false를 보냄
    } else res.send({result: true}) // 아이디가 존재하지 않을 시 true ''
  })
}

// '회원가입' 버튼 클릭 시
exports.signUpUser = (req, res) => {
  User.create(req.body).then((result) => {
    console.log("signupUser : ", result)
    res.send({result : true})
  })
}

// 개인 정원(롤링페이퍼) 페이지 랜더
exports.garden = (req, res) => {
  res.render("garden")
}

// 롤링페이퍼 '작성' 버튼 클릭 시
exports.writeMsg = (req, res) => {
  
}

// 롤링페이퍼 '삭제' 버튼 클릭 시
exports.deleteMsg = (req, res) => {

}


// '랜덤 방문' 버튼 클릭 시
// exports.randomGarden= (req, res) => {}