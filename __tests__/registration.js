// want to test:

// statusCode = 400 if no username provided
// statusCode = 400 if no password
// statusCode = 201 if success
// data type = json if success
// data = newUser info if success

// import supertest, our server, and our db
const supertest = require("supertest")
const server = require("../api/server")
const db = require("../database/dbConfig")

// clear the database before each test runs
beforeEach(async () => {
    await db("users").truncate()
})

// get rid of db connection after all tests are done
afterAll(async () => {
    await db.destroy()
})

// write tests
describe("registration integration tests", () => {
    it("POST /api/auth/register", async () => {
        const res = await supertest(server)
            .post("/api/auth/register")
            .send({
                username: "jenny",
                password: "abc123"
            })
        // statusCode should be 201
        expect(res.statusCode).toBe(201)
        // type should be json
        expect(res.type).toBe("application/json")
        // data should be the object we sent in, with a hashed password
        expect(res.body.username).toBe("jenny")
        expect(res.body.id).toBe(1)
        expect(res.body.password).not.toBe("abc123")
    })
})