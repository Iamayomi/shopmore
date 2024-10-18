const app = require("./app");
require("./config/db");

const port = process.env.PORT || 3000;

app.listen(port, ()=> {
	console.log(`Server is connected at port ${port}😃😃😃`)
});