var http = require('http');
var qs = require('querystring');
var fs = require('fs');

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
            console.log(today.toLocaleString() + ' Received token: ' + post['token']);
            var user = users.find((u) => u.token == post['token']);
            console.log(today.toLocaleString() + " " + JSON.stringify(user));
            if (typeof(user) == 'undefined') {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end("");
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                answer = JSON.stringify({active: true, 
                    client_id: user.client_id, 
                    scope: "pardot_api", 
                    sub: "https://login.salesforce.com/id/00Dxx0000001gEREAY/" + user.user_fid });
                res.end(answer);
            }
        });
    }
}

var usersPath = './users.json';
function fsReadFileSynchToArray (filePath) {
    var data = JSON.parse(fs.readFileSync(filePath));
    console.log(data);
    return data;
}

fs.watchFile(usersPath, (curr, prev) => {
    console.log("Updating list of users");
    users = fsReadFileSynchToArray(usersPath);
  });

var users = fsReadFileSynchToArray(usersPath);
const server = http.createServer(requestListener);
server.listen(8080);
var today  = new Date();
console.log(today.toLocaleString() + " Started server in port 8080");