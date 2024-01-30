const User = require("./../models/userModel");

exports.getAllUser = async function(req, res){
  try {
  	const getAllUser = await User.findAll();

  	res.status(200).json({
  		status: "succes",
  		data: { 
  			users: getAllUser
  		}
  	})
  }catch (err){
  	res.status(400).send(err.message);
  }
};


exports.getAllActiveUsers = async (req, res, next) => {
  try {
    const activeUsers = await User.getActiveUsers();
    req.activeUsers = activeUsers;
    next();
  } catch (err) {
    res.status(500).json({ error: 'Error fetching active users' });
  }
};


exports.deleteMe = async function(req, res) {

   try{

   const user = await req.user;

   await user.update({ active: false });

  } catch(err){
   res.status(400).send(err.message);

 }
};