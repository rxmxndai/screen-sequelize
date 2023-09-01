const { getOneUser, deleteUser, createNewUser } = require("../controllers/users");
const { expect } = require("chai");
const User = require("../models/User");

describe("GET: /api/users/:userId (Get one user)", function () {

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



    it("Should return a user object with status code 200", function (done) {
        let req = { params: { userId: createdUserId } };
        let res = {
            status: function (code) {
                this.status = code;
                return this;
            },
            json: function (data) {
                this.data = data;
            }
        };
        getOneUser(req, res, () => { })
            .then(() => {
                expect(res.status).to.be.equal(200);
                expect(res.data).to.have.property("message", "One User record.");
                expect(res.data).to.have.property("user").that.is.an.instanceOf(User);
                done();
            })
            .catch(err => console.log(err))

    })



    it("Should return an error if no user found with status code 404", function (done) {
        let req = { params: { userId: 32 } };
        let res = {
            status: function (code) {
                this.status = code;
                return this;
            },
            json: function (data) {
                this.data = data;
            }
        };

        getOneUser(req, res, () => { })
            .then((result) => {
                expect(result).to.be.an("error");
                expect(result).to.have.property("status", 404);
                expect(result).to.have.property("message", "User record not found!")
                done();
            })
            .catch(err => console.log(err))
    })

})