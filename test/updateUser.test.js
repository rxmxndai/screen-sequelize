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
                console.log(res);
                expect(res.status).to.be.equal(200);
                expect(res.data).to.have.property("message", "User data updated!");
                expect(res.data).to.have.property("user").that.is.an.instanceOf(User);
                done();
            })
            .catch(err => console.log(err))

    })


})