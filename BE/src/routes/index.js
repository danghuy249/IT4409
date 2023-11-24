const UserRouter = require('./UserRouter.js')

const routes = (app) => {
    app.use('/user', UserRouter)
}

module.exports = routes