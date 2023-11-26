const express = require("express");
const router = express.Router();
const productController = require('../controllers/ProductController');
const { authAdminMiddleWare } = require("../middleware/authMiddleware");


router.post('/create',authAdminMiddleWare, productController.createProduct);
router.put('/update/:id',authAdminMiddleWare, productController.updateProduct);
router.get('/details/:id', productController.getDetailProduct);
router.delete('/delete/:id', authAdminMiddleWare, productController.deleteProduct);




module.exports = router