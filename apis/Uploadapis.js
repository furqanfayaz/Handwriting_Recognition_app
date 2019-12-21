import axios from 'axios';

const base = 'http://localhost:3001/api';

export const upload = (body) => {
    return axios.post(`${base}/upload_image`, body);
}

export const getList = () => {
    return axios.get(`${base}/list`);
}
