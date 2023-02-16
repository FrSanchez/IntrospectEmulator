import { Router } from 'express';

const router = Router();

router.post('/introspect', (req, res) => {
  return req.context.db.Token.findOne({
    where: { token: req.body.token},
  })
  .then((token) => {
      if (token === null || token === undefined) {
          res.type('json');
          res.status(404).send("");        
      } else {
        const userFid = token.userFid;
        const clientId = token.clientId;
        const isActive = token.active;
        
        const message = {
          active: isActive, 
          client_id: clientId, 
          scope: "pardot_api", 
          sub: "https://login.salesforce.com/id/00Dxx0000001gFAKE1/" + userFid };
        res.send(message);
        }
  })
  .catch((err)=> {
      console.log('There was an error querying token', JSON.stringify(err));
      return res.status(500).send(err)
  });
});

export default router;