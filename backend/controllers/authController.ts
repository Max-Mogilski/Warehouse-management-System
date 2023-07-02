import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import BadRequestError from "../errors/bad-request";
import { prisma } from "../prisma/prisma";
import { attachCookiesToResponse } from "../utils/auth/jwt";
import { createTokenUser } from "../utils/auth/createTokenUser";
import { comparePassword, hashPassword } from "../utils/auth/passwordHash";
import UnauthenticatedError from "../errors/unauthenticated";
import { removeCookie } from "../utils/auth/removeCookie";
import { createRefreshToken } from "../utils/auth/createRefreshToken";

export const register = async (req: Request, res: Response) => {
	const { fullName, email, password } = req.body;

	if (!fullName || !email || !password) {
		throw new BadRequestError("Please provide all required values");
	}

	const userCredentials = fullName.split(" ");
	if (userCredentials.length < 2) {
		throw new BadRequestError("Please provide your firstname and lastname");
	}

	// Need to change user model to fullname instead of firstname and lastname !!!
	const firstName = userCredentials[0];
	const lastName = userCredentials[1];

	// throw an error if user already exists
	const isEmailInUse = await prisma.user.findFirst({
		where: {
			email: { equals: email },
		},
	});

	if (isEmailInUse) {
		throw new BadRequestError("Email already exists");
	}

	const hashedPassword = await hashPassword(password);

	const userData = { firstName, lastName, email, password: hashedPassword };

	const user = await prisma.user.create({
		data: userData,
	});

	// create token data, token and attach cookie
	const tokenUserData = createTokenUser(user);
	const refreshToken = await createRefreshToken(req, user);

	attachCookiesToResponse({ res, user: tokenUserData, refreshToken });

	return res.status(StatusCodes.CREATED).json({ user: tokenUserData });
};

export const login = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	if (!email || !password) {
		throw new BadRequestError("Please provide all required values");
	}

	const user = await prisma.user.findFirst({
		where: {
			email: { equals: email },
		},
	});

	if (!user) {
		throw new UnauthenticatedError("Invalid credentials");
	}

	const isMatch = await comparePassword(password, user.password);

	if (!isMatch) {
		throw new BadRequestError("Invalid credentials");
	}

	const existingToken = await prisma.token.findFirst({
		where: {
			userId: user.id,
		},
	});

	let refreshToken = "";

	if (existingToken) {
		const { isValid } = existingToken;
		if (!isValid) {
			throw new UnauthenticatedError("Invalid credentials");
		}
		refreshToken = existingToken.refreshToken;
	} else {
		refreshToken = await createRefreshToken(req, user);
	}

	const tokenUser = createTokenUser(user);
	attachCookiesToResponse({ res, user: tokenUser, refreshToken });

	return res.status(StatusCodes.OK).json({ user: tokenUser });
};

export const logout = async (req: Request, res: Response) => {
	await prisma.token.delete({
		where: {
			userId: req.user.userId,
		},
	});

	removeCookie(res, "accessToken");
	removeCookie(res, "refreshToken");

	res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};
