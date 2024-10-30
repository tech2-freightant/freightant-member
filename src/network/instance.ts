import  axios  from "axios"
// import { baseURL } from "../utils/utils";
const baseURL =process.env.BACKEND_HOST;

const instance = axios.create({
    baseURL:baseURL, 
    headers: {
        Authorization: ""
     }
});

export default instance;