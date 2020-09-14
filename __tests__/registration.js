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

// run the seeds before each test
beforeEach(async () => {
    await db.seed.run()
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
        expect(res.body.id).toBe(4)
        expect(res.body.password).not.toBe("abc123")
    })

    it("POST /api/auth/register - username taken", async () => {
        const res = await supertest(server)
            .post("/api/auth/register")
            .send({
                username: "amy",
                password: "def456"
            })
        expect(res.statusCode).toBe(409)
        expect(res.body.message).toBe("Username is already taken. Please choose a different one.")
        expect(res.type).toBe("application/json")
    })

    it("POST /api/auth/register - username missing", async () => {
        const res = await supertest(server)
            .post("/api/auth/register")
            .send({
                password: "abc123"
            })
        expect(res.statusCode).toBe(400)
        expect(res.type).toBe("application/json")
        expect(res.body.message).toBe("Please provide a username and password")
    })

    it("POST /api/auth/register - password missing", async () => {
        const res = await supertest(server)
            .post("/api/auth/register")
            .send({
                username: "amy"
            })
        expect(res.statusCode).toBe(400)
        expect(res.type).toBe("application/json")
        expect(res.body.message).toBe("Please provide a username and password")
    })
})