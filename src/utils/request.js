import axios from 'axios';

import { message } from 'antd';

const API_ROOT =
  process.env.NODE_ENV === 'development' ? '/dev/developer' : '/developer';
const MOCK_ROOT = '/mock';

const requestConfigAdapter = config => {
  let API_BASE = API_ROOT;
  if (config.isMock) {
    API_BASE = MOCK_ROOT;
  }

  return { url: `${API_BASE}${config.url}` };
};

const handleErrors = err => {

  return Promise.reject(err.response);
}

const responseData = res => res.data;

const handleResponse = res => {

  return res;
}

const tokenPlugin = config => {
  return config;
}

const request = {};

axios.interceptors.request.use(tokenPlugin, handleErrors);

axios.interceptors.response.use(handleResponse);

['delete', 'get', 'head', 'options'].forEach(method => {
  request[method] = ({ url, payload, isMock = false }) => {
    const { url: apiUrl } = requestConfigAdapter({ url, isMock });
    return axios[method](apiUrl, { params: payload }).then(responseData);
  }
});

['post', 'put', 'patch'].forEach(method => {
  request[method] = ({ url, payload, isMock = false }) => {
    const { url: apiUrl } = requestConfigAdapter({ url, isMock });
    return axios[method](apiUrl, payload).then(responseData);
  }
});

export default request;



// import axios from 'axios';

// export function request(params) {
//   return axiosRequest(params);
// }

// function axiosRequest(params) {
//   if (params.method.toLocaleLowerCase() === 'post') {
//     let newParams = new URLSearchParams();
//     if (params.data instanceof Object) {
//       for (let key in params.data) {
//         newParams.append(key, params.data[key]);
//       }
//       params.data = newParams;
//     }
//   } else if (params.method.toLocaleLowerCase() === 'file') {
//     params.method = 'post';

//     let newParams = new FormData();
//     if (params.data instanceof Object) {
//       for (let key in params.data) {
//         newParams.append(key, params.data[key]);
//       }
//       params.data = newParams;
//     }
//   }

//   let axiosConfig = {
//     method: params.method.toLocaleLowerCase(),
//     url: params.url,
//     data: params.data
//   };

//   if (params.config instanceof Object) {
//     for (let key in params.config) {
//       axiosConfig[key] = params.config[key];
//     }
//   }

//   return axios(axiosConfig).then(res => res.data);
// }


// import axios from 'axios';

// export function request(url, method = 'get', data = {}, config = {}) {
//   return axiosRequest(url, method, data, config);
// }

// function axiosRequest(url, method, data, config) {
//   if (method.toLocaleLowerCase() === 'post') {
//     let params = new URLSearchParams();
//     if (data instanceof Object) {
//       for (let key in data) {
//         params.append(key, data[key]);
//       }
//       data = params;
//     }
//   } else if (method.toLocaleLowerCase() === 'file') {
//     method = 'post';

//     let params = new FormData();
//     if (data instanceof Object) {
//       for (let key in data) {
//         params.append(key, data[key]);
//       }
//       data = params;
//     }
//   }

//   let axiosConfig = {
//     method: method.toLocaleLowerCase(),
//     url: url,
//     data: data
//   };

//   if (config instanceof Object) {
//     for (let key in config) {
//       axiosConfig[key] = config[key];
//     }
//   }

//   return axios(axiosConfig).then(res => res.data);
// }
