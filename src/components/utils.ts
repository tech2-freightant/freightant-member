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

function CBMCalculate(length: number, breadth: number, height: number, dimensionUnit: string): number {
  
  const conversionFactors = {
    MM: 0.001,
    CM: 0.01,
    INCH: 0.0254,
    FT: 0.3048
  };

  // Convert dimensions to meters
  const convertedLength = length * (conversionFactors[dimensionUnit as keyof typeof conversionFactors] || 1);
  const convertedBreadth = breadth * (conversionFactors[dimensionUnit as keyof typeof conversionFactors] || 1);
  const convertedHeight = height * (conversionFactors[dimensionUnit as keyof typeof conversionFactors] || 1);

  // Calculate CBM
  const CBM = convertedLength * convertedBreadth * convertedHeight;

  return CBM;
}

export const locodeFormatedString = (locodeObj:any):string=>{
  return `${locodeObj?.emoji} ${locodeObj?.Country}${locodeObj?.Location} - ${locodeObj?.Name},[${locodeObj?.Subdivision}] ${locodeObj?.countryname}`
} 

export {assetsRootPath, errorMessage, validateMessages, inter, updateArray,CBMCalculate}
