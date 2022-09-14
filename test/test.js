var assert = require("assert");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server=require("../src");
let should = chai.should();



chai.use(chaiHttp);
describe("Tokens", function(){

    describe ("CRUD OPERATIONS", function(){

        var token1 = 0;
        it("Should add a token into DB", (done) => {
            const token = { 
                clientId: 201,
                token: "CustomToken201", 
                userFid: "005xx000Cust023d00"};
            chai.request(server)
                .post("/api/tokens/")
                .send(token)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        })

        it ("Should Fecth all the tokens", (done)=>{
            chai.request(server)
                .get("/api/tokens/")
                .end((err, result)=>{
                    result.should.have.status(200);
                    const tokens = result.body;
                    console.log('Received tokens ', tokens);
                    assert.equal(tokens.length, 4);
                    token1 = tokens[0].id;
                    done()
                })
        })

        it("should fetch one token", (done)=>{
            chai.request(server)
                .get(`/api/tokens/${token1}`)
                .end((err, result)=>{
                    result.should.have.status(200);
                    const token = result.body;
                    assert.equal(token.active, true);
                    done()
                })      
        })

        it("Should introspect a valid token", (done)=> {
            chai.request(server)
                .post("/services/oauth2/introspect")
                .type('application/x-www-form-urlencoded')
                .send('token=CustomToken101') // from seed
                .end((err, res) => {
                    res.should.have.status(200);
                    assert.equal(res.body.active, true);
                    done();
                })
        })

        it("Should gracefully error when token not found", (done) => {
            chai.request(server)
            .post("/services/oauth2/introspect")
            .type('application/x-www-form-urlencoded')
            .send('token=FooBarTokenNonExistent')
            .end((err, res) => {
                res.should.have.status(404);
                done();
            })
        })

        it ("Should update one token", (done)=>{
            const token = {
                clientId: 200,
                token: "Token200",
                active: false
            }
            chai.request(server)
                .put(`/api/tokens/${token1}`)
                .send(token)
                .end((err, result)=>{
                    result.should.have.status(200);
                    const srvToken = result.body
                    assert.equal(srvToken.clientId, token.clientId)
                    assert.equal(srvToken.token, token.token)
                    assert.equal(srvToken.active, token.active)
                    done()
                })
        })
    })
})