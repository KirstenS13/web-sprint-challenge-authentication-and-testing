// want to test:

// session is sent back to user
// statusCode = 401 if password wrong
// statusCode = 401 if username wrong
// logs in if username and password are correct

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
describe("login integration tests", () => {
    it("POST /api/auth/login", async () => {
        const res = await supertest(server)
            .post("/api/auth/login")
            .send({
                username: "amy",
                password: "abc123"
            })
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body.message).toBe("Welcome amy!")
    })

    it("POST /api/auth/login - wrong username", async () => {
        const res = await supertest(server)
            .post("/api/auth/login")
            .send({
                username: "amie",
                password: "abc123"
            })
        expect(res.statusCode).toBe(401)
        expect(res.type).toBe("application/json")
        expect(res.body.message).toBe("Invalid credentials")
    })

    it("POST /api/auth/login - wrong password", async () => {
        const res = await supertest(server)
            .post("/api/auth/login")
            .send({
                username: "amy",
                password: "abc12"
            })
        expect(res.statusCode).toBe(401)
        expect(res.type).toBe("application/json")
        expect(res.body.message).toBe("Invalid credentials")
    })
})