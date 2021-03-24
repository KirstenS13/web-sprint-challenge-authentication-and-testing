/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const bcrypt = require("bcryptjs")
const Users = require("./user-model")

async function restrict(req, res, next) {
  try {
    if (!req.session || !req.session.user) {
      return res.status(401).json({
        message: "Invalid Credentials"
      })
    }

    next()
  } catch (err) {
    next(err)
  }
}

module.exports = restrict
