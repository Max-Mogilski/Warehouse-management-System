'use strict';

import axios from 'axios';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_APP_API;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.withCredentials = true;

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log(error);
    if (error.response.status === 401) {
      return;
    }
    if (error.response.status === 403) {
      location.replace('/cms/auth');
    } else if (error.response.status === 409) {
      if (error.response.data.errors) {
        error.response.data.errors.forEach((error) => {
          toast.error(error.message, { id: 'conflictError' });
        });
      }
    } else {
      toast.error('Błąd podczas przetwarzania danych', { id: 'serverError' });
    }
    return Promise.reject(error);
  }
);

export default axios;
