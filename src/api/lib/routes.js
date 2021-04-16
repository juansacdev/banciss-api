const user = require('../components/Users/network')

const routes = server => {
    server.use('/users', user)
}

module.exports = routes