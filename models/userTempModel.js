const { DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");


module.exports = (sequelize) => {

    const UserTemp = sequelize.define("userTemp", {

        username: {
            type: DataTypes.STRING,
            allowNull: false
        },

        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                checkVal(val) {
                    if (!/^\+?[0-9]+(-?[0-9]+)*$/) {
                        throw new Error('Please provide a valid phone number');
                    }
                }
            },
        },

        ip: {
            type: DataTypes.STRING,
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { isEmail: true }
        },

        gender: {
            type: DataTypes.STRING,
            // allowNull: false,
        },

        country: {
            type: DataTypes.STRING,
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

        otp: {
            type: DataTypes.STRING,
        },

        otpExpiry: {
            type: DataTypes.DATE,
        },

        isphoneVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },

        password: {
            type: DataTypes.STRING,
            // allowNull: false,
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
            defaultValue: null
        },

        passwordResetExpires: {
            type: DataTypes.DATE,
            defaultValue: null
        },

        userCreatedAt: {
            type: DataTypes.DATE,
            defaultValue: Date.now()
        }

    }, {
        timestamps: false,
    });

    // User.beforeCreate(async function (user) {
    // 	if (user.password !== user.confirmPassword) {
    // 		throw new Error("Password does not match")
    // 	}
    // });

    UserTemp.getActiveUsers = async function () {
        try {
            const activeUsers = await this.findAll({ where: { active: true } });
            return activeUsers;
        } catch (err) {
            throw new Error('Error fetching active users');
        }
    };


    UserTemp.beforeSave(async function (user) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
    });

    UserTemp.comparePassword = async function (signinPassword, userPassword) {
        return await bcrypt.compare(signinPassword, userPassword);
    };

    return UserTemp;
};




