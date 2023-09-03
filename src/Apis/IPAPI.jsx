import axios from "axios";

export default axios.create({
    baseURL: `https://api-bdc.net/data/client-ip`
})