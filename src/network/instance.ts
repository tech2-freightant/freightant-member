import  axios  from "axios"
// import { baseURL } from "../utils/utils";
const baseURL ="https://verbose-potato-r4x95566vw5cpqw6-5000.app.github.dev/api";

const instance = axios.create({
    baseURL:baseURL, 
    headers: {
        Authorization: ""
     }
});

export default instance;