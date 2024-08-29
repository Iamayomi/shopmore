const app = require('./app');
require('dotenv').config({ path: './config.env' });

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`server succesfully connected at ${port}`)
});


// uncaught exception error
process.on('uncaughtExecption', (err) => {
	console.error("Uncaught Exception", err.message);
	process.exit(1);
});

// Unhandle promise rejection error
process.on('unhandledRejection', (err) => {
	console.error("Unhandled Rejection", err);
	process.exit(1);
});


process.on('SIGTERM', ()=> {
	console.log("SIGTERM signal received.")
	app.close(() => {
		console.log("HTTP server close.")
	})
});
