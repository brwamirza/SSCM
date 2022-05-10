module.exports = (sequelize, Sequelize) => {
    const Token = sequelize.define("token", {
        token_id:{
            // Sequelize module has INTEGER Data_Type.
            type:Sequelize.STRING,
            // For uniquely identify user.
            primaryKey:true
        },
        email: { type: Sequelize.STRING, allowNull:false, unique: true },
         // Timestamps
         createdAt: Sequelize.DATE,
         updatedAt: Sequelize.DATE,
      });
      return Token;
    };