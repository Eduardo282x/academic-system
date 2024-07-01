import axios from "axios";

const instance = axios.create({
    // baseURL: 'https://k6r6v6f5-3000.use2.devtunnels.ms/'
    baseURL: 'http://localhost:3000/'
})

export default instance;