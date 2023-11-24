const userService = require('../services/UserService')

const createUser = async (req, res) => {
    try{
        console.log(req.body);
        const {email, password, confirmPassword} = req.body;
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email);
        if (!email || !password || !confirmPassword) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is email'
            })
        } else if (password !== confirmPassword) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The password is equal confirmPassword'
            })
        }
        const response = await userService.createUser(req.body);
        return res.status(200).json(response);
    } catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

const loginUser = async (req, res) => {
    try{
        console.log(req.body);
        const {email, password, confirmPassword} = req.body;
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email);
        if (!email || !password || !confirmPassword) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is email'
            })
        } else if (password !== confirmPassword) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The password is equal confirmPassword'
            })
        }
        const response = await userService.loginUser(req.body);
        return res.status(200).json(response);
    } catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updateUser = async (req, res) => {
    try{
        const userId = req.params.id;
        console.log(userId);
        const data = req.body;
        if(!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'userId is requied'
            })
        }
        
        const response = await userService.updateUser(userId, data);
        return res.status(200).json(response);
    } catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteUser = async (req, res) => {
    try{
        const userId = req.params.id;
        console.log(userId);
        const data = req.body;
        if(!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'userId is requied'
            })
        }
        
        const response = await userService.deleteUser(userId);
        return res.status(200).json(response);
    } catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllUser = async (req, res) => {
    try{
        
        const response = await userService.getAllUser();
        return res.status(200).json(response);
    } catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailUser = async (req, res) => {
    try{
        
        const response = await userService.getDetailUser(req.params.id);
        return res.status(200).json(response);
    } catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailUser
}