const UserRouter = require('./UserRouter.js')
const ProductRouter = require('./ProductRouter.js')

const routes = (app) => {
    app.use('/user', UserRouter)
    app.use('/product', ProductRouter)
}


module.exports = routes