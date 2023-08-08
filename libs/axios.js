import axios from 'axios';
import { parseCookies } from 'nookies';
import useAuthUserStore from '../store/useAuthUserStore';

export const baseUrl = 'http://localhost:3030/';

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

axiosInstance.interceptors.request.use((config) => {
  let newConfig;

  if (typeof window !== 'undefined') {
    newConfig = config;

    newConfig.headers = {
      ...newConfig.headers,
      Authorization: `bearer ${useAuthUserStore.getState().accessToken}`,
    };
  }

  return newConfig || config;
}, undefined);

export const fetcher = (resource, init) =>
  axiosInstance.get(resource, init).then((res) => res.data);

export const postFetcher = (resource, init) =>
  axiosInstance.post(resource, init).then((res) => res.data);

export const putFetcher = (resource, init) =>
  axiosInstance.put(resource, init).then((res) => res.data);

export const deleteFetcher = (resource, init) =>
  axiosInstance.delete(resource, init).then((res) => res.data);

export const fetcherWithContext = async (resource, context) => {
  const { _t: accessToken } = parseCookies(context);

  try {
    const response = await axiosInstance.get(
      resource,
      accessToken
        ? {
            headers: {
              Authorization: `bearer ${accessToken}`,
            },
          }
        : undefined
    );

    return response.data;
  } catch (error) {
    return undefined;
  }
};

export default axiosInstance;
