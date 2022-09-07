import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import models, { sequelize } from './models';

import routes from './routes';
const eraseDatabaseOnSync = true;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use((req, res, next) => {
    req.context = {
      models,
    };
    next();
  });

  app.use('/services/oauth2', routes.oauth2);
  app.use('/tokens', routes.token);

  app.get('*', function (req, res, next) {
    const error = new Error(
        `${req.ip} tried to access ${req.originalUrl}`,
      );
    
      error.statusCode = 301;
    
      next(error);
  });

  app.use((error, req, res, next) => {
    if (!error.statusCode) error.statusCode = 500;
  
    if (error.statusCode === 301) {
      return res.status(301).redirect('/not-found');
    }
  
    return res
      .status(error.statusCode)
      .json({ error: error.toString() });
  });

  sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
    if (eraseDatabaseOnSync) {
      createTokens();
    }
  
    app.listen(process.env.PORT, () =>
      console.log(`Example app listening on port ${process.env.PORT}!`),
    );
  });

  const createTokens = async () => {
  };