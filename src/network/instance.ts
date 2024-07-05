import  axios  from "axios"
// import { baseURL } from "../utils/utils";
const baseURL ="https://silver-doodle-4jq499qq99q4f5g94-5000.app.github.dev/api";

const instance = axios.create({
    baseURL:baseURL, 
    headers: {
        Authorization: ""
     }
});

export default instance;