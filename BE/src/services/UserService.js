const { reject } = require("bcrypt/promises");
const {User} = require("../models/index");
const bcrypt = require("bcrypt");
const { generalAccessToken, generalRefreshToken } = require("./JwtService");

const userService = {
    createUser: (newUser) => new Promise(async (resolve, reject) =>{
        try {
            const { email, password, confirmPassword } = newUser;
            const user = await User.findOne({where: {email}});
            if(user) return reject(new Error(`Email ${email} already exit`));

            const hash = bcrypt.hashSync(password, 10)

            const data = await User.create({
                email: email,
                password: hash
            })
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data
            })
        } catch (error) {
            reject(error);
        }
    }),

    loginUser: (userLogin) => new Promise(async (resolve, reject) => {
        const { email, password } = userLogin;
        try {
            const user = await User.findOne({where: {email}});
            if (user === null) return reject(new Error(`Email ${email} is not exit`));
            const comparePassword = bcrypt.compareSync(password, user.password);

            if (!comparePassword) return reject(new Error(`Password is not correct`));

            const access_token = await generalAccessToken({
                id: user.id,
                isAdmin: user.isAdmin
            })

            console.log('access_token', access_token)

            const refresh_token = await generalRefreshToken({
                id: user.id,
                isAdmin: user.isAdmin
            })

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                access_token,
                refresh_token
            })

        } catch (error) {
            reject(error);
        }
    }),

    updateUser: (id, data) => new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({where: {id: id}});
            if (user === null) return reject(new Error(`User is not exit`));

            const checkEmail = await User.findOne({ where: { email: data.email } });
            
            if (checkEmail != null && checkEmail.id != user.id) {
                resolve({
                    status: 'ERR',
                    message: 'Email is already use'
                })
            }

            if(data.password){
                const password = data.password;
                data.password = bcrypt.hashSync(password, 10)
            }

            await User.update(data,{ where: {id: id}});

            const updatedUser = await User.findByPk(id);


            console.log("up",updatedUser);

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                updatedUser
            })

        } catch (error) {
            reject(error);
        }
    }),

    deleteUser: (id) => new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({where: {id: id}});
            if (user === null) return reject(new Error(`User is not exit`));

            const deletedUser = await User.destroy({where: {id: id}});

            resolve({
                status: 'OK',
                message: 'DELETE SUCCESS',
                deletedUser
            })

        } catch (e) {
            reject(e);
        }
    }),
    deleteManyUser: (id) => new Promise(async (resolve, reject) => {
        try {
            const deletedUsersCount = await User.destroy({where: { id: ids }});
            resolve({
                status: 'OK',
                message: 'Delete users success',
            })

        } catch (error) {
            reject(error);
        }
    }),

getAllUser: (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUsers = await User.findAll();
            resolve({
                status: 'OK',
                message: 'GET ALL SUCCESS',
                data: allUser
            })

        } catch (error) {
            reject(error);
        }
    })
},

getDetailUser: (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({where: {id: id}});

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

        } catch (error) {
            reject(error);
        }
    })
}

}



module.exports = userService
// const createUser = (newUser) => {
//     return new Promise(async (resolve, reject) => {
//         const { email, password, confirmPassword } = newUser;

//         try {
//             const checkEmail = await User.findOne({
//                 email: email
//             })
//             if (checkEmail != null) {
//                 resolve({
//                     status: 'ERR',
//                     message: 'Email is already use'
//                 })
//             }

//             const hash = bcrypt.hashSync(password, 10)
//             const createdUser = await User.create({
//                 email,
//                 password: hash,
//             })
//             if (createUser) {
//                 resolve({
//                     status: 'OK',
//                     message: 'SUCCESS',
//                     data: createdUser
//                 })
//             }
//         } catch (e) {
//             reject(e);
//         }
//     })
// }

// const loginUser = (userLogin) => {
//     return new Promise(async (resolve, reject) => {
//         const { email, password } = userLogin;

//         try {
//             const checkEmail = await User.findOne({
//                 email: email
//             })
//             if (checkEmail === null) {
//                 resolve({
//                     status: 'ERR',
//                     message: 'Email is not defined'
//                 })
//             }
//             const comparePassword = bcrypt.compareSync(password, checkEmail.password);

//             if (!comparePassword) {
//                 resolve({
//                     status: 'ERR',
//                     message: 'Password is incorrect'
//                 })
//             }

//             const access_token = await generalAccessToken({
//                 id: checkEmail.id,
//                 isAdmin: checkEmail.isAdmin
//             })

//             console.log('access_token', access_token)

//             const refresh_token = await generalRefreshToken({
//                 id: checkEmail.id,
//                 isAdmin: checkEmail.isAdmin
//             })

//             resolve({
//                 status: 'OK',
//                 message: 'SUCCESS',
//                 access_token,
//                 refresh_token
//             })

//         } catch (e) {
//             reject(e);
//         }
//     })
// }

// const updateUser = (id, data) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const checkUser = await User.findOne({
//                 _id: id
//             })
//             console.log("first", checkUser);

//             if(checkUser === null){
//                 resolve({
//                     status: 'ERR',
//                     message: 'User is not exist'
//                 })
//             }

//             const checkEmail = await User.findOne({
//                 email: data.email
//             })
            
//             if (checkEmail != null && checkEmail.id != checkUser.id) {
//                 resolve({
//                     status: 'ERR',
//                     message: 'Email is already use'
//                 })
//             }

//             if(data.password){
//                 const password = data.password;
//                 data.password = bcrypt.hashSync(password, 10)
//             }

//             const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });

//             console.log("up",updatedUser);

//             resolve({
//                 status: 'OK',
//                 message: 'SUCCESS',
//                 updatedUser
//             })

//         } catch (e) {
//             reject(e);
//         }
//     })
// }

// const deleteUser = (id) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const checkUser = await User.findOne({
//                 _id: id
//             })
//             console.log("first", checkUser);

//             if(checkUser === null){
//                 resolve({
//                     status: 'ERR',
//                     message: 'User is not exist'
//                 })
//             }

//             const deletedUser = await User.findByIdAndDelete(id);

//             resolve({
//                 status: 'OK',
//                 message: 'DELETE SUCCESS',
//                 deletedUser
//             })

//         } catch (e) {
//             reject(e);
//         }
//     })
// }
// const deleteManyUser = (id) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             await User.deleteMany({ _id: ids })
//             resolve({
//                 status: 'OK',
//                 message: 'Delete users success',
//             })

//         } catch (e) {
//             reject(e);
//         }
//     })
// }

// const getAllUser = (id) => {
//     return new Promise(async (resolve, reject) => {
//         try {

//             const allUser = await User.find();

//             resolve({
//                 status: 'OK',
//                 message: 'GET ALL SUCCESS',
//                 data: allUser
//             })

//         } catch (e) {
//             reject(e);
//         }
//     })
// }

// const getDetailUser = (id) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const user = await User.findOne({
//                 _id: id
//             })

//             if(user === null){
//                 resolve({
//                     status: 'ERR',
//                     message: 'User is not exist'
//                 })
//             }

//             resolve({
//                 status: 'OK',
//                 message: 'GET USER SUCCESS',
//                 data: user
//             })

//         } catch (e) {
//             reject(e);
//         }
//     })
// }






// module.exports = {
//     createUser,
//     loginUser,
//     updateUser,
//     deleteUser,
//     getAllUser,
//     getDetailUser,
//     deleteManyUser
// }