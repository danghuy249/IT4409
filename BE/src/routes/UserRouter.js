const express = require("express");
const router = express.Router();
const userController = require('../controllers/UserController');
const { authAdminMiddleWare, authUserMiddleWare } = require("../middleware/authMiddleware");

router.post('/sign-up', userController.createUser)
router.post('/sign-in', userController.loginUser)
router.post('/log-out', userController.logoutUser)
router.put('/update-user/:id', authUserMiddleWare, userController.updateUser)
router.delete('/delete-user/:id', authAdminMiddleWare, userController.deleteUser)
router.get('/getAll', authAdminMiddleWare, userController.getAllUser)
router.get('/get-detail/:id', authUserMiddleWare, userController.getDetailUser)
router.post('/refresh-token', userController.refreshToken)
router.post('/delete-many', authAdminMiddleWare, userController.deleteMany)






module.exports = router