import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import BadRequestError from "../errors/bad-request";
import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();

export const getAllProducts = async (req: Request, res: Response) => {
	const products = await prisma.product.findMany({
		select: {
			id: true,
			name: true,
			price: true,
			url: true,
			quantity: true,
		},
	});
	res.status(StatusCodes.OK).json({ data: products });
};

export const getSingleProduct = async (req: Request, res: Response) => {
	const productId = req.params.id;
	const product = await prisma.product.findFirst({
		where: {
			id: productId,
		},
	});
	if (!product) {
		throw new BadRequestError(`Order with id ${productId} doesn't exists!`);
	}
	res.status(StatusCodes.OK).json({ data: product });
};

export const createProduct = async (req: Request, res: Response) => {
	const { name, price, url } = req.body;
	let { quantity } = req.body;

	if (!quantity) {
		quantity = 0;
	}

	if (!name || !price || !url) {
		throw new BadRequestError("Please provide product all fields");
	}

	const product = await prisma.product.create({
		data: { ...req.body, quantityStock: quantity },
	});

	res.status(StatusCodes.OK).json({ data: product });
};
