module.exports = (sequelize, Sequelize) => {
const User = sequelize.define("user", {
    user_id:{
        // Sequelize module has INTEGER Data_Type.
        type:Sequelize.INTEGER,
        // To increment user_id automatically.
        autoIncrement:true,
        // user_id can not be null.
        allowNull:false,
        // For uniquely identify user.
        primaryKey:true
    },
    first_name: { type: Sequelize.STRING, allowNull:false },
    last_name: { type: Sequelize.STRING, allowNull:false },
    email: { type: Sequelize.STRING, allowNull:false, unique: true },
    password: {type: Sequelize.STRING},
    verified: {type: Sequelize.BOOLEAN},
     // Timestamps
     createdAt: Sequelize.DATE,
     updatedAt: Sequelize.DATE,
  });
  return User;
};