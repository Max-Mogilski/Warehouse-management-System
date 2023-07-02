import { Product } from "@prisma/client";

type productList = {
	[key: string]: {
		price: number;
		quantity: number;
	};
};

export const getTotalOrderPrice = (
	productsDB: Product[],
	products: { id: string; quantity: number }[]
) => {
	const productsList: productList = {};

	for (const product in productsDB) {
		productsList[productsDB[product].id] = {
			price: productsDB[product].price,
			quantity: 0,
		};
	}

	for (const product in products) {
		productsList[products[product].id].quantity = products[product].quantity;
	}

	let totalPrice = 0;
	for (const product in productsList) {
		totalPrice += productsList[product].price * productsList[product].quantity;
	}

	return totalPrice;
};
