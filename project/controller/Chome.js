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


// '랜덤 방문' 버튼 클릭 시
exports.randomGarden= (req, res) => {

}