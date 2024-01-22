const { sq } = require("./../db");
const { DataTypes, Sequelize } = require("sequelize");
const bcrypt = require("bcryptjs");
const phonenumberUtil = require("libphonenumber-js");


const User = sq.define("user", {
	firstname: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			notNull: {
				msg: "firstname is required"
			}
		}
	},

	lastname: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			notNull: {
				msg: "lastname is required"
			}
		}
	},

	phonenumber: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: { async isPhoneNumberValid(val) {
			try {
			  const phoneNumber = await phonenumberUtil.parsePhoneNumberCharacter(val);

              if(!phoneNumber.isValidPhoneNumber()) {
				throw new Error("Invalid phone number");
		     	}
			} catch(error){
				console.log(error);
			}
			
		}},
		unique: true
	},

    email: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: { isEmail: true },
		unique: true
	},

	gender: {
		type: DataTypes.STRING,
		allowNull: false,
	},

	country: {
		type: DataTypes.STRING,
	},

	date_Of_Birth: {
		type: DataTypes.DATE,
		allowNull: false,
	},

	active: {
		type: DataTypes.BOOLEAN,
		defaultValue: true
	},

	role: {
		type: DataTypes.STRING,
		defaultValue: "user" ?? "admin"

	},

   acceptedTerms: {
     type: DataTypes.BOOLEAN,
	 defaultValue: false,
	 allowNull: false

   },

	password: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			min: 8
		}
	},

	confirmPassword: {
		type: DataTypes.VIRTUAL,
		validate: {
			min: 8
		}
	},

	passwordResetToken: {
		type: DataTypes.STRING,
		
	},
	
	passwordResetExpires: {
		type: DataTypes.DATE,
	}
	
});

User.beforeCreate(async function (user) {
	if (user.password !== user.confirmPassword) {
		throw new Error("Password does not match")
	}
});

User.beforeFind(async function(){

});

User.beforeSave(async function (user) {
	const hashedPassword = await bcrypt.hash(user.password, 10);
	user.password = hashedPassword;
});

User.comparePassword = async function (signinPassword, userPassword) {
	return await bcrypt.compare(signinPassword, userPassword);
};



(async function () {
	try {
		await User.sync()
		console.log("User Model synced")
	} catch (err) {
		console.error("Error syncing model", err)
	}
})();

module.exports = User;
