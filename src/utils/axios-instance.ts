import axios from 'axios';
import { globalErrorHandler } from './global-error-handler';

const $axios = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 30000,
});

$axios.interceptors.response.use((resp) => {
    return Promise.resolve(resp);
}, (error) => {
    globalErrorHandler(error.response);
    throw(error)
});

export default $axios;