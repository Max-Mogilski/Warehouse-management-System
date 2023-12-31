require("dotenv").config();
require("express-async-errors");
import cookieParser from "cookie-parser";
import path from "path";

// extra security packages
import helmet from "helmet";

import morgan from "morgan";
import cors from "cors";

// app init
import express from "express";
import router from "./routes/globalRouter";
const app = express();

app.use(morgan("tiny"));
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.json());
app.use(helmet());

// allow images from external resources
app.use((req, res, next) => {
	res.setHeader("Content-Security-Policy", "img-src 'self' data: *");
	next();
});

app.use(express.static(path.resolve(__dirname, "../../client/dist")));

// routes /api/v1/
app.use("/api/v1", router);

// frontend routes
app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "../../client/dist", "index.html"));
});

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
