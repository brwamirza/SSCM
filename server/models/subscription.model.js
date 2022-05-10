module.exports = (sequelize, Sequelize) => {
    const Subscription = sequelize.define("subscription", {
        subscription_id:{
            // Sequelize module has INTEGER Data_Type.
            type:Sequelize.INTEGER,
            // To increment user_id automatically.
            autoIncrement:true,
            // user_id can not be null.
            allowNull:false,
            // For uniquely identify user.
            primaryKey:true
        },
        // user_id: { type: Sequelize.INTEGER, allowNull:false },
        // membership_id: { type: Sequelize.INTEGER, allowNull:false },
        start_date: { type: Sequelize.DATE, defaultValue: Sequelize.NOW},
        end_date: {type: Sequelize.DATE},
        status: {type: Sequelize.STRING,allowNull:false},
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      });
      return Subscription;
    };