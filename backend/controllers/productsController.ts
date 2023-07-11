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

export const getSigleProduct = (req: Request, res: Response) => {
	res.status(StatusCodes.OK).json({ product: {} });
};

export const createProduct = async (req: Request, res: Response) => {
	const { name, price, url } = req.body;
	let { quantity, id } = req.body;

	if (!quantity) {
		quantity = 0;
	}

	const productObj = { ...req.body, quantityStock: quantity };

	if (id) {
		productObj.id = id;
	}

	if (!name || !price || !url) {
		throw new BadRequestError("Please provide product all fields");
	}

	const product = await prisma.product.create({
		data: { ...req.body, quantityStock: quantity },
	});

	res.status(StatusCodes.OK).json({ data: product });
};
