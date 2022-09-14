import { Router } from 'express';
import { Op } from 'sequelize';

const router = Router();

router.get('/', (req, res) => {
    req.context.db.Token.sync();
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

router.post('/', (req, res) => {
    const { clientId, token, userFid, active } = req.body;
    console.log(req.body);
    console.log(token, userFid);
    return req.context.db.Token.findAndCountAll({
        where: {
            [Op.or]: [
                { token: req.body.token },
                { userFid: req.body.userFid }
            ]
        }
    }).then((data)=> {
        if (data.count > 0) {
            res.status(400).send({err: 101, message: "Duplicate values found"});
        } else {
            return req.context.db.Token.create({clientId: clientId, token: token, userFid: userFid , active: active})
            .then((token) => res.send(token))
            .catch((err) => {
                console.log(err.name, '***Error inserting token', JSON.stringify(err))
                res.status(400).send(err)
            })        
        }
    })
    .catch(err=>{
        console.log("**Findall error => ", err);
    });
});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    return req.context.db.Token.findByPk(id)
    .then((dbToken) => {
        const { clientId, token, userFid, active } = req.body
        return dbToken.update({ clientId, token, userFid, active })
        .then(() => res.send(dbToken))
        .catch((err) => {
            console.log('***Error updating token', JSON.stringify(err))
            res.status(400).send(err)
        })
    })
});

router.delete('/', (req, res) => {
    console.log('delete all');
    return req.context.db.Token.truncate()
    .then(() => res.status(204).send(''))
    .catch((err) => {
        console.log('***Error deleing all tokens ', JSON.stringify(err))
        res.status(500).send(err)
    })
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    return req.context.db.Token.findByPk(id)
      .then((token) => token.destroy())
      .then(() => res.status(204).send(""))
      .catch((err) => {
        console.log('***Error deleing 1 token ', JSON.stringify(err))
        res.status(500).send(err)
    })
  });

export default router;
