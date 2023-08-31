const sinon = require("sinon");
const { getOneUser } = require("../controllers/users");
const { expect } = require("chai");
const User = require("../models/User");

describe("GET: /api/users/:userId (Get one user)", function () {

    it("Should return a user object with status code of 200", function (done) {
        let req = { params: { userId: 2 }};
        let res = {
            status: function(code) {
                this.status = code;
                return this;
            },
            json: function (data) {
                this.data = data;
            }
        };
        getOneUser(req, res, () => {})
        .then(() => {
            expect(res.status).to.be.equal(200);
            expect(res.data).to.have.property("message", "One User record.");
            expect(res.data).to.have.property("user").to.be.an("object");
            done();
        })
        .catch(err => console.log(err))
        
    }) 



    it("Should return an error if no user found with status code of 404", function (done) {
        let req = { params: { userId: 32 }};
        let res = {
            status: function(code) {
                this.status = code;
                return this;
            },
            json: function (data) {
                this.data = data;
            }
        };

        getOneUser(req, res, () => {})
        .then((result) => {
            expect(result).to.be.an("error");
            expect(result).to.have.property("status", 404);
            expect(result).to.have.property("message", "User record not found!")
            done();
        })
        .catch(err => console.log(err))
    })
    
})