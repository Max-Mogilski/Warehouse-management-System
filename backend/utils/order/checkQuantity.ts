import { Product } from "@prisma/client";
import ConflictError from "../../errors/conflict";

export const checkStockQuantity = (
	productsDB: Product[],
	products: { id: string; quantity: number }[]
) => {
	const stock: { [key: string]: number } = {};

	for (const product in productsDB) {
		stock[productsDB[product].id] = productsDB[product].quantity as number;
	}

	for (let i = 0; i < products.length; i++) {
		if (stock[products[i].id] < products[i].quantity) {
			throw new ConflictError("Insufficient stock quantity");
		}
	}
};
