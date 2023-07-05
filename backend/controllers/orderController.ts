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

export const getOrder = async (req: Request, res: Response) => {
	const orderId = req.params.id;
	const order = await prisma.order.findFirst({
		where: {
			id: orderId,
		},
	});
	if (!order) {
		throw new BadRequestError(`Order with id ${orderId} doesn't exists!`);
	}
	res.status(StatusCodes.OK).json({ data: order });
};

export const getOrderProducts = async (req: Request, res: Response) => {
	const orderId = req.params.id;

	const orderProducts = await prisma.orderProduct.findMany({
		where: {
			orderId,
		},
		include: {
			product: true,
		},
	});

	if (!orderProducts || orderProducts.length === 0) {
		throw new BadRequestError(
			`Order with id ${orderId} doesn't have any products!`
		);
	}

	const products = orderProducts.map((orderProduct) => ({
		productId: orderProduct.productId,
		quantity: orderProduct.quantity,
		name: orderProduct.product.name,
		price: orderProduct.product.price,
	}));

	res.status(StatusCodes.OK).json({ data: products });
};
