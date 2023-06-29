const API = {
  GET_ALL_PRODUCTS: 'products',
  LOGIN_USER: 'auth/login',
  REGISTER_USER: 'auth/register',
};

export default API;

export const asyncHandler = (promise) =>
  promise
    .then((data) => ({ data, error: null }))
    .catch((error) => ({ error, data: null }));

export const defaultSchema = {};

export const schemaFiller = (sourceObj, schema, additionalFields) => {
  const preparedObj = {};
  Object.keys(schema).forEach((key) => {
    preparedObj[key] = sourceObj[key];
  });

  return { ...preparedObj, ...additionalFields };
};
