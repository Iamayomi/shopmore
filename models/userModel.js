const { DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize) => {
	const User = sequelize.define("user", {
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
			validate: {
				checkVal(val) {
					if (!/^\+?[0-9]+(-?[0-9]+)*$/) {
						throw new Error('Please provide a valid phone number');
					}
				}
			},
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
			defaultValue: "user"

		},

		acceptedTerms: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
			allowNull: false,
			validate: {
				checkVal(val) {
					if (val !== true) {
						throw new Error('you did not accept the Term&condition');
					}
				},
			},

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

	User.getActiveUsers = async function () {
		try {
			const activeUsers = await this.findAll({ where: { active: true } });
			return activeUsers;
		} catch (err) {
			throw new Error('Error fetching active users');
		}
	};


	User.beforeSave(async function (user) {
		const hashedPassword = await bcrypt.hash(user.password, 10);
		user.password = hashedPassword;
	});

	User.comparePassword = async function (signinPassword, userPassword) {
		return await bcrypt.compare(signinPassword, userPassword);
	};
	return User;
};




