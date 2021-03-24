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
describe("joke endpoint integration tests", () => {
    it("GET /api/jokes - access denied", async () => {
        const res = await supertest(server).get("/api/jokes")
        expect(res.statusCode).toBe(401)
        expect(res.type).toBe("application/json")
        expect(res.body.message).toBe("Invalid Credentials")
    })

    it("GET /api/jokes - access granted", async () => {
        const response = await supertest(server)
            .post("/api/auth/login")
            .send({
                username: "amy",
                password: "abc123"
            })
        //console.log(response.res.headers["set-cookie"][0])
        expect(response.res.headers["set-cookie"]).toHaveLength(1)
    })
})