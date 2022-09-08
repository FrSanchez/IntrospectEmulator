var assert = require("assert");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server=require("../src");
let should = chai.should();



chai.use(chaiHttp);
describe("Tokens", function(){
    describe ("DELETE ALL", function(){
        it("should remove all first", done=>{
            console.log ("Deleting all data in db first.")
            chai.request(server)
                .delete("/api/tokens/")
                .send({})
                .end((err,res)=>{
                    res.should.have.status(204);
                    console.log("Response Body:", res.body);
                    done()
                })
        })

    })

    describe ("CRUD OPERATIONS", function(){

        var tokens = [{
            "clientId": "591",
            "token": "Token591",
            "userFid": "005xx000Cust013c00",
            "active": true
        }, {
            "clientId": "195",
            "token": "Token195",
            "userFid": "005xx000Cust013c00",
            "active": true
        }]

        it("Should add Tokens in DB", (done) => {
            tokens.forEach(function(token) {
                console.log(token);
                chai.request(server)
                .post("/api/tokens/")
                .send(token)
                .end((err, res) => {
                    res.should.have.status(200);
                })
            });
            done();
        })

        it ("Should Fecth all the tokens", (done)=>{
            chai.request(server)
                .get("/api/tokens/")
                .end((err, result)=>{
                    result.should.have.status(200);
                    assert.equal(result.body.length, 2);
                    done()
                })
        })

        it("Should introspect a valid token", (done)=> {
            chai.request(server)
                .post("/services/oauth2/introspect")
                .type('application/x-www-form-urlencoded')
                .send(`token=${tokens[0].token}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    assert.equal(res.body.active, true);
                    assert.equal(res.body.client_id, tokens[0].clientId);
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
    })

    describe ("DELETE ALL", function(){
        it("should remove all at the end", done=>{
            console.log ("Deleting all data in db.")
            chai.request(server)
                .delete("/api/tokens/")
                .send({})
                .end((err,res)=>{
                    res.should.have.status(204);
                    console.log("Response Body:", res.body);
                    done()
                })
        })

    })

})