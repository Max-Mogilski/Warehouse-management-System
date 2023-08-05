import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import BadRequestError from "../errors/bad-request";
import { PrismaClient } from "@prisma/client";
import { getUpdatedLocation } from "../utils/product/getUpdatedLocation";
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

export const refillProduct = async (req: Request, res: Response) => {
	const { productId, productQuantity, palletId } = req.body;

	if (!productId || !productQuantity || !palletId)
		throw new BadRequestError("Please provide all required values!");

	if (productQuantity < 1) {
		throw new BadRequestError("Quantity can't be smaller than 1");
	}

	const product = await prisma.product.findUnique({ where: { id: productId } });

	if (!product)
		throw new BadRequestError(`Product with id ${productId} doesn't exists!`);

	const pallet = await prisma.pallet.findUnique({ where: { id: palletId } });

	if (!pallet)
		throw new BadRequestError(`Pallet with id ${palletId} doesn't exists!`);

	let palletProduct = await prisma.palletProduct.findFirst({
		where: {
			productId,
			palletId,
		},
	});

	if (palletProduct) {
		await prisma.palletProduct.update({
			where: { id: palletProduct.id },
			data: { quantity: palletProduct.quantity + productQuantity },
		});
	} else {
		palletProduct = await prisma.palletProduct.create({
			data: {
				palletId: pallet.id,
				productId: product.id,
				quantity: productQuantity,
			},
		});
	}

	const location = await prisma.location.findFirst({
		where: {
			palletId: palletProduct.palletId,
		},
	});

	const updatedLocations = getUpdatedLocation(
		product.locations ? product.locations : "",
		`${location?.locationNo}`
	);

	await prisma.product.update({
		where: { id: productId },
		data: {
			quantity: product.quantity + productQuantity,
			quantityStock: product.quantityStock + productQuantity,
			locations: updatedLocations,
		},
	});

	res.status(StatusCodes.OK).json({ msg: "ok" });
};

export const relocateProduct = async (req: Request, res: Response) => {
	const { productId, productQuantity, currentPalletId, destinationPalletId } =
		req.body;

	if (
		!productId ||
		!productQuantity ||
		!currentPalletId ||
		!destinationPalletId
	)
		throw new BadRequestError("Please provide all required values!");

	if (currentPalletId === destinationPalletId) {
		throw new BadRequestError("Please provide a different destination pallet!");
	}

	if (productQuantity < 1) {
		throw new BadRequestError("Quantity can't be smaller than 1");
	}

	const currentPalletProduct = await prisma.palletProduct.findFirst({
		where: {
			productId,
			palletId: currentPalletId,
		},
	});

	if (!currentPalletProduct)
		throw new BadRequestError(
			"The provided pallet/product doesn't exist or pallet doesn't contain the provided product"
		);

	const destinationPalletProduct = await prisma.palletProduct.findFirst({
		where: {
			productId,
			palletId: destinationPalletId,
		},
	});

	const destinationPallet = await prisma.pallet.findFirst({
		where: { id: destinationPalletId },
	});

	if (!destinationPallet)
		throw new BadRequestError(
			`Provided destination pallet with ID: ${destinationPalletId} doesn't exist!`
		);

	if (currentPalletProduct?.quantity! - +productQuantity < 0) {
		throw new BadRequestError(
			`Pallet with ID: ${currentPalletId} doesn't contain enough products!`
		);
	}

	if (currentPalletProduct?.quantity! - +productQuantity === 0) {
		if (destinationPalletProduct) {
			await prisma.palletProduct.delete({
				where: {
					id: currentPalletProduct?.id,
				},
			});

			await prisma.palletProduct.update({
				where: { id: destinationPalletProduct.id },
				data: { quantity: destinationPalletProduct.quantity + productQuantity },
			});
		} else {
			await prisma.palletProduct.update({
				where: {
					id: currentPalletProduct?.id,
				},
				data: {
					palletId: destinationPalletId,
				},
			});
		}
	} else {
		await prisma.palletProduct.update({
			where: { id: currentPalletProduct?.id },
			data: {
				quantity: currentPalletProduct?.quantity! - productQuantity,
			},
		});

		if (destinationPalletProduct) {
			await prisma.palletProduct.update({
				where: { id: destinationPalletProduct?.id },
				data: {
					quantity: destinationPalletProduct?.quantity! + productQuantity,
				},
			});
		} else {
			await prisma.palletProduct.create({
				data: {
					productId,
					quantity: productQuantity,
					palletId: destinationPalletId,
				},
			});
		}
	}

	res.status(StatusCodes.OK).json({ msg: "ok" });
};
