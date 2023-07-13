const API = {
  LOGIN_USER: 'auth/login',
  REGISTER_USER: 'auth/register',
  LOGOUT_USER: 'auth/logout',
  CREATE_ORDER: 'orders',
  CREATE_LOCATION: 'locations',
  CREATE_PALLET: 'pallets',
  CREATE_PRODUCT: 'products',
  GET_ALL_PRODUCTS: 'products',
  GET_ALL_ORDERS: 'orders',
  GET_ALL_LOCATIONS: 'locations',
  GET_PRODUCT: (id) => `products/${id}`,
  GET_ORDER: (id) => `orders/${id}`,
  GET_LOCATION: (id) => `locations/${id}`,
  GET_ORDER_PRODUCTS: (id) => `orders/${id}/products`,
  GET_CURRENT_USER: 'auth/current-user',
  POST_REFILL_PRODUCT: '/products/refill',
  POST_RELOCATE_PRODUCT: '/products/relocate',
};

export default API;

export const asyncHandler = (promise) =>
  promise
    .then((data) => ({ data, error: null }))
    .catch((error) => ({ error, data: null }));

export const defaultSchema = {
  order: {
    address: '',
    city: '',
    email: '',
    fullName: '',
    postcode: '',
    products: [],
  },
  register: {
    fullName: '',
    email: '',
    password: '',
  },
  login: {
    email: '',
    password: '',
  },
  pallet: {
    locationId: '',
  },
  product: {
    id: '',
    name: '',
    quantity: 0,
    price: 0,
    weight: 0,
    url: '',
  },
  refill_product: {
    productId: '',
    productQuantity: 0,
    palletId: '',
  },
  relocate_product: {
    productId: '',
    productQuantity: 0,
    currentPalletId: '',
    destinationPalletId: '',
  },
};

export const schemaFiller = (sourceObj, schema, additionalFields) => {
  const preparedObj = {};
  Object.keys(schema).forEach((key) => {
    preparedObj[key] = sourceObj[key];
  });

  return { ...preparedObj, ...additionalFields };
};
