const router = require('express').Router();
const bcrypt = require("bcryptjs")
const Users = require("./user-model")

router.post('/register', async (req, res, next) => {
  // implement registration
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({
        message: "Please provide a username and password"
      })
    }

    const user = await Users.findBy({ username }).first()

    if (user) {
      return res.status(409).json({
        message: "Username is already taken. Please choose a different one."
      })
    }

    const newUser = await Users.add({
      username,
      password: await bcrypt.hash(password, 14)
    })

    res.status(201).json(newUser)
  } catch (err) {
    next(err)
  }
})

router.post('/login', async (req, res, next) => {
  // implement login
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({
        message: "Please provide a username and password"
      })
    }

    const user = await Users.findBy({ username }).first()

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials"
      })
    }

    console.log("password", password, "user.password", user.password)

    const passwordValid = await bcrypt.compare(password, user.password)

    console.log("passwordValid", passwordValid)

    if (!passwordValid) {
      return res.status(401).json({
        message: "Invalid credentials"
      })
    }

    req.session.user = user

    res.json({
      message: `Welcome ${user.username}!`
    })

  } catch (err) {
    next(err)
  }
})

module.exports = router;
