import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    return req.context.db.Token.findAll({
        order: [['clientId', 'ASC']]
    })
        .then((tokens) => res.send(tokens))
        .catch((err)=> {
            console.log('There was an error querying tokens', JSON.stringify(err));
            return res.status(500).send(err)
    });
});

router.get('/:tokenId', (req, res) => {
    return req.context.db.Token.findOne({
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

router.post('/', (req, res, next) => {
    const { clientId, token, userFid, active } = req.body;
    return req.context.db.Token.create({clientId: clientId, token: token, userFid: userFid , active: active})
    .then((token) => res.send(token))
    .catch(next)
});

router.put('/:id', (req, res, next) => {
    const id = parseInt(req.params.id)
    return req.context.db.Token.findByPk(id)
    .then((token) => {
        const { clientId, tkn, userFid, active } = req.body
        return token.update({ clientId, tkn, userFid, active })
        .then(() => res.send(token))
        .catch((err) => {
            console.log('***Error updating token', JSON.stringify(err))
            res.status(400).send(err)
        })
    })
});

router.delete('/', (req, res, next) => {
    console.log('delete all');
    return req.context.db.Token.truncate()
    .then(() => res.status(204).send(''))
    .catch(next)
});

router.delete('/:id', (req, res, next) => {
    const id = parseInt(req.params.id)
    return req.context.db.Token.findByPk(id)
      .then((token) => token.destroy())
      .then(() => res.status(204).send(""))
      .catch(next)
  });

export default router;
