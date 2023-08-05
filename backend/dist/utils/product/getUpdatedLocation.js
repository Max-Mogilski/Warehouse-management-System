"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUpdatedLocation = void 0;
const getUpdatedLocation = (productLocations, location) => {
    if (productLocations.includes(location)) {
        return productLocations;
    }
    return productLocations.length === 0
        ? location
        : productLocations + ", " + location;
};
exports.getUpdatedLocation = getUpdatedLocation;
