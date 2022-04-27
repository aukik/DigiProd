const request = require("supertest")
const app = require("./controller/main")
const userData = require("./model/userData")
const mongoose = require("mongoose")

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
//testing whether test account could be authenticated
describe("login successful or not", () => {
  let con

  beforeAll(async () => {
    mongoose.connect("mongodb://localhost:27017/auth", {
      useUnifiedTopology : true,
      useNewUrlParser    : true,
    })

    con = mongoose.connection
    con.on("open", () => {
      console.log("database connected")
    })
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  test("should respond with a 302 status code", async () => {
    const response = await request(app).post("/signIn").send({
      username : "test",
      password : "test",
    })

    expect(response.statusCode).toBe(302)
  })
})

//testing whether test account could be authenticated
describe("update details check", () => {
  let con

  beforeAll(async () => {
    mongoose.connect("mongodb://localhost:27017/auth", {
      useUnifiedTopology : true,
      useNewUrlParser    : true,
    })

    con = mongoose.connection
    con.on("open", () => {
      console.log("database connected")
    })
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  test("should respond with a 200 status code for account details", async () => {
    const response = await request(app).post("/accountDetails").send({
      username : "test",
      name     : "test2",
      email    : "test@example.com",
      password : "test",
      phone    : "1234",
      testing  : true,
    })
    const userFound = await userData.findOne({ username: "test" })

    expect(response.statusCode).toBe(200)
  })
})
