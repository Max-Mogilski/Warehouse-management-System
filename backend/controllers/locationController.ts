import { Request, Response } from "express";
import { prisma } from "../prisma/prisma";
import { StatusCodes } from "http-status-codes";

export const createLocation = async (req: Request, res: Response) => {
	const location = await prisma.location.create({ data: {} });
	res.status(StatusCodes.CREATED).json({ data: location });
};
