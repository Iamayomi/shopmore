const { Cart, User, Product, CartItem } = require("../models/index");
const appError = require("./../utils/appError");


// get a cartitem

exports.getCartItem =  async function(req, res, next){
    try{

        const cart = await Cart.findOne({where: { userId: req.user.id}});

        if(!cart){
           return next(new appError("Cart with is this user is not found", 404));
        };

        const getCartitem = await CartItem.findOne({ where: { productId: req.params.productId * 1, cartId: cart.userId } , include: Product });

        if(!getCartitem){
            return next(new appError("Cart item is not found", 404));
        };

        res.status(201).json({
            status: "SUCCESS",
            data: {
                getCartitem
            }
        });

    }catch(err){
        next(new appError(`${err.message}`, 400))
    }
};


exports.delCartItem = async function (req, res, next) {
    try {

        const cart = await Cart.findOne({where: { userId: req.user.id}});

        if(!cart){
           return next(new appError("Cart with is this user is not found", 404));
        };

        const getCartitem = await CartItem.findOne({ where: { productId: req.params.productId * 1, cartId: cart.userId } });

        if(!getCartitem){
            return next(new appError("Cart item is not found", 404));
        }

         await getCartitem.destroy();

        res.status(201).json({
            status: "SUCCESS",
            message: "cart item succesfully deleted"
        });

    } catch (err) {
       return next(new appError(`${err.message}`, 400));
    }
};