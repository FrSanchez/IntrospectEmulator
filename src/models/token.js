const getTokenModel = (sequelize, { DataTypes }) => {
    const Token = sequelize.define('token', {
        clientId: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        token: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        userFid: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        }
    });

    Token.findByToken = async (token) => {
        let answer = await User.findOne({
          where: { token: token },
        });
        
        return answer;
      };
  
    return Token;
  };
  
  export default getTokenModel;