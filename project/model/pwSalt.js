const crypto = require("crypto");

// 비밀번호 암호화
const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(16, (err, buf) => {
      if (err) {
        reject(err);
      }
      const salt = buf.toString("base64");
      const iterations = 100;
      const keylen = 64;
      const digest = "sha512";
      crypto.pbkdf2(password, salt, iterations, keylen, digest, (err, derivedKey) => {
        if (err) {
          reject(err);
        }
        const hashedPw = derivedKey.toString("base64");
        resolve({ hashedPw, salt });
      });
    });
  });
};

// 비밀번호 비교 == 로그인 할 때
const comparePassword = (password, salt, hashedPw) => {
  return new Promise((resolve, reject) => {
    const iterations = 100;
    const keylen = 64;
    const digest = "sha512";
    const hashedInputPw = crypto.pbkdf2(password, salt, iterations, keylen, digest, (err, derivedKey) => {
      if (err) {
        reject(err);
      }
      const hashedInputPw = derivedKey.toString("base64");
      resolve(hashedInputPw === hashedPw);
    });
  });
};

module.exports = { hashPassword, comparePassword };
