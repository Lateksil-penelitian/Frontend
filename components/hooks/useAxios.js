import { makeUseAxios } from 'axios-hooks';
import axiosInstance from '../../libs/axios';

const useAxios = makeUseAxios({
  axios: axiosInstance,
  cache: false,
});

export default useAxios;
