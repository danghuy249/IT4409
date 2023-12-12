const Order = require("../models/Order")
const OrderItem = require("../models/OrderItem")
const Product = require("../models/Product")


const orderService = {
    createOrder: (newOrder) => new Promise(async (resolve, reject) => {
        const { orderItems, paymentMethod, itemsPrice, shippingPrice, totalPrice, fullName, address, city, phone, user, isPaid, paidAt, email } = newOrder
        try {

            const promises = orderItems.map(async (order) => {
                const productData = await Product.findOne({
                    where: { id: order.productId, countInStock: { [sequelize.Op.gte]: order.amount }, }
                });
                if (productData) {
                    await Product.update(
                        {
                            countInStock: sequelize.literal(`countInStock - ${Product.amount}`),
                            selled: sequelize.literal(`selled + ${Product.amount}`),
                        },
                        {
                            where: { id: order.productId },
                        }
                    );

                    return {
                        status: 'OK',
                        message: 'CREATE USER SUCCESS',
                    };
                } else {
                    const product = await Product.findOne({
                        where: { id: order.productId },
                    });
                    return {
                        status: 'OK',
                        message: 'ERR',
                        name: product.name
                    }
                }
            })
            const results = await Promise.all(promises)
            const newData = results && results.filter((item) => item.name)
            if (newData.length) {
                const arrId = []
                newData.forEach((item) => {
                    arrId.push(item.name)
                })
                resolve({
                    status: 'ERR',
                    message: `San pham ${arrId.join(',')} khong du hang`
                })
            } else {
                const createdOrder = await Order.create({
                    fullName,
                    address,
                    phone,
                    paymentMethod,
                    itemsPrice,
                    shippingPrice,
                    totalPrice,
                    user: user,
                    isPaid, paidAt
                })

                orderItems.forEach(async (order) => {
                    await OrderItem.create({
                        name: order.name,
                        amount: order.amount,
                        price: order.price,
                        discount: order.discount,
                        orderId: createdOrder.id,
                        productId: order.productId,
                    })
                })
                resolve({
                    status: 'OK',
                    message: 'success'
                })
            }
        } catch (e) {
            reject(e)
        }
    }),

    getAllOrderDetails: (id) => new Promise(async (resolve, reject) => {
        try {
            let orders = await Order.find({
                where: { userId: id },
                order: [['createdAt', 'DESC'], ['updatedAt', 'DESC']],
            });

            if (orders === null) {
                resolve({
                    status: 'ERR',
                    message: 'The order is not defined'
                })
            }

            orders.forEach(async (order, index) => {
                const orderItems = await OrderItem.find({
                    where: { orderId: order.id },
                    order: [['createdAt', 'DESC'], ['updatedAt', 'DESC']],
                });
                orders[index].orderItems = orderItems;
            })
            resolve({
                status: 'OK',
                message: 'SUCESSS',
                data: orders
            })
            // {
            //     "status": "OK",
            //     "message": "SUCESSS",
            //     "data": [
            //         {
            //             "shippingAddress": {
            //                 "fullName": "a",
            //                 "address": "a",
            //                 "city": "a",
            //                 "phone": 1234
            //             },
            //             "_id": "6576e491498a5df684c052c9",
            //             "orderItems": [
            //                 {
            //                     "name": "a",
            //                     "amount": 1,
            //                     "image": "a",
            //                     "price": 1,
            //                     "discount": 1,
            //                     "product": "6561c96227758445e5ae48fb",
            //                     "_id": "6576e491498a5df684c052ca"
            //                 },
            //                 {
            //                     "name": "b",
            //                     "amount": 1,
            //                     "image": "a",
            //                     "price": 1,
            //                     "discount": 1,
            //                     "product": "6576dabf8a5203bdce9c1d62",
            //                     "_id": "6576e491498a5df684c052cb"
            //                 }
            //             ],
            //             "paymentMethod": "a",
            //             "itemsPrice": 2,
            //             "shippingPrice": 2,
            //             "totalPrice": 4,
            //             "user": "6576e02d58c40276301e9501",
            //             "isPaid": false,
            //             "isDelivered": false,
            //             "createdAt": "2023-12-11T10:29:37.814Z",
            //             "updatedAt": "2023-12-11T10:29:37.814Z",
            //             "__v": 0
            //         },
            //         {
            //             "shippingAddress": {
            //                 "fullName": "a",
            //                 "address": "a",
            //                 "city": "a",
            //                 "phone": 1234
            //             },
            //             "_id": "6576e46b498a5df684c052c3",
            //             "orderItems": [
            //                 {
            //                     "name": "a",
            //                     "amount": 1,
            //                     "image": "a",
            //                     "price": 1,
            //                     "discount": 1,
            //                     "product": "6561c96227758445e5ae48fb",
            //                     "_id": "6576e46b498a5df684c052c4"
            //                 },
            //                 {
            //                     "name": "b",
            //                     "amount": 1,
            //                     "image": "a",
            //                     "price": 1,
            //                     "discount": 1,
            //                     "product": "6576dabf8a5203bdce9c1d62",
            //                     "_id": "6576e46b498a5df684c052c5"
            //                 }
            //             ],
            //             "paymentMethod": "a",
            //             "itemsPrice": 2,
            //             "shippingPrice": 2,
            //             "totalPrice": 4,
            //             "user": "6576e02d58c40276301e9501",
            //             "isPaid": false,
            //             "isDelivered": false,
            //             "createdAt": "2023-12-11T10:28:59.916Z",
            //             "updatedAt": "2023-12-11T10:28:59.916Z",
            //             "__v": 0
            //         }
            //     ]
            // }
        } catch (e) {
            // console.log('e', e)
            reject(e)
        }
    }),

    getOrderDetails: (id) => new Promise(async (resolve, reject) => {
        try {
            const order = await Order.findOne({ where: { id: id }, });
            if (order === null) {
                resolve({
                    status: 'ERR',
                    message: 'The order is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'SUCESSS',
                data: order
            })
        } catch (e) {
            // console.log('e', e)
            reject(e)
        }
    }),
    cancelOrderDetails: (id, data) => new Promise(async (resolve, reject) => {
        try {
            let order = []
            const promises = data.map(async (order) => {
                const productData = await Product.findOneAndUpdate(
                    {
                        _id: order.product,
                        selled: { $gte: order.amount }
                    },
                    {
                        $inc: {
                            countInStock: +order.amount,
                            selled: -order.amount
                        }
                    },
                    { new: true }
                )
                if (productData) {
                    order = await Order.findByIdAndDelete(id)
                    if (order === null) {
                        resolve({
                            status: 'ERR',
                            message: 'The order is not defined'
                        })
                    }
                } else {
                    return {
                        status: 'OK',
                        message: 'ERR',
                        id: order.product
                    }
                }
            })
            const results = await Promise.all(promises)
            const newData = results && results[0] && results[0].id

            if (newData) {
                resolve({
                    status: 'ERR',
                    message: `San pham voi id: ${newData} khong ton tai`
                })
            }
            resolve({
                status: 'OK',
                message: 'success',
                data: order
            })
        } catch (e) {
            reject(e)
        }
    }),

    getAllOrder: () => new Promise(async (resolve, reject) => {
        try {
            const allOrder = await Order.find().sort({ createdAt: -1, updatedAt: -1 })
            resolve({
                status: 'OK',
                message: 'Success',
                data: allOrder
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = orderService;


