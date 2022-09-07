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

  sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
    if (eraseDatabaseOnSync) {
    //   createUsersWithMessages();
    }
  
    app.listen(process.env.PORT, () =>
      console.log(`Example app listening on port ${process.env.PORT}!`),
    );
  });