const crypto = require('crypto');

// 비밀번호 암호화
const hashPassword = (password) => {
  const salt = crypto.randomBytes(16).toString("base64");
  const iterations = 100;
  const keylen = 64;
  const digest = "sha512";
  const hashedPw = crypto.pbkdf2Sync(password, salt, iterations, keylen, digest).toString("base64");
  return { hashedPw, salt };
};

// 비밀번호 비교 == 로그인 할 때
const comparePassword = (password, salt, hashedPw) => {
  const iterations = 100;
  const keylen = 64;
  const digest = "sha512";
  const hashedInputPw = crypto.pbkdf2Sync(password, salt, iterations, keylen, digest).toString("base64");
  return hashedInputPw === hashedPw;
};

module.exports = { hashPassword, comparePassword };
