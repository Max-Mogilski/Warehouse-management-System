import { prisma } from "../prisma/prisma";
import { Request } from "express";
import crypto from "crypto";

export const createRefreshToken = async (req: Request, user: any) => {
	let refreshToken = "";

	refreshToken = crypto.randomBytes(40).toString("hex");
	const userAgent = req.headers["user-agent"] || "";
	const ip = req.ip;
	const userToken = {
		refreshToken,
		userAgent,
		ip,
		user: { connect: { id: user.id } },
		isValid: true,
	};

	await prisma.token.create({ data: userToken });

	return refreshToken;
};
