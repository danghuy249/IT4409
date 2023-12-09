const express = require("express");
const router = express.Router();
const OrderController = require('../controllers/OrderController');
const { authUserMiddleWare, authAdminMiddleWare } = require("../middleware/authMiddleware");

router.post('/create/:id', authUserMiddleWare, OrderController.createOrder)
router.get('/get-all-order/:id',authUserMiddleWare, OrderController.getAllOrderDetails)
router.get('/get-details-order/:id', OrderController.getDetailsOrder)



module.exports = router