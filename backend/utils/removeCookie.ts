import { Response } from "express";

export const removeCookie = (res: Response, name: string) =>
	res.cookie(name, "null", {
		httpOnly: true,
		expires: new Date(Date.now()),
	});
