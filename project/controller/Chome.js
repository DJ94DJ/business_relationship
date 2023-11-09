// 메인 페이지 랜더
exports.home = (req, res) => {
  res.render("/home")
}

// 로그인 페이지 랜더
exports.login = (req, res) => {
  res.render("/signin")
}

// '로그인' 버튼 클릭 시
exports.loginUser = (req, res) => {

}

// 회원 가입 페이지 랜더
exports.signup = (req, res) => {
  res.render("/signup")
}

// '가입하기' 버튼 클릭 시
exports.signupUser = (req, res) => {}

// 개인 정원(롤링페이퍼) 페이지 랜더
exports.garden = (req, res) => {
  res.render("/garden")
}

// 롤링페이퍼 '작성' 버튼 클릭 시
exports.writeMsg = (req, res) => {
  
}

// 롤링페이퍼 '삭제' 버튼 클릭 시
exports.deleteMsg = (req, res) => {

}


// '랜덤 방문' 버튼 클릭 시
// exports.randomGarden= (req, res) => {}