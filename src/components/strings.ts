const strings ={
    uploadEndPoint: process.env.BACKEND_HOST+"/api/user/upload",
    textPrimary1:"#0A0049",
    textPrimary2: "#6A37F4",
    seaFCL:"Sea-FCL",
    seaLCL:"Sea-LCL",
    air:"Air",
    crossBorderTrucking:"Cross Border Trucking",
    export: "Export",
    import: "Import",
    cif: "CIF",
    cfr: "CFR",
    cpt: "CPT",
    cip: "CIP",
    dap: "DAP",
    dpu: "DPU",
    ddp: "DDP",
    "20ft": "20FT",
    "40ft": "40FT",
    "40fthq": "40FT HQ",
    "45fthq": "45FT HQ",
    "20FTFlatRack": "20FT Flat Rack",
    "20FTOpenTop": "20FT Open Top",
    "20FTPlatform": "20FT Platform",
    "20FTISOTank": "20FT ISO Tank",
    "40FTFlatRack": "40FT Flat Rack",
    "40FTOpenTop": "40FT Open Top",
    "40FTPlatform": "40FT Platform",
    "40FTISOTank": "40FT ISO Tank",
    "20ftReefer": "20FT Reefer",
    "40ft Reefer": "40FT Reefer",
    customsClearnace: "Customs Clearnace",
    cfsHandling: "CFS Handling",
    doorToPortTrucking: "Door To Port Trucking",
    factoryStuffing: "Factory / Door Stuffing",
    portCFSStuffing:"Port / Trminal /Ramp Stuffing",
    defactoryStuffing: "Factory / Door Destuffing",
    deportCFSStuffing:"Port / Trminal /Ramp Destuffing",
    reeferContainers: "REEFER Containers",
    specialContainers: "Special Containers",
    standardContainers: "Standard Containers",
    frozen: "Frozen",
    chilled: "Chilled",
    pharma: "Pharma",
    general: "General",
    hazardous: "Hazardous",
    others: "Other",
    ingauge: "Ingauge",
    outgauge: "Outgauge",
    openBodyTrucks:"Open Body Trucks",
    containerBodyTrucks:"Container Body Trucks",
    trailer:"Trailer",
    totalCargo: "Total Cargo",
    perPackage: "Per Package",
    odc:"ODC",
    EXW: "EXW",
    FOB: "FOB",
    FCA: "FCA",
    FAS: "FAS",
    oceanfreight:"Ocean freight",
    bl:"BL",
    cfsTerminal:"CFS / Terminal",
    custom: "Customs",
    transportations:"Transportations",
    shippingLine:"Shipping Line",
    airFreight:"Air Freight",
    airline:"Airline",
    airport:"Airport",
    trucking:"Trucking",
    portCwc:"Port / CWC",
    govtPass:"Govt Pass",
    accepted:"Accepted",
    decline:"Decline",
    mt:"MT",
    cbm:"CBM",
    awb:"AWB",
    invoice:"Invoice",
    truck:"Truck",



}
const FormRules = {
    mobile:{min:10,max:11,message: 'Invalid Number'},
    pincodes:{min:5,max:8,message: 'Invalid Pincode'},
}
export {strings, FormRules} 