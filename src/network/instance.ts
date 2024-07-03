import  axios  from "axios"
// import { baseURL } from "../utils/utils";
const baseURL ="/";

const instance = axios.create({
    baseURL:baseURL, 
    headers: {
        Authorization: ""
     }
});

export default instance;