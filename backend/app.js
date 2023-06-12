require("dotenv").config();
require("express-async-errors");
const path = require("path");

// extra security packages
const helmet = require("helmet");
const xss = require("xss-clean");

const express = require("express");
const app = express();

app.use(express.json());
app.use(helmet());
app.use(xss());

app.use(express.static(path.resolve(__dirname, "../client/dist")));

// routes /api/v1/

// errors

const port = process.env.PORT || 8080;

const start = async () => {
	try {
		app.listen(port, () =>
			console.log(`Server is listening on port ${port}...`)
		);
	} catch (error) {
		console.log(error);
	}
};

start();
