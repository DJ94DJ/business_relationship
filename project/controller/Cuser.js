const { User, Message } = require('../model')

// 마이페이지 랜더
exports.profile = (req, res) => {
  if(req.session.user_p_id) {
    User.fineOne({
      where: { id: req.session.user_p_id }
    }).then((result) => {
      console.log("profile : ", result)

      if(result) res.render("profile", { data: result })
      else res.send({result: false})
    }) 
  } else {
    res.send({ result: false })
  }
}

// 마이페이지 랜더
exports.profile = (req, res) => {
  res.render("profile")
}

// 마이페이지 회원 정보 '수정' 버튼 클릭 시
exports.editUser = (req, res) => {

  User.update(req.body, {
    where: { id: req.session.user_p_id }
  }).then((result) => {
    console.log("editUser : ", result) // update의 결과는 [1] or [0] 배열?로 담겨서 나온다.
    if (result[0]) res.send({ result: true })
    else res.send({ result: false })
  })
}

// 마이페이지 회원 '탈퇴' 버튼 클릭 시
exports.deleteUser = (req, res) => {

  User.destroy({
    where: { id: req.session.user_p_id },
  }).then((result) => {
    console.log("deleteUser : ", result) // 1 or 0

    if (result) res.send({ result: true })
    else res.send({ result: false })
  })

}
