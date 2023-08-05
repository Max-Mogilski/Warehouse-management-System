export const getUpdatedLocation = (
	productLocations: string,
	location: string
) => {
	if (productLocations.includes(location)) {
		return productLocations;
	}
	return productLocations.length === 0
		? location
		: productLocations + ", " + location;
};


