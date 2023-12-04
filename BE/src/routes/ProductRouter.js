const express = require("express");
const router = express.Router();
const productController = require('../controllers/ProductController');
const { authAdminMiddleWare } = require("../middleware/authMiddleware");


router.post('/create',authAdminMiddleWare, productController.createProduct);
router.put('/update/:id',authAdminMiddleWare, productController.updateProduct);
router.get('/details/:id', productController.getDetailProduct);
router.delete('/delete/:id', authAdminMiddleWare, productController.deleteProduct);
router.get('/get-all', productController.getAllProduct)
router.post('/delete-many', authAdminMiddleWare, productController.deleteMany)
router.get('/get-all-type', productController.getAllType)




module.exports = router