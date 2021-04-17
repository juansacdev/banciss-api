const router = require('./api/lib/routes')
const { port } = require("./config");
const express = require("express");
const cors = require('cors')
const helmet = require('helmet');
const app = express();
require("./db");

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router(app)

// Server
app.listen(port, () => console.log(`I'm alive on: http://localhost:${port}`));
