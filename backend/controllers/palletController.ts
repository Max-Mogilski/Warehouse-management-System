import { Request, Response } from "express";
import { prisma } from "../prisma/prisma";
import { StatusCodes } from "http-status-codes";
import CustomAPIError from "../errors/custom-api";
import BadRequestError from "../errors/bad-request";

export const createPallet = async (req: Request, res: Response) => {
	const { locationId } = req.body;

	if (!locationId) {
		throw new BadRequestError("Please provide location id!");
	}

	const existingPallet = await prisma.location.findUnique({
		where: { id: locationId },
		select: { palletId: true },
	});

	if (!existingPallet) {
		throw new BadRequestError(
			`Provided location with id ${locationId} doesn't exists!`
		);
	}

	if (existingPallet.palletId) {
		throw new BadRequestError("Location already contains a pallet.");
	}

	const pallet = await prisma.pallet.create({
		data: {
			locationId: locationId,
		},
	});

	if (!pallet) {
		throw new CustomAPIError("Couldn't create new pallet, try again later!");
	}

	await prisma.location.update({
		where: { id: pallet.locationId! },
		data: {
			palletId: pallet.id,
		},
	});

	res.status(StatusCodes.CREATED).json({ data: pallet });
};

export const getPalletProducts = async (req: Request, res: Response) => {
	const { id } = req.params;

	if (!id) {
		throw new BadRequestError("Please provide pallet id!");
	}

	const products = await prisma.palletProduct.findMany({
		where: {
			palletId: id,
		},
		select: {
			quantity: true,
			product: {
				select: {
					id: true,
					name: true,
				},
			},
		},
	});

	res.status(StatusCodes.CREATED).json({ data: products });
};
