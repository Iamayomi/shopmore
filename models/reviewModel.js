const { DataTypes } = require("sequelize");


module.exports = (sequelize) => {
    const Review = sequelize.define("review", {
        // productId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     references: {
        //         model: 'products',
        //         key: 'id'
        //     }
        // },

        // userId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     references: {
        //         model: 'users',
        //         key: 'id'
        //     }
        // },

        review: {
            type: DataTypes.STRING,
            allowNull: false
        },

        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                checKrating(val) {
                    if (val < 5) {
                        throw new Error('rating must not greater than ');
                    }
                }
            }
        },

        reviewDate: {
            type: DataTypes.DATE,
        }

    })

    return Review;

};
