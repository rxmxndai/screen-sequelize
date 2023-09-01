const { expect } = require("chai");
const { deleteUser, createNewUser } = require("../controllers/users");
const User = require("../models/User");

describe("DELETE: /api/users/:userId (Delete One User Record)", function () {

    let createdUserId = 0;

    beforeEach((done) => {
        let req = { params: { userId: createdUserId } };
        if (createdUserId || createdUserId !== 0) {
            deleteUser(req, {}, () => { });
            createdUserId = 0;
            done();
        }
        req = {
            body: {
                username: 'test',
                email: 'test@gmail.com',
                contacts: 9697811967,
            }
        }

        let res = {
            status: function (code) {
                this.status = code;
                return this;
            },
            json: function (data) {
                this.data = data;
            }
        };

        createNewUser(req, res, () => { })
            .then(result => {
                createdUserId = res.data.user.id;
                done();
            })
    });


    afterEach( (done) => {
        let req = { params: { userId: createdUserId } }
        // console.log(createdUserId);
        if (createdUserId || createdUserId !== 0) {
            deleteUser(req, {}, () => { });
            done();
        }
        createdUserId = 0;
    });


    it("Should delete one user record and send 200 status code.", function (done) {
        let req = { params: { userId: createdUserId } }
        let res = {
            status: function (code) {
                this.status = code;
                return this;
            },
            json: function (data) {
                this.data = data;
            }
        };

        deleteUser(req, res, () => { })
            .then(result => {
                expect(res).to.have.property("status", 200);
                expect(res.data).to.have.property("message", "User record deleted!")
                expect(res.data).to.have.property("user").that.is.an.instanceOf(User);
                createdUserId = res.data.user.id;
                done();
            })
            .catch(err => console.log(err))
    })



    it("Should return an error with status code 404, if no user exist with the given userId.", function (done) {
        let req = { params: { userId: -1 } }
        let res = {
            status: function (code) {
                this.status = code;
                return this;
            },
            json: function (data) {
                this.data = data;
            }
        };

        deleteUser(req, res, () => { })
            .then(result => {
               expect(result).to.be.an("error");
               expect(result).to.have.property("status", 404);
               expect(result).to.have.property("message", )
                done();
            })
            .catch(err => console.log(err))
    })

})