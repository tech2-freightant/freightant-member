const strings ={
    uploadEndPoint: "http://localhost:5000/api/user/upload",
}
const FormRules = {
    mobile:{min:10,max:11,message: 'Invalid Number'},
    pincodes:{min:5,max:8,message: 'Invalid Pincode'},
}
export {strings, FormRules} 