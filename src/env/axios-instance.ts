import axios from "axios";

const instance = axios.create({
    // baseURL: 'https://2wzvg2fs-3004.use2.devtunnels.ms/'
    baseURL: 'http://localhost:3004/'
})

export default instance;