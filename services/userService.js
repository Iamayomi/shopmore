const { Cart, User, Product, CartItem } = require("../models/index");
const appError = require("./../utils/appError");


exports.changePassword = async function(req, res, next){
  try{

      const user = await User.findByPk(req.user.id);

      const { newPassword, confirmNewPassword } = req.body;

      if (!newPassword || !confirmNewPassword) {
          return next(new appError("Enter newPassword and confirmNewPassword", 400));
      };

      if(!(newPassword === confirmNewPassword)){
           next(new appError(`newPassWord and comfirmNewPassword are not the same`, 400));
      };

      user.password = newPassword;
      user.confirmPassword = confirmNewPassword;
      await user.save();

      res.status(201).json({
        status: "success",
        data: {
          updateUser: user
        } 
      })

  } catch(err){
     return next(new appError(`${err.message}`, 400));
  }
};


exports.updateMe = async function(req, res, next){
   try {
      
      const user = await req.user;

      const { email, phoneNumber } = req.body;

      user.email = email;
      user.phoneNumber = phoneNumber;
      await user.save();

       res.status(201).json({
        status: "success",
        data: {
          updateMe: user
        } 
      })

   } catch(err){
     return next(new appError(`${err.message}`, 400));

   }
}


exports.deleteMe = async function (req, res, next) {

  try {

    let user = await req.user;

    const { deleteAccount } = req.body;

    if(!deleteAccount) {
      return next(new appError(`choose True to deactivate your account`, 400));
    }

   await user.update({ active: false });  

  } catch (err) {
     next(new appError(`${err.message}`, 400));
   }
};
