const request = require("supertest")
const app = require("./controller/main")
//testing get method of login page
describe("test to login page", () => {
  test("It should response the GET method of Sign In", async () => {
    const response = await request(app).get("/signIn")
    expect(response.statusCode).toBe(223)
  })
})

//testing get method of home page
describe("test to home page", () => {
  test("It should response the GET method of home", async () => {
    const response = await request(app).get("/")
    expect(response.statusCode).toBe(225)
  })
})
