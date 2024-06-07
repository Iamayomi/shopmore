const { DataTypes } = require("sequelize");


const generateRandomId = function () {
    return Math.floor(Math.random() * 10000000);
}; 

module.exports = (sequelize) => {
    const Review = sequelize.define("review", {
        //  reviewId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     primaryKey: true,
        //     defaultValue: () => generateRandomId()
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

    },{
        timestamps: true,
    })

    return Review;

};
