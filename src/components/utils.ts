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

function updateArray(array:Array<string>|undefined, string:string) {
  console.log(array);
  if(array){
    
    const index = array.indexOf(string);
  
    if (index !== -1) {
      array.splice(index, 1);
    } else {
      array.push(string);
    }
  
    return array;
  }
  return []
}


export {assetsRootPath, errorMessage, validateMessages, inter, updateArray}
