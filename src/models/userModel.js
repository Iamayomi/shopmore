const { DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize) => {
  const User = sequelize.define(
    "user",
    {
      username: {
        type: DataTypes.STRING,
        unique: true,
      },

      phoneNumber: {
        type: DataTypes.STRING,
        // allowNull: false,
        validate: {
          checkVal(val) {
            if (!/^\+?[0-9]+(-?[0-9]+)*$/) {
              throw new Error("Please provide a valid phone number");
            }
          },
        },
        unique: true,
      },

      ipAddress: {
        type: DataTypes.STRING,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isEmail: true },
        unique: true,
      },

      gender: {
        type: DataTypes.STRING,
        // allowNull: false,
      },

      country: {
        type: DataTypes.STRING,
      },

      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },

      role: {
        type: DataTypes.STRING,
        defaultValue: "user",
      },

      acceptedTerms: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
        validate: {
          checkVal(val) {
            if (val !== true) {
              throw new Error("you did not accept the Term&condition");
            }
          },
        },
      },

      otp: {
        type: DataTypes.STRING,
        defaultValue: null,
      },

      otpExpiry: {
        type: DataTypes.DATE,
        defaultValue: null,
      },

      isEmailVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      isPhoneVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      password: {
        type: DataTypes.STRING,
        // allowNull: false,
        validate: {
          min: 8,
        },
      },

      confirmPassword: {
        type: DataTypes.VIRTUAL,
        validate: {
          min: 8,
        },
      },

      userCreatedAt: {
        type: DataTypes.DATE,
        defaultValue: Date.now(),
      },
    },
    {
      timestamps: false,
    }
  );

  //   User.beforeCreate(async function (user) {
  //     if (user.password !== user.confirmPassword) {
  //       throw new Error("Password does not match");
  //     }
  //   });

  User.getActiveUsers = async function () {
    try {
      const activeUsers = await this.findAll({ where: { active: true } });
      return activeUsers;
    } catch (err) {
      throw new Error("Error fetching active users");
    }
  };

  User.beforeSave(async function (user) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
  });

  User.comparePassword = async function (signinPassword, userPassword) {
    return await bcrypt.compare(signinPassword, userPassword);
  };

  return User;
};
