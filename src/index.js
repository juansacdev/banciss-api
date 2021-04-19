const { port, dev } = require("./config");
const { createRoles, createProducts } = require('./api/lib/initialSetup')
const router = require('./api/lib/routes')
const express = require("express");
const cors = require('cors')
const helmet = require('helmet');

// Init
const app = express();
require("./database");
createRoles()
createProducts()

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (dev) {
    const morgan = require('morgan');
    app.use(morgan('dev'));
}

// Routes
router(app)

// Server
app.listen(port, () => console.log(`I'm alive on: http://localhost:${port}`));
