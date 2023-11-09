const { User, Message } = require('../model')

// 개인 정원(롤링페이퍼) 페이지 랜더
exports.garden = (req, res) => {
  res.render("/garden")
}

// 롤링페이퍼 '작성' 버튼 클릭 시
exports.writeMsg = (req, res) => {
  Message.create(req.body).then((result) => {
    console.log("writeMsg : ", result)
    res.send({result: true})
  })
}

// 롤링페이퍼 '삭제' 버튼 클릭 시
// 롤링페이퍼 삭제는 해당 가든의 주인만 가능하다.
// 구분은 세션에 존재하는 id로 구분을 할 예정이다.
// == message_id 가 session_user_id에 user_messages 안에 있을 때 삭제가 가능하다.
exports.deleteMsg = (req, res) => {
  Message.destroy({
    where: {message_id: req.body.message_id}
  }).then((result) => {
    console.log("deleteMsg : ", result)
    if (result) res.send({ result: true })
    else res.send({ result: false })
  })
}

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
  res.render("/profile")
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
