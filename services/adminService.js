const { Product, Category, subCategory } = require("./models/index");
// delete user
// delete product
// update user profile
// update products
// create products


// const products = JSON.parse(fs.readFileSync(`${__dirname}/data/subCategories.js`, 'utf-8'));
// const products = JSON.parse(fs.readFileSync(`${__dirname}/data/Category.js`, 'utf-8'));
const products = JSON.parse(fs.readFileSync(`${__dirname}/data/products.js`, 'utf-8'));

// console.log(products)

const importData = async (name) => {
	try {
		await name.bulkCreate(products);
		console.log("product successfully imported");
	} catch (err) {
		console.log(err);
	}
};


const deleteData = async (name) => {
	try {
		await name.destroy({ truncate: true });
		console.log("product successfully delete");
	} catch (err) {
		console.log(err.message);
	}
};


if (process.argv[2] === '--import') {
	importData(Product);
	// importData(Category);
	// importData(subCategory);

}

if (process.argv[2] === '--delete') {
	deleteData(Product);
	// deleteData(Category);
	// deleteData(subCategory);
}