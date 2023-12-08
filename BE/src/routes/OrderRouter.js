const express = require("express");
const router = express.Router();
const OrderController = require('../controllers/OrderController');
const { authUserMiddleWare, authAdminMiddleWare } = require("../middleware/authMiddleware");

router.post('/create/:id', authUserMiddleWare, OrderController.createOrder)



module.exports = router