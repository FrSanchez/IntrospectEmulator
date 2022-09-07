import Sequelize from 'sequelize';

import getTokenModel from './token';

const sequelize = new Sequelize(
    'tokenDB', null, null, {
        dialect: "sqlite",
        storage: './data/tokens.sqlite',
    });


const models = {
    Token: getTokenModel(sequelize, Sequelize),
  };
  
  Object.keys(models).forEach((key) => {
    if ('associate' in models[key]) {
      models[key].associate(models);
    }
  });
  
  export { sequelize };
  
  export default models;