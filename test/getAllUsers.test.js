const expect = require('chai').expect;
const sinon = require('sinon');


const User = require('../models/User');
const { getAllUsers} = require("../controllers/users");

describe("GET: /api/users/:userId (Get all users)", function () {

    it('Should return a list of all user records with status code 200.', function (done) {
        let res = {
            status: function (code) {
                this.status = code;
                return this;
            },
            json: function (data) {
                this.data = data;
            }
        };

        // Call the getAllUsers function and pass the done callback
        getAllUsers({}, res, () => { })
            .then(() => {
                expect(res.status).to.equal(200);
                expect(res.data).to.have.property("message", "Users list.");
                expect(res.data).to.have.property("users").that.is.an("array");
                done();
            })

    });




    it("Should return an error with 500 status code, if no response from database.", function (done) {

        sinon.stub(User, "findAll");
        User.findAll.throws();

        let res = {};

        getAllUsers({}, res, () => { })
            .then((result) => {
                // console.log(result.status);
                expect(result).to.be.an("error");
                expect(result).to.have.property("status", 500);
                done();
            })
        expect(User.findAll.called).to.be.true;
        User.findAll.restore();
    });


});