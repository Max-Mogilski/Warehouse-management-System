import { Request, Response } from "express";
import { prisma } from "../prisma/prisma";
import { getTotalOrderPrice } from "../utils/order/getTotalPrice";
import { checkStockQuantity } from "../utils/order/checkQuantity";
import { Statuses } from "../utils/order/enum/statuses";
import { StatusCodes } from "http-status-codes";
import { getOrderProductsList } from "../utils/order/getOrderProductsList";
import { getUpdatedProducts } from "../utils/order/getUpdatedProducts";
import BadRequestError from "../errors/bad-request";

export const createOrder = async (req: Request, res: Response) => {
	const {
		address: street,
		city,
		postcode,
		email,
		fullName,
		products,
	} = req.body;

	if (
		!street ||
		!city ||
		!postcode ||
		!email ||
		!fullName ||
		!products ||
		products.length === 0 ||
		!products[0].id ||
		!products[0].quantity
	) {
		throw new BadRequestError("Please provide all values!");
	}

	const productsToFind = products.map((product: { id: string }) => product.id);

	const productsData = await prisma.product.findMany({
		where: {
			id: { in: productsToFind },
		},
	});

	if (!productsData || productsData.length === 0) {
		throw new BadRequestError("Product doesn't exist");
	}

	checkStockQuantity(productsData, products);
	const totalPrice = getTotalOrderPrice(productsData, products);
	const orderProductsList = getOrderProductsList(products);
	const address = `${street}, ${city}, ${postcode}`;

	const order = await prisma.order.create({
		data: {
			status: Statuses.CREATED,
			address,
			customer: fullName,
			customerEmail: email,
			totalPrice: totalPrice,
			orderProducts: {
				create: orderProductsList,
			},
		},
	});

	const updatedProducts = getUpdatedProducts(productsData, products);
	updatedProducts.map(async (product) => {
		const { id, quantity } = product;
		await prisma.product.update({ where: { id }, data: { quantity } });
	});

	res.status(StatusCodes.OK).json(order);
};

export const getAllOrders = async (req: Request, res: Response) => {
	const ordersList = await prisma.order.findMany({
		select: {
			id: true,
			status: true,
		},
	});
	res.status(StatusCodes.OK).json({ data: ordersList });
};
