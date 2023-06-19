require("dotenv").config();
require("express-async-errors");
import path from "path";

// extra security packages
import helmet from "helmet";

import morgan from "morgan";

// app init
import express from "express";
import router from "./routes/globalRouter";
const app = express();

app.use(morgan("tiny"));
app.use(express.json());
app.use(helmet());

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
