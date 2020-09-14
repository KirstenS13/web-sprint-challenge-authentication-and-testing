const router = require('express').Router();
const bcrypt = require("bcryptjs")

router.post("/register", async (req, res, next) => {
  // implement registration
  try {
    const { username, password } = req.body
    const
  } catch (err) {
    next(err)
  }
})

router.post('/login', (req, res) => {
  // implement login
})

module.exports = router;
