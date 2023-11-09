function Message(Sequelize, DataTypes) {
    return Sequelize.define(
      "messages",
      {
        message_id: {
          type: DataTypes.UUID,
          autoIncrement: true,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
        },
        title: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        content: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        is_public: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true, // 메시지를 기본적으로 공개로 만들기
        },
        // message_at: {
        //   type: DataTypes.DATETIME,
        //   allowNull: false,
        // },
        flower_color: {
          type: DataTypes.STRING(10),
          allowNull: false,
        },
        id: {
          type: DataTypes.BIGINT,
          allowNull: false,
        },
      },
      {
        tableName: "messages",
        freezeTableName: true, // 복수 형태 방지
        timestamps: false,
      }
    );
  }
  
  module.exports = Message;
  