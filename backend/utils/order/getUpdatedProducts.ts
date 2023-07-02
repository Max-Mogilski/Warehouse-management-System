import { Product } from "@prisma/client";

export const getUpdatedProducts = (
	productsDB: Product[],
	products: { id: string; quantity: number }[]
) => {
	const updatedStock: { [key: string]: number } = {};

	for (const product in productsDB) {
		updatedStock[productsDB[product].id] = productsDB[product]
			.quantity as number;
	}

	for (const product in products) {
		updatedStock[products[product].id] = (updatedStock[products[product].id] -
			products[product].quantity) as number;
	}

	for (const product in productsDB) {
		productsDB[product].quantity = updatedStock[productsDB[product].id];
	}

	return productsDB;
};
