import { Request, Response } from "express";
import { prisma } from "../prisma/prisma";
import { StatusCodes } from "http-status-codes";
import BadRequestError from "../errors/bad-request";

export const createLocation = async (req: Request, res: Response) => {
	const locationsCount = await prisma.location.count();
	const location = await prisma.location.create({
		data: {
			locationNo: locationsCount + 1,
		},
	});
	res.status(StatusCodes.CREATED).json({ data: location });
};

export const getLocation = async (req: Request, res: Response) => {
	const { id } = req.params;

	if (!id) {
		throw new BadRequestError("Please provide location ID!");
	}

	const location = await prisma.location.findFirst({ where: { id } });

	if (!location) {
		throw new BadRequestError(`Location with ID ${id} doesn't exists!`);
	}

	res.status(StatusCodes.OK).json({ data: location });
};

export const getAllLocations = async (req: Request, res: Response) => {
	const locations = await prisma.location.findMany({});
	res.status(StatusCodes.OK).json({ data: locations });
};
