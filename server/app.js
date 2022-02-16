const express = require("express");
const app = express();
const log4js = require("log4js");
const fs = require('fs');

const logger = log4js.getLogger();
var environment = process.env.NODE_ENV
const usersPath = './users.json';
const introspectPath = '/services/oauth2/introspect';

logger.level = 'debug';

app.use(express.urlencoded({
    extended: true
}))


app.post(introspectPath, (req, res) => {
    logger.info("received call");
    logger.debug(req.body);
    var user = users.find((u) => u.token == req.body.token);
    if (typeof(user) == 'undefined') {
        logger.debug("user not found!");
        res.type('json');
        res.status(404).send("");
    } else {
        logger.debug(JSON.stringify(user));
        const result = {
            active: true, 
            client_id: user.client_id, 
            scope: "pardot_api", 
            sub: "https://login.salesforce.com/id/00Dxx0000001gFAKE1/" + user.user_fid };
        res.json(result);
    }
})

app.get('*', (req, res) => {
    logger.debug("Invalid GET");
    res.type('json');
    res.status(404).send("");
})

app.post('*', (req, res) => {
    logger.debug("Invalid POST");
    res.type('json');
    res.status(404).send("");
})


function fsReadFileSynchToArray (filePath) {
    var data = JSON.parse(fs.readFileSync(filePath));
    logger.info("Loading users...");
    logger.debug(data);
    logger.info("...done!")
    return data;
}

if (environment !== 'test') {
    logger.info("Skip watchfile");
    fs.watchFile(usersPath, (curr, prev) => {
        logger.info("Updating list of users");
        users = fsReadFileSynchToArray(usersPath);
    });
}

var users = fsReadFileSynchToArray(usersPath);

module.exports = app;