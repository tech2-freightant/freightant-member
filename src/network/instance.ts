import  axios  from "axios"
// import { baseURL } from "../utils/utils";
const baseURL ="http://localhost:5000/api";

const instance = axios.create({
    baseURL:baseURL, 
    headers: {
        Authorization: ""
     }
});

export default instance;