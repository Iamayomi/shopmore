const fs = require("fs");
// const productModel = require("./models/productModel");
const app = require('./app');
require('dotenv').config({ path: './config.env' });
const { Product } = require("./models/index");

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`server succesfully connected at ${port}`)
});

const products = JSON.parse(fs.readFileSync(`${__dirname}/data/products.js`, 'utf-8'));


const importData = async () => {
	try {
		await Product.bulkCreate(products);
		console.log("product successfully imported");
	} catch (err) {
		console.log(err);
	}
};


const deleteData = async () => {
	try {
		await Product.destroy({ truncate: true });
		console.log("product successfully delete");
	} catch (err) {
		console.log(err.message);
	}
};


if (process.argv[2] === '--import') {
	importData();
}

if (process.argv[2] === '--delete') {
	deleteData();
}