import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import db from './models';

import routes from './routes';
const eraseDatabaseOnSync = false;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use((req, res, next) => {
    req.context = {
      db
    };
    next();
  });

  app.use('/services/oauth2', routes.oauth2);
  app.use('/api/tokens', routes.token);
  app.use(express.static(__dirname + '/static'));

    //  app.use((error, req, res) => {
//     if (!error.statusCode) error.statusCode = 500;
  
//     if (error.statusCode === 301) {
//       return res.status(301).redirect('/not-found');
//     }
  
//     return res
//       .status(error.statusCode)
//       .json({ error: error.toString() });
//   });

  db.sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
    if (eraseDatabaseOnSync) {
      createTokens();
    }
  
    app.listen(process.env.PORT, () =>
      console.log(`Example app listening on port ${process.env.PORT}!`),
    );
  });

  const createTokens = async () => {
  };