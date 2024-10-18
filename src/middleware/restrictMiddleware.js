exports.restrictRoute = function (role) {
     return (req, res, next) => {
        if (req.user.role === role) {
             return res.status(403).json({
            "message": "You can't have access to these route "
        })
     }
        return next();
      
    }

};
