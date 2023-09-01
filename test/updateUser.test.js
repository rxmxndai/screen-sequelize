const { expect } = require("chai")
const { deleteUser, updateUser, createNewUser } = require("../controllers/users");
const User = require("../models/User");


describe("PATCH: /api/users (Update a user record)", function () {

    let createdUserId = 0;

    before((done) => {
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


    afterEach(async () => {
        let req = { params: { userId: createdUserId } }
        // console.log(createdUserId);
        if (createdUserId || createdUserId !== 0) {
            await deleteUser(req, {}, () => { });
        }
        createdUserId = 0;
    });


    it("Should update a user record with status code 200", (done) => {
        let req = {
            params: {
                userId: createdUserId
            },
            body: {
                username: "tester"
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
        }

        updateUser(req, res, () => { })
            .then((result) => {
                expect(res.status).to.be.equal(200);
                expect(res.data).to.have.property("message", "User data updated!");
                expect(res.data).to.have.property("user").that.is.an.instanceOf(User);
                expect(res.data.user.username).to.be.equal("tester");
                done();
            })
            .catch(err => console.log(err))

    })




    it("Should return an error with status code 400, if invalid updates are sent.", (done) => {
        let req = {
            params: {
                userId: createdUserId
            },
            body: {
                date: "tester"
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
        }

        updateUser(req, res, () => { })
            .then((result) => {
                expect(result).to.have.property("status", 400)
                expect(result).to.have.property("message", "Invalid Field! Update failed")
                done();
            })
            .catch(err => console.log(err))

    })


})