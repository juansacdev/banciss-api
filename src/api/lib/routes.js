const user = require('../components/Users/network')
const product = require('../components/Products/network')
const transaction = require('../components/Transactions/network')
const pqr = require('../components/Pqrs/network')
const auth = require('../components/auth/network')
const swaggerUi = require ('swagger-ui-express');
const swaggerDoc = require('../../public/swagger.json')

const routes = server => {
    server.use('/api/users', user)
    server.use('/api/products', product)
    server.use('/api/transactions', transaction)
    server.use('/api/pqrs', pqr)
    server.use('/api/auth', auth)
    server.use('/api/doc', swaggerUi.serve,  swaggerUi.setup(swaggerDoc))
}

module.exports = routes