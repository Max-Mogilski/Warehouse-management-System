import { Request, Response } from "express";
import { prisma } from "../prisma/prisma";
import { getTotalOrderPrice } from "../utils/order/getTotalPrice";
import { checkStockQuantity } from "../utils/order/checkQuantity";
import { Statuses } from "../utils/order/enum/statuses";
import { StatusCodes } from "http-status-codes";
import { getOrderProductsList } from "../utils/order/getOrderProductsList";
import { getUpdatedProducts } from "../utils/order/getUpdatedProducts";

export const createOrder = async (req: Request, res: Response) => {
	const {
		address: street,
		city,
		postcode,
		email,
		fullName,
		products,
	} = req.body;

	const productsToFind = products.map((product: { id: string }) => product.id);

	const productsData = await prisma.product.findMany({
		where: {
			id: { in: productsToFind },
		},
	});

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
