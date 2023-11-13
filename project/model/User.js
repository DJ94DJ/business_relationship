function User(Sequelize, DataTypes) {
  return Sequelize.define(
    'Users',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true,
        defaultValue: Sequelize.UUIDV4,
      },
      user_id: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      user_pw: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      user_pw_salt: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      user_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      // sign_in_at: {
      //   type: DataTypes.DATETIME,
      //   allowNull: false,
      // },
      user_intro_self: {
        type: DataTypes.STRING(255),
        defaultValue: '',
      },
      user_mbti: {
        type: DataTypes.STRING(4),
        allowNull: false,
      },
      user_messages: {
        type: DataTypes.BIGINT,
        defaultValue: 0,
      },
      user_img: {
        type: DataTypes.STRING(255),
      },
    },
    {
      tableName: 'Users',
      freezeTableName: true, //복수 형태 방지
      timestamps: false,
    },
  );
}

module.exports = User;
