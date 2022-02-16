const request = require("supertest");
const fs = require('fs');
const app = require("../server/app");

const usersPath = './users.json';
var users = JSON.parse(fs.readFileSync(usersPath));

describe("Test the root path", () => {
    test("It should get 404 response to the GET method", async () => {
        const response = await request(app).get("/");
        expect(response.statusCode).toBe(404);
    });
    test("It should get 200 for a proper POST method", async () => {
        const response = await request(app).post("/services/oauth2/introspect")
            .type('form')
            .send({ token: users[0].token });
        expect(response.statusCode).toBe(200);
    });
    test("It should get 404 for not found user", async () => {
        const response = await request(app).post("/services/oauth2/introspect")
            .type('form')
            .send({ token: 'foo' });
        expect(response.statusCode).toBe(404);
    });

});