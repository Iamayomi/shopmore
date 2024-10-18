const { DataTypes } = require("sequelize");


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
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                checKrating(val) {
                    if (val > 5.0) {
                        throw new Error('rating must not greater than 5.0');
                    }
                }
            }
        },
        
        reviewDate: {
            type: DataTypes.DATE,
            defaultValue: Date.now()
        }

    },{
        timestamps: false,
    })

    return Review;

};
