const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
// import express-session and connect-session-knex
const session = require("express-session")
const KnexSessionStore = require("connect-session-knex")(session)
const db = require("../database/dbConfig")

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
// use express-sessions to allow for authentication
server.use(session({
    resave: false,
    saveUninitialized: false,
    secret: "lime green apples tend to be more sour than sweet",
    store: new KnexSessionStore({
        knex: db,
        createtable: true,
    })
}))

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);

server.use((err, req, res, next) => {
    console.log(err)

    res.status(500).json({
        message: "Something went wrong. Please try again later."
    })
})

module.exports = server;
