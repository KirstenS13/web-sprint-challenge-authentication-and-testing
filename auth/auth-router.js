const router = require('express').Router();
const bcrypt = require("bcryptjs")
const Users = require("./user-model")

router.post("/register", async (req, res, next) => {
  // implement registration
  try {
    const { username, password } = req.body
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

router.post('/login', (req, res) => {
  // implement login
})

module.exports = router;
