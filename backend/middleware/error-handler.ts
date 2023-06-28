import { StatusCodes } from "http-status-codes";
import CustomAPIError from "../errors/custom-api";
import { NextFunction, Request, Response } from "express";

interface Error extends CustomAPIError {
	statusCode: StatusCodes;
}

const errorHandlerMiddleware = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.log(err);
	let customError = {
		statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
		msg: err.message || "Something went wrong, try again later",
	};

	return res.status(customError.statusCode).json({ msg: customError.msg });
};

export default errorHandlerMiddleware;
