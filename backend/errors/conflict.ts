import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./custom-api";

class ConflictError extends CustomAPIError {
	statusCode: StatusCodes;
	constructor(message: string) {
		super(message);
		this.statusCode = StatusCodes.CONFLICT;
	}
}

export default ConflictError;
