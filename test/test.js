var assert = require("assert");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server=require("../src");
let should = chai.should();



chai.use(chaiHttp);
describe("Tokens", function(){

    describe ("CRUD OPERATIONS", function(){

        var tokens = [{
            clientId: 591,
            token: "Token591",
            userFid: "005xx000Cust013c00",
            active: true
        }, {
            clientId: 195,
            token: "Token195",
            userFid: "005xx000Cust013c00",
            active: true
        }]

        it("Should delete all tokens", (done) => {
            chai.request(server)
            .delete("/api/tokens")
            .end((err,res) => {
                console.log(res.body);
                done();
            });
        })

        it("Should add Tokens in DB", (done) => {
            tokens.forEach(function(token) {
                chai.request(server)
                .post("/api/tokens/")
                .send(token)
                .end((err, res) => {
                    res.should.have.status(200);
                })
            });
            done();
        })

        // it ("Should Fecth all the tokens", (done)=>{
        //     chai.request(server)
        //         .get("/api/tokens/")
        //         .end((err, result)=>{
        //             result.should.have.status(200);
        //             const tokens = result.body;
        //             assert.equal(tokens.length, 2);
        //             for(var i = 0; i < 2; i++) {
        //                 assert.equal(tokens[i].clientId, tokens[i].clientId)
        //             }
        //             done()
        //         })
        // })

        // it("should fetch one token", (done)=>{
        //     chai.request(server)
        //         .get("/api/tokens/1")
        //         .end((err, result)=>{
        //             result.should.have.status(200);
        //             const token = result.body;
        //             assert.equal(true, token.clientId == tokens[0].clientId || token.clientId == tokens[1].clientId)
        //             done()
        //         })      
        // })

        it("Should introspect a valid token", (done)=> {
            chai.request(server)
                .post("/services/oauth2/introspect")
                .type('application/x-www-form-urlencoded')
                .send(`token=${tokens[0].token}`)
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
                .put('/api/tokens/1')
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