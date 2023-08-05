import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../prisma/prisma";
import BadRequestError from "../errors/bad-request";
import ConflictError from "../errors/conflict";

export const startOrderPicking = async (req: Request, res: Response) => {
	const user = req.user;

	const currentTask = await prisma.order.findFirst({
		where: {
			status: "PICKING",
			userId: user.userId,
		},
		select: { status: true, id: true },
	});

	if (currentTask) {
		throw new ConflictError("You already have assigned task!");
	}

	const order = await prisma.order.findFirst({
		where: { userId: null },
		orderBy: {
			createdAt: "asc",
		},
	});

	if (!order) {
		res
			.status(StatusCodes.OK)
			.json({ data: null, msg: "There are no orders to assign!" });
	}

	await prisma.order.update({
		where: {
			id: order?.id,
		},
		data: {
			userId: user.userId,
			status: "PICKING",
		},
	});

	res.status(StatusCodes.OK).json({ data: order });
};

export const checkPickingStatus = async (req: Request, res: Response) => {
	const user = req.user;

	const currentTask = await prisma.order.findFirst({
		where: {
			status: "PICKING",
			userId: user.userId,
		},
		select: { status: true, id: true },
	});

	if (currentTask) {
		res.status(StatusCodes.OK).json({ data: currentTask });
	}

	res.status(StatusCodes.OK).json({ data: null });
};

export const getProductToPick = async (req: Request, res: Response) => {
	const user = req.user;

	const currentTask = await prisma.order.findFirst({
		where: {
			status: "PICKING",
			userId: user.userId,
		},
		select: { status: true, id: true },
	});

	if (!currentTask) {
		throw new BadRequestError("No task assigned!");
	}

	const product = await prisma.orderProduct.findFirst({
		where: { orderId: currentTask.id, picked: false },
		select: {
			quantity: true,
			productId: true,
			orderId: true,
			picked: true,
			product: {
				select: { locations: true },
			},
		},
	});

	// order picked
	if (!product) {
		res.status(StatusCodes.OK).json({ data: null });
	}

	res.status(StatusCodes.OK).json({ data: product });
};

export const pickProduct = async (req: Request, res: Response) => {
	const { productId, quantity } = req.body;
	const user = req.user;

	if (!productId || !quantity) {
		throw new BadRequestError("Please provide product ID and quantity!");
	}

	const product = await prisma.product.findFirst({
		where: {
			id: productId,
		},
	});

	if (product?.quantityStock! < quantity) {
		throw new ConflictError("Not enough quantity of given item!");
	}

	const orderProductsData = await prisma.order.findFirst({
		where: { status: "PICKING", userId: user.userId },
		select: {
			id: true,
			orderProducts: {
				where: {
					productId,
					picked: false,
				},
			},
		},
	});

	if (!orderProductsData?.orderProducts[0]) {
		throw new BadRequestError("Invalid product provided!");
	}

	if (orderProductsData?.orderProducts[0].quantity !== quantity) {
		throw new BadRequestError("Invalid quantity provided!");
	}

	// update stock quantity
	await prisma.product.update({
		where: {
			id: productId,
		},
		data: {
			quantityStock: product?.quantityStock! - quantity,
		},
	});

	// update location
	const productLocation = product?.locations?.[0];

	const palletId = await prisma.location.findFirst({
		where: {
			locationNo: +productLocation!,
		},
		select: {
			pallet: {
				select: {
					id: true,
				},
			},
		},
	});

	const productPallet = await prisma.palletProduct.findFirst({
		where: {
			palletId: palletId?.pallet?.id,
			productId,
		},
	});

	if (productPallet?.quantity! < quantity) {
		throw new ConflictError("Not enough quatity of the provided product!");
	} else if (productPallet?.quantity! - quantity === 0) {
		await prisma.palletProduct.delete({
			where: {
				id: productPallet?.id,
			},
		});
		const updatedLocations =
			product?.locations?.length === 1
				? ""
				: product?.locations?.replace(`${productLocation}, `, "");
		await prisma.product.update({
			where: {
				id: product?.id,
			},
			data: {
				locations: updatedLocations,
			},
		});
	} else {
		await prisma.palletProduct.update({
			where: {
				id: productPallet?.id,
			},
			data: {
				quantity: productPallet?.quantity! - quantity,
			},
		});
	}

	await prisma.orderProduct.updateMany({
		where: {
			orderId: orderProductsData?.id,
			productId,
		},
		data: {
			picked: true,
		},
	});

	await prisma.user.update({
		where: { id: user.userId },
		data: {
			totalPicks: {
				increment: quantity,
			},
			todayPicks: {
				increment: quantity,
			},
		},
	});

	// check if completed

	const currentOrderData = await prisma.order.findFirst({
		where: { status: "PICKING", userId: user.userId },
		select: {
			orderProducts: {
				where: {
					picked: false,
				},
			},
		},
	});

	if (!currentOrderData?.orderProducts[0]) {
		await prisma.order.updateMany({
			where: { status: "PICKING", userId: user.userId },
			data: {
				status: "PICKED",
			},
		});
		res.status(StatusCodes.OK).json({ data: null, msg: "completed" });
	}

	res.status(StatusCodes.OK).json({ data: null });
};

// update product stock quantity - x
// update location
// update product location if item quantity is equal 0
// update order product status
