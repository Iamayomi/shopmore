const fs = require("fs");
const { Product, Category, subCategory } = require("./models/index");

// const products = JSON.parse(fs.readFileSync(`${__dirname}/data/subCategories.json`, 'utf-8'));
// const products = JSON.parse(fs.readFileSync(`${__dirname}/data/Category.json`, 'utf-8'));
const products = JSON.parse(fs.readFileSync(`${__dirname}/data/products.json`, 'utf-8'));


const importData = async (name) => {
    try {
        await name.bulkCreate(products);
        console.log("product successfully imported");
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};


const deleteData = async (name) => {
    try {
        await name.truncate({ cascade: true });
        console.log("product successfully deleted");
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
};


if (process.argv[2] === '--import') {
    importData(Product);
    // importData(Category);
    // importData(subCategory);

}

if (process.argv[2] === '--delete') {
    // deleteData(Product);
    deleteData(Category);
    // deleteData(subCategory);
}