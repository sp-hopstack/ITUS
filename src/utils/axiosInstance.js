import axios from 'axios';
import URL from 'url';
import dns from 'dns';

const instance = (baseURL) => {
  const axiosInstance = axios.create({
    baseURL,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  });

  axiosInstance.interceptors.request.use((req) => {
    if (!req || !req.baseURL) {
      return Promise.resolve(req);
    }

    const url = URL.parse(req.baseURL);
    const { hostname } = url;

    if (!hostname || !hostname.endsWith('hopstack')) {
      return Promise.resolve(req);
    }

    return new Promise((resolve) => {
      dns.resolveSrv(hostname, (_, addresses) => {
        if (addresses) {
          const keys = Object.keys(addresses);

          keys.forEach((item, index) => {
            const addr = addresses[index];
            if (!addr || !addr.name) return;

            delete url.host;
            url.hostname = addr.name;
            url.port = addr.port.toString();
            req.baseURL = URL.format(url);
          });
        }
        // if dns resolution fails, we will continue with the original request.
        return resolve(req);
      });
    });
  });

  // Add a response interceptor
  axiosInstance.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error),
  );

  return axiosInstance;
};

export default instance;
