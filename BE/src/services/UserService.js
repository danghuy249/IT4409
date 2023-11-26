const { reject } = require("bcrypt/promises");
const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const { generalAccessToken, generalRefreshToken } = require("./JwtService");

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { email, password, confirmPassword } = newUser;

        try {
            const checkEmail = await User.findOne({
                email: email
            })
            if (checkEmail != null) {
                resolve({
                    status: 'ERR',
                    message: 'Email is already use'
                })
            }

            const hash = bcrypt.hashSync(password, 10)
            const createdUser = await User.create({
                email,
                password: hash,
            })
            if (createUser) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createdUser
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { email, password } = userLogin;

        try {
            const checkEmail = await User.findOne({
                email: email
            })
            if (checkEmail === null) {
                resolve({
                    status: 'ERR',
                    message: 'Email is not defined'
                })
            }
            const comparePassword = bcrypt.compareSync(password, checkEmail.password);

            if (!comparePassword) {
                resolve({
                    status: 'ERR',
                    message: 'Password is incorrect'
                })
            }

            const access_token = await generalAccessToken({
                id: checkEmail.id,
                isAdmin: checkEmail.isAdmin
            })

            console.log('access_token', access_token)

            const refresh_token = await generalRefreshToken({
                id: checkEmail.id,
                isAdmin: checkEmail.isAdmin
            })

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                access_token,
                refresh_token
            })

        } catch (e) {
            reject(e);
        }
    })
}

const updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            })
            console.log("first", checkUser);

            if(checkUser === null){
                resolve({
                    status: 'ERR',
                    message: 'User is not exist'
                })
            }

            const checkEmail = await User.findOne({
                email: data.email
            })
            
            if (checkEmail != null && checkEmail.id != checkUser.id) {
                resolve({
                    status: 'ERR',
                    message: 'Email is already use'
                })
            }

            if(data.password){
                const password = data.password;
                data.password = bcrypt.hashSync(password, 10)
            }

            const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });

            console.log("up",updatedUser);

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                updatedUser
            })

        } catch (e) {
            reject(e);
        }
    })
}

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            })
            console.log("first", checkUser);

            if(checkUser === null){
                resolve({
                    status: 'ERR',
                    message: 'User is not exist'
                })
            }

            const deletedUser = await User.findByIdAndDelete(id);

            resolve({
                status: 'OK',
                message: 'DELETE SUCCESS',
                deletedUser
            })

        } catch (e) {
            reject(e);
        }
    })
}

const getAllUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {

            const allUser = await User.find();

            resolve({
                status: 'OK',
                message: 'GET ALL SUCCESS',
                data: allUser
            })

        } catch (e) {
            reject(e);
        }
    })
}

const getDetailUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                _id: id
            })

            if(user === null){
                resolve({
                    status: 'ERR',
                    message: 'User is not exist'
                })
            }

            resolve({
                status: 'OK',
                message: 'GET USER SUCCESS',
                data: user
            })

        } catch (e) {
            reject(e);
        }
    })
}






module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailUser,
    refreshToken
}