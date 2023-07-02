export const getOrderProductsList = (
	products: { quantity: number; id: string }[]
) => {
	return products.map((product: { quantity: number; id: string }) => {
		return {
			quantity: product.quantity,
			product: {
				connect: { id: product.id },
			},
		};
	});
};
