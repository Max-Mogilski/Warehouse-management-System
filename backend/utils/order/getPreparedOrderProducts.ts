import { OrderProduct, Product } from "@prisma/client";

interface ProductObj {
	productId?: string;
	quantity?: number;
	name?: string;
	price?: number;
}

export const getPreparedOrderProducts = (
	orderProducts: OrderProduct[],
	products: Product[]
) => {
	const preparedObj: {
		[key: string]: ProductObj;
	} = {};

	for (const product in orderProducts) {
		preparedObj[orderProducts[product].productId] = {
			productId: orderProducts[product].productId,
			quantity: orderProducts[product].quantity,
		};
	}

	for (const product in products) {
		preparedObj[products[product].id] = {
			...preparedObj[products[product].id],
			name: products[product].name,
			price: products[product].price,
		};
	}
	return Object.keys(preparedObj).map((key) => preparedObj[key]);
};
