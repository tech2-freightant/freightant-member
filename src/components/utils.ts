import { Montserrat } from "next/font/google";

const assetsRootPath = "/"
const errorMessage = (name:String,custom:number=0)=> custom? name :`${name} Requires`

const validateMessages = {
    required: "'${name}' is required!",
  };

const inter = Montserrat({
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});
export {assetsRootPath, errorMessage, validateMessages, inter}
