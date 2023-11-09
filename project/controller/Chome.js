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
    console.log(result)
    if(result) {
      res.send({result: true})
    } else res.send({result: false})
  })

}

// 회원 가입 페이지 랜더
exports.signUp = (req, res) => {
  res.render("signup")
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