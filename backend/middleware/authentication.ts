import { NextFunction, Response, Request } from "express";
import UnauthenticatedError from "../errors/unauthenticated";
import { attachCookiesToResponse, isTokenValid } from "../utils/jwt";
import { prisma } from "../prisma/prisma";

export const authenticateUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { refreshToken, accessToken } = req.signedCookies;

	try {
		if (accessToken) {
			const payload = isTokenValid(accessToken);
			req.user = payload.user;
			return next();
		}

		const payload = isTokenValid(refreshToken);
		const existingToken = await prisma.token.findFirst({
			where: {
				userId: payload.user.id,
				refreshToken: payload.user.refreshToken,
			},
		});

		if (!existingToken || !existingToken?.isValid) {
			throw new UnauthenticatedError("Authentication Invalid");
		}

		attachCookiesToResponse({
			res,
			user: payload.user,
			refreshToken: existingToken.refreshToken,
		});

		req.user = payload.user;
		next();
	} catch (error) {
		throw new UnauthenticatedError("Authentication Invalid");
	}
};
