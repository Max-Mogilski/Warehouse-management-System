const API = {
  GET_ALL_PRODUCTS: 'products',
  LOGIN_USER: 'auth/login',
  REGISTER_USER: 'auth/register',
  CREATE_ORDER: 'orders',
  GET_ALL_ORDERS: 'orders',
  GET_ORDER: (id) => `orders/${id}`,
  GET_ORDER_PRODUCTS: (id) => `orders/${id}/products`,
  GET_CURRENT_USER: 'auth/current-user',
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
};

export const schemaFiller = (sourceObj, schema, additionalFields) => {
  const preparedObj = {};
  Object.keys(schema).forEach((key) => {
    preparedObj[key] = sourceObj[key];
  });

  return { ...preparedObj, ...additionalFields };
};
