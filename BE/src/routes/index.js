const UserRouter = require('./UserRouter.js')
const ProductRouter = require('./ProductRouter.js')

const routes = (app) => {
    app.use('/api/user', UserRouter)
    app.use('/api/product', ProductRouter)
}


module.exports = routes