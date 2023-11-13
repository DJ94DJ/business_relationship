const Sequelize = require('sequelize');

const config = require('../config/config.json')['development'];

const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Message = require('./Mess')(sequelize, Sequelize);
db.User = require('./User')(sequelize, Sequelize);

// Message 모델에서 User 모델로의 관계 설정
db.Message.belongsTo(db.User, {
  foreignKey: 'id', // Message 모델에서의 외래 키
  targetKey: 'id', // User 모델에서의 대상 키
});

// User 모델에서 Message 모델로의 관계 설정
db.User.hasMany(db.Message, {
  foreignKey: 'id', // User 모델에서의 외래 키
  sourceKey: 'id', // Message 모델에서의 소스 키
});

module.exports = db;
