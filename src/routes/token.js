import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    return req.context.models.Token.findAll()
        .then((tokens) => res.send(tokens))
        .catch((err)=> {
            console.log('There was an error querying tokens', JSON.stringify(err));
            return res.status(500).send(err)
    });
});

router.get('/:tokenId', (req, res) => {
    return req.context.models.Token.findOne({
        where: { id: req.params.tokenId},
    })
    .then((token) => {
        if (token === null || token === undefined) {
            res.type('json');
            res.status(404).send("");        
        } else {
            res.send(token);
        }
    })
    .catch((err)=> {
        console.log('There was an error querying token', JSON.stringify(err));
        return res.status(500).send(err)
    });
});

router.post('/', (req, res) => {
    const { client_id, token, user_fid, active } = req.body;
    return req.context.models.Token.create({clientId: client_id, token: token, userFid: user_fid , active: active})
    .then((token) => res.send(token))
    .catch(next)
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    return db.Token.findById(id)
      .then((token) => token.destroy())
      .then(() => res.status(204).send(""))
      .catch(next)
  });

export default router;
