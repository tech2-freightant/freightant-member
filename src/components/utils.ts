import { Montserrat } from "next/font/google";
import { strings } from "./strings";
import { countryOption } from "./page/rfq/options";

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
  if (locodeObj === null || locodeObj === undefined) {
    return '';
}
  return `${locodeObj?.emoji} ${locodeObj?.Country}${locodeObj?.Location} - ${locodeObj?.Name},${isNumber(locodeObj.Subdivision)?"":`[${locodeObj.Subdivision}],`} ${locodeObj?.countryname}`
} 

export {assetsRootPath, errorMessage, validateMessages, inter, updateArray,CBMCalculate}

export const getPaymentCode = (paymentCode:string)=>{
  let p = (paymentCode?paymentCode:"").split("-")
  if(p.length>0){
    return p[0]
  } else{
    return strings.others
  }
}

export function validateData(data:any[],fieldName:string) {
  const errors:any = [];

  data.forEach((item,index) => {

    if (!item.costHead) {
      errors.push('Missing or invalid costHead in '+fieldName +" at "+index+1);
    }

    if (!item.unit ) {
      errors.push('Missing or invalid unit in '+fieldName +" at "+index+1);
    }

    if (!item.quantity || item.quantity <= 0) {
      errors.push('Missing or invalid quantity in '+fieldName +" at "+index+1);
    }
    if(fieldName !== "Freight"){
      if (!item.currency) {
        errors.push('Missing or invalid currency in '+fieldName +" at "+index+1);
      }
    }

    if (!item.rate || item.rate <= 0) {
      errors.push('Missing or invalid rate in '+fieldName +" at "+index+1);
    }

    if (!item.amount ||  item.amount <= 0) {
      errors.push('Missing or invalid amount in '+fieldName +" at "+index+1);
    }
  });

  return errors;
}

export function processValues(obj:any, status:boolean, value1:any, value2:any, conditionFunc?:any) {
  // Validate using the condition function if provided
  if (typeof conditionFunc === 'function') {
      const isValid = conditionFunc(obj);
      if (!isValid) {
          console.log("Condition validation failed.");
          return;
      }
  }

  // Check the status and return the appropriate value
  const result = status ? value1 : value2;
  return result;
}

export function isNumber(value:string|number):boolean {  
  return Number.isFinite(+value);
}

export function getCountryId(name:string|number):string|number{  
  let lookup = countryOption.filter(country => country.name === name)
  if(lookup.length>0){
    return lookup[0].id
  }else{
    return -1
  }
}
export function camelCaseToSpaceSeparated(input:any):string {
  // Null check
  if (input === null || input === undefined) {
      return '';
  }
  
  // Convert camelCase to space-separated
  return input
      .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space before uppercase letters
      .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2') // Handle acronyms
      .trim(); // Remove any leading or trailing spaces
}

