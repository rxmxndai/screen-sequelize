const { expect } = require("chai")
const { createNewUser, deleteUser } = require("../controllers/users");
const User = require("../models/User");


describe("POST: /api/users (Create a user record)", function () {

    let createdUserId = 0;


    beforeEach(async () => {
        let req = {}
        if (createdUserId || createdUserId !== 0) {
            await deleteUser(req, {}, () => {});
        }
    });

    afterEach(async () => {
        let req = { params: {userId: createdUserId} }
        if (createdUserId || createdUserId !== 0) {
            await deleteUser(req, {}, () => {});
        }
        createdUserId = 0;
    });


    it("Should create a user record and send 200 status code.", (done) => {
       
        const req = {
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
                expect(res).to.have.property("status", 201);
                expect(res.data).to.have.property("message", "User record created!");
                expect(res.data).to.have.property("user").that.is.an.instanceOf(User);
                createdUserId = res.data.user.id;
                done();
            })
            .catch(err => console.log(err))

    })

    it("Should return an error with status code 400, if incomplete user data is sent.", (done) => {
       
        const req = {body: {}}
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
                expect(result).to.be.an("error");
                expect(result).to.have.property("status", 400);
                expect(result).to.have.property("message", "Incomplete data");
                done();
            })
            .catch(err => console.log(err))

    })

    

})