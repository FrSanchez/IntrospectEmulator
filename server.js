var http = require('http');
var qs = require('querystring');

// The users already exist in the shard user's table
// the SFDC org id is not required
// token is used to identify the user from the call
var users = [
    {client_id: 1, token: "token2", user_fid: "005xx000001Sv6AAAR"},
    {client_id: 315, token: "token1", user_fid: "005xx000001Sv6AAAS"},
    {client_id: 340, token: "token3", user_fid: "005xx000001Sv6AAAT"}
];

const requestListener = function (request, res) {
    if (request.method == 'POST') {
        var body = '';

        request.on('data', function (data) {
            body += data;

            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6)
                request.connection.destroy();
        });

        request.on('end', function () {
            var post = qs.parse(body);
            console.log('token: ' + post['token']);
            var user = users.find((u) => u.token == post['token']);
            console.log(user);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            answer = JSON.stringify({active: true, client_id: user.client_id, scope: "pardot_api", sub: "https://login.salesforce.com/id/00Dxx0000001gEREAY/" + user.user_fid });
            res.end(answer);
        });
    }
}

const server = http.createServer(requestListener);
server.listen(8080);