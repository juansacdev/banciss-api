const router = require('./api/lib/routes')
const { port } = require("./config");
const express = require("express");
const app = express();
require("./db");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router(app)

// Server
app.listen(port, () => console.log(`I'm alive on: http://localhost:${port}`));
