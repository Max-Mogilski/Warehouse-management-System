import jwt, { JwtPayload } from "jsonwebtoken";
import { Response } from "express";

export const createJWT = ({ payload }: any) => {
	const token = jwt.sign(payload, process.env.JWT_SECRET);
	return token;
};

export const isTokenValid = (token: string) =>
	jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

export const attachCookiesToResponse = ({
	res,
	user,
	refreshToken,
}: {
	res: Response;
	user: any;
	refreshToken: string;
}) => {
	const accessTokenJWT = createJWT({ payload: { user } });
	const refreshTokenJWT = createJWT({ payload: { user, refreshToken } });

	const oneDay = 1000 * 60 * 60 * 24;
	const oneMinute = 1000 * 60;

	res.cookie("accessToken", accessTokenJWT, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		signed: true,
		maxAge: oneMinute * 15,
	});

	res.cookie("refreshToken", refreshTokenJWT, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		signed: true,
		maxAge: oneDay * 30,
	});
};
