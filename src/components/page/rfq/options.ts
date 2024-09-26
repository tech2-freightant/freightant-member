import { strings } from "@/components/strings"
import { Children } from "react"

export const modeOfShipmentOptions =[
    strings.seaFCL,
    strings.seaLCL,
    strings.air,
    strings.crossBorderTrucking,
]

export const incotermOptions = ["CIF", "CFR", "CPT", "CIP", "DAP", "DPU", "DDP"]
export const tradeTypeOptions = [strings.export,strings.import]
export const standardContainersOptions = ['20FT', '40FT', '40FT HQ', '45FT HQ']
export const specialContainersOptions = ['20FT Flat Rack', '20FT Open Top', '20FT Platform', '20FT ISO Tank', '40FT Flat Rack', '40FT Open Top', '40FT Platform', '40FT ISO Tank']
export const reeferContainersOptions = ['20FT Reefer', '40FT Reefer']
export const standardCargoOptions = [strings.general,strings.hazardous]
export const specialCargoOptions = [strings.general]
export const reeferCargoOptions = [strings.frozen,strings.chilled,strings.pharma,strings.general]
export const crossBorderTruckCargoOptions = [strings.general,strings.hazardous,strings.odc]
export const gaugestatusOptions = [strings.ingauge,strings.outgauge]
export const stuffingLocationTypeOptions = [strings.factoryStuffing,strings.portCFSStuffing]
export const destuffingLocationTypeOptions = [strings.factoryStuffing,strings.portCFSStuffing]
export const openBodytrucksOptions = [
  "PICKUP:1 TON",
  "TATA ACE: 800 KGS",
  "TATA 407 : 2.5 TON",
  "LCV 14FT: 3.5 TON",
  "LCV 14FT: 4 TON",
  "LCV 17FT: 5 TON",
  "LCV 19FT: 7 TON",
  "6 WHEELER: 19FT-24FT, 9 TON",
  "10 WHEELER: 22FT, 16 TON",
  "12 WHEELER: 24FT, 25 TON",
  "14 WHEELER: 28FT, 30 TON"
];
export const containerBodyTruckOptions = [
  "19-22FT SINGLE AXLE: 6-TON",
  "24FT SINGLE AXLE: 7-9 TON",
  "24FT MULTI AXLE: 15 TON",
  "32FT SINGLE AXLE: 7 TON",
  "32FT SINGLE AXLE: HQ 7 TON",
  "32FT SINGLE AXLE: 9 TON",
  "32FT SINGLE AXLE: HQ 9 TON",
  "32FT SINGLE AXLE: 10 TON",
  "32FT SINGLE AXLE: HQ 10 TON",
  "32FT MULTI AXLE: HQ 15 TON",
  "32FT MULTI AXLE: 18 TON",
  "32FT MULTI AXLE: HQ 18 TON",
  "32FT TRIPLE AXLE: 23 TON"
];
export const trailerOptions = [
  "40 FT FLATBED TRAILER AXLE: 28-TON",
  "40 FT SEMI-LOW BED TRAILER: 28-TON",
  "40 FT FLATBED TRAILER TRIPLE AXLE: 35 TON",
  "40 FT SEMI-LOW BED TRAILER TRIPLE AXLE: 35 TON",
  "20 FT FLATBED TRAILER: 28-TON",
  "20 FT FLATBED TRAILER AXLE: 28-TON",
  "20 FT FLATBED TRAILER TRIPLE AXLE: 35 TON"
];
export const truckTrailerType = [
  {
    key:1,
    label: strings.openBodyTrucks,
    children:openBodytrucksOptions.map((i:any)=>({label:i,key:i}))
  },
  {
    key:2,
    label: strings.containerBodyTrucks,
    children:containerBodyTruckOptions.map((i:any)=>({label:i,key:i}))
  },
  {
    key:3,
    label: strings.trailer,
    children:trailerOptions.map((i:any)=>({label:i,key:i}))
  },
]
export const ContainersType = {
    [strings.standardContainers]: {
        containers:standardContainersOptions
    },
    [strings.specialContainers]: {
        cargo:[strings.general],
        containers:specialContainersOptions
    },
    [strings.reeferContainers]: {
        containers:reeferContainersOptions
    },
}
export const miscServices = [
    "Surveying",
    "Fumigation",
    "Phyto Sanitary",
    "Certificate of Origin - COO",
    "License Registration",
    "Meis License Reg",
    "Destination Certificate",
    "Quarantine And Disinfection",
    "Landing Certificate",
    "Self Sealing Permission",
    "Port Registration Fee",
    "Stamp Duty Charges",
    "Wildlife Noc",
    strings.others
  ]
export const imoClassOptions = [
  "Class 1 - Explosives",
  "Class 2 - Gases",
  "Class 3 -Flammable Liquids",
  "Class 4 - Flammable Solids or Substances",
  "Class 5- Oxidizing substances by yielding oxygen increase the risk and intensity of fire",
  "Class 6- Toxic substances",
  "Class 7 - Radioactive Substances",
  "Class 8 - Corrosive substances",
  "Class 9 - Miscellaneous dangerous substances and articles",
]

export const cargoCategoryOptions = [
    {
      "label": "Freight all kinds",
      "range": [0,0],
    },
    {
      "label": "Animal & Animal Products",
      "range": [1,5],
      children:[
        {range:1,	label:"Live Animals"},
        {range:2,	label:"Meat and Edible Meat Offal"},
        {range:3,	label:"Fish and Crustaceans, Molluscs and other Aquatic Invertebrates"},
        {range:4,	label:"Birds’ Eggs; Natural Honey; Edible Products of Animal Origin, not elsewhere specified or included"},
        {range:5,	label:"Products of Animal Origin, Not Elsewhere Specified or Included"},
      ]
    },
    {
      "label": "Vegetable Products",
      "range": [6,14],
      children:[
        {range:6,	label:"Live Trees and other Plants; Bulb, Roots and the Like; Cut Flowers and Ornamental Foliage"},
        {range:7,	label:"Vegetable seeds; Edible Vegetables and Certain Roots and Tubers"},
        {range:8,	label:"Edible Fruit and Nuts; Peel of Citrus Fruit or Melons"},
        {range:9,	label:"Coffee, Tea, Mate and Spices"},
        {range:10,	label:"Cereals"},
        {range:11,	label:"Milling Industry; Malt; Starches; Inulin Wheat Gluten"},
        {range:12,	label:"Oil Seeds and Oleaginous Fruits; Miscellaneous Grains, Seeds and Fruit; Industrial or Medicinal Plants; Straw and Fodder"},
        {range:13,	label:"Lac; Gums, Resins and Other Vegetable Saps and Extracts"},
        {range:14,	label:"Vegetable Plaiting Materials; Vegetable Products not Elsewhere Specified or Included"},
      ]
    },
    {
      "label": "Animal and Vegetable Fats and Oils",
      "range": [15,15],
      children:[
        {range:15,label:`Animals or Vegetable Fats and Oils and their Cleavage Products; Prepared Edible Fats; Animal or Vegetable Waxes`}
      ]
    },
    {
      "label": "Foodstuffs, Beverages and Tobacco",
      "range": [16,24],
      children:[
        {range:16, label:`Preparations of Meat, of Fish or of Crustaceans, ollusks or other Aquatic Invertebrates`},
        {range:17, label:`Sugars and Sugar Confectionery`},
        {range:18, label:`Cocoa and Cocoa Preparations`},
        {range:19, label:`Cereals, Flour, Starch or Milk; Pastrycooks’ Products`},
        {range:20, label:`Vegetables, Fruit, Nuts or other Parts of Plants`},
        {range:21, label:`Miscellaneous Edible Preparations`},
        {range:22, label:`Beverages, Spirits and Vinegar`},
        {range:23, label:`Residues and Waste from the Food Industries; Prepared Animal Fodder`},
        {range:24, label:`Tobacco and Manufactures; Tobacco Substitutes`},
      ]
    },
    {
      "label": "Mineral Products",
      "range": [25,27],
      children:[
        {range:25,label:`Salt; Sulphur; Earths and Stone; Plastering Materials, Lime and Cement`},
        {range:26,label:`Ores, Slag and Ash`},
        {range:27,label:`Mineral Fuels, Mineral Oils and Products of their Distillation; Bituminous Substances; Mineral Waxes`},
      ]
    },
    {
      "label": "Chemicals & Allied Industries",
      "range": [28,38],
      children:[
        {range:28,label:`Inorganic Chemicals; Organic or Inorganic Compounds of Precious Metals, of Rare-earth Metals, of Radioactive Elements of Isotopes`},
        {range:29,label:`Organic Chemicals`},
        {range:30,label:`Pharmaceutical Products`},
        {range:31,label:`Fertilisers`},
        {range:32,label:`Dyeing Extracts; Tannins and their Derivatives; Dyes, Pigments and other Colouring Matter; Paints and Varnishes; Putty and other Mastics; inks`},
        {range:33,label:`Essential Oils and Resinoids; Perfumery Cosmetic or Toilet Preparations`},
        {range:34,label:`Soap, Organic Surface- Active Agents, Washing Preparations, Lubricating Preparations, Artificial Waxes, Prepared Waxes, Polishing or Scouring Preparations, Candles and Similar Articles, Modelling Pastes, “Dental Waxes” and Dental Preparatio`},
        {range:35,label:`Albuminoidal Substances; Modified Starches; Glues; Enzymes`},
        {range:36,label:`Explosives; Pyrotechnic Products; Matches; Pyrophoric Alloys; Certain Combustible Preparations`},
        {range:37,label:`Photographic or Cinematographic Goods`},
        {range:38,label:`Miscellaneous Chemical Products`},
      ]
    },
    {
      "label": "Plastics/Rubbers",
      "range": [39,40],
      children:[
        {range:39,label:`Plastics and Articles thereof`},
        {range:40,label:`Rubber and Articles thereof`},
      ]
    },
    {
      "label": "Raw Hides, Skins, Leather, & Furs",
      "range": [41,43],
      children:[
        {range:41,label:`Raw Hides and Skins (Other than Furskins) and Leather`},
        {range:42,label:`Articles of Leather; Saddlery and Harness; Travel Goods, Handbags and similar containers; Articles of Animal Gut (other than Silk-worm Gut)`},
        {range:43,label:`Furskins and Artificial Fur; Manufactures thereof`},
      ]
    },
    {
      "label": "Wood & Wood Products",
      "range": [44,46],
      children:[
        {range:44, label:`Wood and Articles of Wood; Wood Charcoal`},
        {range:45, label:`Cork and Articles of Cork`},
        {range:46, label:`Manufactures of Straw, of Esparto or of other Plaiting Materials; Basketware And Wickerwork`},
      ]
    },
    {
      "label": "Pulp of Wood and Fibrous Material",
      "range": [47,49],
      children:[
        {range:47, label:`Pulp of Wood or of other Fibrous Cellulosic Material; Recovered (Waste and Scrap) Paper or Paperboard`},
        {range:48, label:`Paper and Paperboard; Article of Paper Pulp, of Paper or of Paperboard Currency Paper (Water-mark Bank Note Paper)`},
        {range:49, label:`Printed Books, Newspapers, Pictures and other Products of the Printing Industry; Manuscripts, Typescripts and Plans`},
      ]
    },
    {
      "label": "Textiles",
      "range": [50,63],
      children:[
        {range:50,label:`Silk`},
        {range:51,label:`Wool, Fine or Coarse Animal Hair, Horse Hair Yarn and Woven Fabric`},
        {range:52,label:`Cotton`},
        {range:53,label:`Other Vegetable Textile Fibres; Paper Yarn and Woven Fabrics of Paper Yarn`},
        {range:54,label:`Man-made Filaments`},
        {range:55,label:`Man – made Staple Fibres`},
        {range:56,label:`Wadding, Felt and Nonwovens; Special Yarns; Twine, Cordage, Ropes and Cables and Articles thereof`},
        {range:57,label:`Carpets and Other Textile Floor Coverings`},
        {range:58,label:`Special Woven Fabrics; Tufted Textile Fabrics; Lace; Tapestries; Trimmings; Embroidery`},
        {range:59,label:`Impregnated, Coated, Covered or Laminated Textile Fabrics; Textile Articles of a Kind Suitable for Industrial Use`},
        {range:60,label:`Knitted or Crocheted Fabrics`},
        {range:61,label:`Articles of Apparel and Clothing Accessories, Knitted or Crocheted`},
        {range:62,label:`Articles of Apparel and Clothing Accessories not Knitted or Crocheted`},
        {range:63,label:`Other Made Up Textile Articles; Sets; Worn Clothing And Worn Textile Articles; Rags`},
      ]
    },
    {
      "label": "Footwear/Headgear",
      "range": [64,67],
      children:[
        {range:64,label:`Footwear, Gaiters and the Like; Parts of such Articles`},
        {range:65,label:`Headgear and Parts Thereof`},
        {range:66,label:`Umbrellas, Sun Umbrellas, Walking-sticks, Seat-sticks, Whips, Riding-crops, and Parts Thereof`},
        {range:67,label:`Prepared Feathers and Down and Articles Made of Feathers or of Down; Artificial Flowers; Articles of Human Hair`},
      ]
    },
    {
      "label": "Stone/Glass",
      "range": [68,70],
      children:[
        {range:68,label:`Articles of Stone, Plaster, Cement, Asbestos, Mica or Similar Materials`},
        {range:69,label:`Ceramic Products`},
        {range:70,label:`Glass and Glassware`},
      ]
    },
    {
      "label": "Precious Stone, Metal, Pearls and Coins",
      "range": [71,71],
      children:[
        {range:71,label:`Natural or Cultured Pearls, Precious or Semi-precious Stones, Precious Metals, Metals Clad with Precious Metal, and Articles thereof; Imitation Jewellery; Coin`}
      ]
    },
    {
      "label": "Base Metals",
      "range": [72,83],
      children:[
        {range:72, label:`Iron and Steel`},
        {range:73, label:`Articles of Iron or Steel`},
        {range:74, label:`Copper and Articles thereof`},
        {range:75, label:`Nickel and articles thereof`},
        {range:76, label:`Aluminium and articles thereof`},
        {range:77, label:`Reserved for Possible Future use in Harmonised System`},
        {range:78, label:`Lead and Articles thereof`},
        {range:79, label:`Zinc and Articles thereof`},
        {range:80, label:`Tin and Articles Thereof`},
        {range:81, label:`Other Base Metals; Cermets Articles thereof`},
        {range:82, label:`Tools, Implements, Cutlery, Spoons and Forks, of Base Metal; Parts Thereof Base Metal`},
        {range:83, label:`Miscellaneous Articles of Base Metal`},
      ]
    },
    {
      "label": "Machinery/Electrical",
      "range": [84,85],
      children:[
        {range:84, label:`Nuclear Reactors, Boilers, Machinery and Mechanical Appliances; Parts thereof`},
        {range:85, label:`Electrical Machinery and Equipment and Parts Thereof; Sound Recorders and Reproducers, Television Image and Sound Recorders and Reproducers, and Parts and Accessories of Such Articles`},
      ]
    },
    {
      "label": "Vehicles",
      "range": [86,89],
      children:[
        {range:86,label:`Railway or tramway locomotives, rolling-stock and parts thereof; rail-way or tramway track fixtures and fittings and parts thereof; mechanical (including electro-mechanical) traffic ignaling equipment of all kinds`},
        {range:87,label:`Vehicles other than Railway or Tramway Rolling-stock, and Parts and Accessories thereof`},
        {range:88,label:`For Aircraft, Spacecraft and Parts thereof`},
        {range:89,label:`Ships, Boats and Floating Structures`},
      ]
    },
    {
      "label": "Precision Instruments",
      "range": [90,92],
      children:[
        {range:90, label:`Optical, photographic, cinematographic, measuring, checking, precision, medical or surgical instruments and apparatus; parts and accessories thereof`},
        {range:91, label:`Clocks and Watches and parts thereof`},
        {range:92, label:`Musical Instruments Parts and Accessories of such articles`},
      ]
    },
    {
      "label": "Arms and Ammunition",
      "range": [93,93],
      children:[
        {range:93,label:`For Arms and Ammunition; Parts and Accessories thereof`}
      ]
    },
    {
      "label": "Miscellaneous Manufactured Articles",
      "range": [94,96],
      children:[
        {range:94, label:`Furniture; Bedding, Mattresses, Mattress Supports, Cushions and similar stuffed furnishings; Lamps and Lighting Fittings, not elsewhere specified or included; Illuminated signs, Illuminated name-plates and the like; Prefabricated Building`},
        {range:95, label:`Toys, Games and Sports Requisites; Parts and Accessories thereof`},
        {range:96, label:`Miscellaneous Manufactured Articles`},
      ]
    },
    {
      "label": "Works of Art",
      "range": [97,97],
      children:[
        {range:97,label:`Works of Art, Collectors’ Pieces and Antiques`}
      ]
    },
    {
      "label": "Unique US National HS Codes",
      "range": [98,99],
      children:[
        {range:98,	label:`Project Imports; Laboratory Chemicals; Passengers’ Baggage; Personal Importations by Air or Post; Ship Stores`}
      ]
    }
  ]
export const packageTypeOptions = [strings.totalCargo, strings.perPackage]

export const DimsOptions = ["MM","CM","METER","INCH","FT"]
export const WeightOptions = ["KG","TON"]

export const paymentTermOptions = [
  {title:`Against BL`,days:`BL release against full payment`},
  {title:`Upon Receipt`,days:`Payment  due Immediately Upon Delivery of Invoice`},
  {title:`Prepaid`,days:`Payment in Advance with work order`},
  {title:`Net   7`,days:`Payment within 7 days of the invoice date`},
  {title:`Net   14`,days:`Payment within 14 days of the invoice date`},
  {title:`Net   30`,days:`Payment within 30 days of the invoice date`},
  {title:`Net   45`,days:`Payment within 45 days of the invoice date`},
  {title:`Net   60`,days:`Payment within 60 days of the invoice date`},
  {title:strings.others	,days:`Other`},
]

export const importIncotermOptions = ["EXW","FOB","FCA","FAS"]

export const uomSeaFcl = [
  { key: 'BL', label: 'BL', value: "BL" },
  { key: '20FT', label: '20 Feet', value: strings["20ft"] },
  { key: '40FT', label: '40 Feet', value: strings["40ft"] },
]

export const unitsOption =(modeOfShipment:string)=>{
  switch (modeOfShipment) {
    case strings.seaFCL:
        return uomSeaFcl
      break;
    case strings.seaLCL:
        return uomSeaFcl
      break;
    default:
        return [
          {label:strings.mt,value:strings.mt},
          {label:strings.cbm,value:strings.cbm},
          {label:strings.awb,value:strings.awb},
          {label:strings.invoice,value:strings.invoice},
          {label:strings.truck,value:strings.truck},
        ]
      break;
  }
}

export const polOptions = (mode:string)=>{
  switch (mode) {
    case strings.air:
        return [
          {label: strings.airline, value: strings.airline},
          {label: strings.airport, value: strings.airport},
          {label: strings.custom, value: strings.custom},
          {label: strings.transportations, value: strings.transportations},
        ]
      break;
    case strings.seaFCL:
        return [
          {label: strings.shippingLine, value: strings.shippingLine},
          {label: strings.cfsTerminal, value: strings.cfsTerminal},
          {label: strings.custom, value: strings.custom},
          {label: strings.transportations, value: strings.transportations},
        ]
      break;
    case strings.seaLCL:
        return [
          {label: strings.shippingLine, value: strings.shippingLine},
          {label: strings.cfsTerminal, value: strings.cfsTerminal},
          {label: strings.custom, value: strings.custom},
          {label: strings.transportations, value: strings.transportations},
        ]
      break;
    case strings.crossBorderTrucking:
        return [
          {label: strings.portCwc, value: strings.portCwc},
          {label: strings.custom, value: strings.custom},
          {label: strings.govtPass, value: strings.govtPass},
        ]
      break;
  
    default:
      return []
      break;
  }
}

export const freightCostHead = (mode:string)=>{
  switch (mode) {
    case strings.seaLCL:
      return [
        {label:"BOF - Basic Ocean Freight", value:"BOF - Basic Ocean Freight"},
        {label:"AOF - All inclusive Ocean Freight", value:"AOF - All inclusive Ocean Freight"},
        {label:"OWS - Overweight Surcharge", value:"OWS - Overweight Surcharge"},
        {label:"MFR - Marine Fuel Recovery", value:"MFR - Marine Fuel Recovery"},
        {label:"LSS - Low Sulphur Surcharge", value:"LSS - Low Sulphur Surcharge"},
        {label:"WRS - War Risk Surcharge", value:"WRS - War Risk Surcharge"},
        {label:"ERS - Emergency Risk Surcharge", value:"ERS - Emergency Risk Surcharge"},
        {label:"EBS - Emergency Bunker Surcharge", value:"EBS - Emergency Bunker Surcharge"},
        {label:"GRI - General Rate Increase", value:"GRI - General Rate Increase"},
        {label:"ISPS - International Ship And Port Facility Security", value:"ISPS - International Ship And Port Facility Security"},
        {label:"PSS - Peak Season Surcharge", value:"PSS - Peak Season Surcharge"},
        {label:"BAF - Bunker Adjustment Factor ", value:"BAF - Bunker Adjustment Factor "},
        {label:"CAF - Currency Adjustment Factor ", value:"CAF - Currency Adjustment Factor "},
        {label:"PRS - Piracy Risk Surcharge ", value:"PRS - Piracy Risk Surcharge "},
        {label:"EU - Emissions Trading System", value:"EU - Emissions Trading System"},
        {label:"EIS - Equipment Imbalance Surcharge ", value:"EIS - Equipment Imbalance Surcharge "},
        {label:"PCC - Panama Canal Surcharge ", value:"PCC - Panama Canal Surcharge "},
        {label:"WSC - Winter Surcharge  ", value:"WSC - Winter Surcharge  "},
        {label:"HAZ - Hazardous Surcharge", value:"HAZ - Hazardous Surcharge"},
        {label:"DGS - Dangerous goods surcharge", value:"DGS - Dangerous goods surcharge"},
        {label:"SCS - Suez Canal Surcharge", value:"SCS - Suez Canal Surcharge"},
        {label:"SES - Special Equipment Surcharge", value:"SES - Special Equipment Surcharge"},
        {label:"AGS - Aden Gulf Surcharge", value:"AGS - Aden Gulf Surcharge"},
        {label:"CAF - Currency Adjustment Factor ", value:"CAF - Currency Adjustment Factor "},
        {label:"HEA - Heavy lift surcharge", value:"HEA - Heavy lift surcharge"},
        {label:"REF - Reefer surcharge", value:"REF - Reefer surcharge"},
        {label:"ENS - Entry Summary Declaration", value:"ENS - Entry Summary Declaration",}
        ]
        break;
        case strings.seaFCL:
          return [
            {label:"BOF - Basic Ocean Freight", value:"BOF - Basic Ocean Freight"},
            {label:"AOF - All inclusive Ocean Freight", value:"AOF - All inclusive Ocean Freight"},
            {label:"OWS - Overweight Surcharge", value:"OWS - Overweight Surcharge"},
            {label:"MFR - Marine Fuel Recovery", value:"MFR - Marine Fuel Recovery"},
            {label:"LSS - Low Sulphur Surcharge", value:"LSS - Low Sulphur Surcharge"},
            {label:"WRS - War Risk Surcharge", value:"WRS - War Risk Surcharge"},
            {label:"ERS - Emergency Risk Surcharge", value:"ERS - Emergency Risk Surcharge"},
            {label:"EBS - Emergency Bunker Surcharge", value:"EBS - Emergency Bunker Surcharge"},
            {label:"GRI - General Rate Increase", value:"GRI - General Rate Increase"},
            {label:"ISPS - International Ship And Port Facility Security", value:"ISPS - International Ship And Port Facility Security"},
            {label:"PSS - Peak Season Surcharge", value:"PSS - Peak Season Surcharge"},
            {label:"BAF - Bunker Adjustment Factor ", value:"BAF - Bunker Adjustment Factor "},
            {label:"CAF - Currency Adjustment Factor ", value:"CAF - Currency Adjustment Factor "},
            {label:"PRS - Piracy Risk Surcharge ", value:"PRS - Piracy Risk Surcharge "},
            {label:"EU - Emissions Trading System", value:"EU - Emissions Trading System"},
            {label:"EIS - Equipment Imbalance Surcharge ", value:"EIS - Equipment Imbalance Surcharge "},
            {label:"PCC - Panama Canal Surcharge ", value:"PCC - Panama Canal Surcharge "},
            {label:"WSC - Winter Surcharge  ", value:"WSC - Winter Surcharge  "},
            {label:"HAZ - Hazardous Surcharge", value:"HAZ - Hazardous Surcharge"},
            {label:"DGS - Dangerous goods surcharge", value:"DGS - Dangerous goods surcharge"},
            {label:"SCS - Suez Canal Surcharge", value:"SCS - Suez Canal Surcharge"},
            {label:"SES - Special Equipment Surcharge", value:"SES - Special Equipment Surcharge"},
            {label:"AGS - Aden Gulf Surcharge", value:"AGS - Aden Gulf Surcharge"},
            {label:"CAF - Currency Adjustment Factor ", value:"CAF - Currency Adjustment Factor "},
            {label:"HEA - Heavy lift surcharge", value:"HEA - Heavy lift surcharge"},
            {label:"REF - Reefer surcharge", value:"REF - Reefer surcharge"},
            {label:"ENS - Entry Summary Declaration", value:"ENS - Entry Summary Declaration",}
            ]
        break;
      case strings.air:
       return [
        { "value": "1st0.5", "label": "First 0.5Kg Surcharge" },
        { "value": "AAA ", "label": "Misc Charge " },
        { "value": "AAC ", "label": "AAC" },
        { "value": "ADC ", "label": "ADC" },
        { "value": "ADF ", "label": "Airline Documentation Fees" },
        { "value": "ADO ", "label": "Airline Delivery Order Chargs" },
        { "value": "AF ", "label": "Agency Fees" },
        { "value": "AIL ", "label": "Airport Insurance levy" },
        { "value": "ALCOM ", "label": "Commission" },
        { "value": "ARDG ", "label": "Airline DG charges." },
        { "value": "BAG ", "label": "CFL (LHR)" },
        { "value": "BBF ", "label": "Break Bulk Fee" },
        { "value": "BHC ", "label": "Battery Handling Charges" },
        { "value": "BSC ", "label": "BL Surrender Charges" },
        { "value": "CC ", "label": "Courier Charge" },
        { "value": "CDD ", "label": "Cargo Data Declaration" },
        { "value": "CGC ", "label": "Customs Surcharge" },
        { "value": "CI ", "label": "Custom Inspection" },
        { "value": "CLRBAG", "label": "Clearance Bag Charges per MHAWB" },
        { "value": "CO ", "label": "Customs Overtime" },
        { "value": "COLOAD", "label": "COLOAD" },
        { "value": "CSC ", "label": "Currency Surcharge" },
        { "value": "CTG ", "label": "Cartage" },
        { "value": "DC ", "label": "Deferment Charge" },
        { "value": "DCR ", "label": "Due Carrier" },
        { "value": "DDPS ", "label": "Duty Delivery paid surcharge" },
        { "value": "DEL ", "label": "Delivery Charge" },
        { "value": "DHand ", "label": "Destination handling charge" },
        { "value": "DO ", "label": "Delivery Order Charges" },
        { "value": "DS ", "label": "Demand Surcharge" },
        { "value": "DUTY ", "label": "DUTY & TAX" },
        { "value": "ECC ", "label": "Express Courier Charges" },
        { "value": "EDI ", "label": "EDI" },
        { "value": "EDT ", "label": "Electronic Data Transfer Fee" },
        { "value": "EHS ", "label": "EHS" },
        { "value": "ESS ", "label": "Emergency Situation Surcharge" },
        { "value": "EUST ", "label": "EUST" },
        { "value": "FC ", "label": "Freight Collect charges" },
        { "value": "FCD ", "label": "Formal Customs Declaration" },
        { "value": "FSCW ", "label": "Fuel Surcharge Waived" },
        { "value": "Gate ", "label": "Gate Charge" },
        { "value": "HACIS ", "label": "HACIS" },
        { "value": "HAWBFE", "label": "HAWB FEE" },
        { "value": "HNDCRY", "label": "Hand Carry" },
        { "value": "IEF ", "label": "進口報關手續費" },
        { "value": "IMPVAT", "label": "Import VAT" },
        { "value": "IRC ", "label": "Insurance Risk Charge" },
        { "value": "LABEL ", "label": "Label Charges" },
        { "value": "LEF ", "label": "Linex Execution Fee" },
        { "value": "LSF ", "label": "Linex Service Fee" },
        { "value": "MISC ", "label": "Misc. Charges" },
        { "value": "OOA ", "label": "Out of Area" },
        { "value": "OOH ", "label": "Out of Hours" },
        { "value": "pack ", "label": "Packing" },
        { "value": "PFLC ", "label": "Parafiscal Charge" },
        { "value": "PRC ", "label": "Packing/ Repacking Charges" },
        { "value": "PRF ", "label": "Paperless Register Fee" },
        { "value": "RCR ", "label": "RCAR Charges" },
        { "value": "RDF ", "label": "報單費" },
        { "value": "REMOTE", "label": "REMOTE AREA" },
        { "value": "RHC ", "label": "假日收費" },
        { "value": "RPX ", "label": "RPX" },
        { "value": "SCD ", "label": "Simplified Customs Declaration" },
        { "value": "SFC ", "label": "Stuffing Charges" },
        { "value": "SPC ", "label": "Special Pick Up Charge" },
        { "value": "SSCL ", "label": "Social Security Contribution Levy" },
        { "value": "SZX ", "label": "SZX Pick up charges" },
        { "value": "SZX-GP", "label": "SZX Pick up charges - Guangdong Province" },
        { "value": "TOLL ", "label": "Toll Charges" },
        { "value": "TS ", "label": "Transhipment" },
        { "value": "UPICK ", "label": "Urgent Pick up" },
        { "value": "VAT-99", "label": "Reserved Code Do not use" },
        { "value": "VOR ", "label": "Vorlageprovision 3%" },
        { "value": "WRS ", "label": "War Risk Surcharge" },
        { "value": "XRAY ", "label": "X-RAY CHARGES" }
      ]
        break
    default:
      return[]
      break;
  }
}
export const freightTitle = (mode:string)=>{
  switch (mode) {
      case strings.air:
        return "Air Freight Charges"
      case strings.seaFCL:
        return "Ocean Freight Charges"
      case strings.seaLCL:
        return "Ocean Freight Charges"
      case strings.crossBorderTrucking:
        return "Trucking Charges"      
    default:
      break;
  }
}


export const polChargeOptions = (category:string)=>{
  switch (category) {
    case strings.shippingLine:
      return[
        {label:`BL fees - Bill of Lading`,value:`BL fees - Bill of Lading`},
        {label:`THC - Terminal Handling Charge `,value:`THC - Terminal Handling Charge `},
        {label:`VGM - Verified Gross Mass`,value:`VGM - Verified Gross Mass`},
        {label:`IHC - Inland Haulage`,value:`IHC - Inland Haulage`},
        {label:`MUC - Mandatory User Charges`,value:`MUC - Mandatory User Charges`},
        {label:`ISPS - International Ship And Port Facility Security Code`,value:`ISPS - International Ship And Port Facility Security Code`},
        {label:`Seal Charges`,value:`Seal Charges`},
        {label:`Agent Handling Fees `,value:`Agent Handling Fees `},
        {label:`Origin Detention Fee`,value:`Origin Detention Fee`},
        {label:`Destination Detention fee`,value:`Destination Detention fee`},
        {label:`Origin Demurrage Charges`,value:`Origin Demurrage Charges`},
        {label:`Destination Demurrage Charges`,value:`Destination Demurrage Charges`},
        {label:`Marine Fuel Recovery`,value:`Marine Fuel Recovery`},
        {label:`Entry Summary Declaration`,value:`Entry Summary Declaration`},
        {label:`Landing Certificate Charges`,value:`Landing Certificate Charges`},
        {label:`Courier Charges`,value:`Courier Charges`},
        {label:`Re Seal Charges`,value:`Re Seal Charges`},
        {label:`VGM registration`,value:`VGM registration`},
        {label:`No Show Charges`,value:`No Show Charges`},
        {label:`Damage Container`,value:`Damage Container`},
        {label:`Export Detention Fee`,value:`Export Detention Fee`},
        {label:`Seaway Bill`,value:`Seaway Bill`},
        {label:`Weighbridge Fee`,value:`Weighbridge Fee`},
        {label:`Carrier Lift on Lift off prepaid`,value:`Carrier Lift on Lift off prepaid`},
        {label:`Lashing & Choking Charges`,value:`Lashing & Choking Charges`},
        {label:`Handling Fee`,value:`Handling Fee`},
        {label:`Repositioning Cost`,value:`Repositioning Cost`},
        {label:`Destination Certificate Charge`,value:`Destination Certificate Charge`},
        {label:`Temperature Variation Charge`,value:`Temperature Variation Charge`},
        {label:`BL Amendment Fee`,value:`BL Amendment Fee`},
        {label:`Feeder Documentation Charges`,value:`Feeder Documentation Charges`},
        {label:`House BL`,value:`House BL`},
        {label:`Origin Certificate Charge`,value:`Origin Certificate Charge`},
        {label:`BL Surrender Charges`,value:`BL Surrender Charges`},
        {label:`Container Inspection Fees`,value:`Container Inspection Fees`},
        {label:`Container Monitoring Charges`,value:`Container Monitoring Charges`},
        {label:`Vessel Age Certificate charges`,value:`Vessel Age Certificate charges`},
        {label:`Shipping Certificate`,value:`Shipping Certificate`},
        {label:`Shipped On Board Certificate charge`,value:`Shipped On Board Certificate charge`},
        {label:`Special Service Request`,value:`Special Service Request`},
        {label:`Port Storage Charges`,value:`Port Storage Charges`},
        {label:`Import Detention fee`,value:`Import Detention fee`},
        {label:`SI Filing`,value:`SI Filing`},
        {label:`Switch Bl Charges`,value:`Switch Bl Charges`},
        {label:`Pick Up`,value:`Pick Up`},
        {label:`Recovery for Handling - Export`,value:`Recovery for Handling - Export`},
        {label:`Booking Fee`,value:`Booking Fee`},
        {label:`Equipment Interchange Receipt`,value:`Equipment Interchange Receipt`},
        {label:`Empty Container Sterilization Fee`,value:`Empty Container Sterilization Fee`},
        {label:`Container Reposition Charges`,value:`Container Reposition Charges`},
        {label:`Export Survey Fee`,value:`Export Survey Fee`},
        {label:`Via Charges`,value:`Via Charges`},
        {label:`Examination Delivery Order Fee`,value:`Examination Delivery Order Fee`},
        {label:`Pre Carriage`,value:`Pre Carriage`},
        {label:`Export Storage`,value:`Export Storage`},
        {label:`Shutout Charges`,value:`Shutout Charges`},
        {label:`Container Tracking Charges`,value:`Container Tracking Charges`},
        {label:`Inter Terminal Transfer Charges`,value:`Inter Terminal Transfer Charges`},
        {label:`Noc Charges`,value:`Noc Charges`},
        {label:`GPS Tracking`,value:`GPS Tracking`},
        {label:`Container Release Order Fee`,value:`Container Release Order Fee`},
        {label:`Empty Container Discharge`,value:`Empty Container Discharge`},
        {label:`Insurance`,value:`Insurance`},
        {label:`Offloading Charges`,value:`Offloading Charges`},
        {label:`Additional Seal Charge`,value:`Additional Seal Charge`},
        {label:`Shifting Charge`,value:`Shifting Charge`},
        {label:`Ground Rent`,value:`Ground Rent`},
        {label:`Cargo Facility Charge`,value:`Cargo Facility Charge`},
        {label:`Export Demurrage Charges`,value:`Export Demurrage Charges`},
        {label:`Origin Courier Charges`,value:`Origin Courier Charges`},
        {label:`Vessel Certificate fee`,value:`Vessel Certificate fee`},
        {label:`Port and Harbor dues`,value:`Port and Harbor dues`},
        {label:`Free Days Certificate Fee`,value:`Free Days Certificate Fee`},
        {label:`BL reissue Fee`,value:`BL reissue Fee`},
        {label:`Spot Booking Cancellation Fees`,value:`Spot Booking Cancellation Fees`},
        {label:`Liner Charges`,value:`Liner Charges`},
        {label:`Commission Fee`,value:`Commission Fee`},
        {label:`Outstation Charges`,value:`Outstation Charges`},
        {label:`Roll Over Charges`,value:`Roll Over Charges`},
        {label:`Origin Documentation Fee`,value:`Origin Documentation Fee`},
        {label:`Agent Handling Fees  `,value:`Agent Handling Fees  `},
        {label:`Destination Documentation Fee`,value:`Destination Documentation Fee`},
        {label:`Plugin Charges`,value:`Plugin Charges`},
      ]
      break;
    
    case strings.cfsTerminal || strings.custom:
      return[
        {label:`Surveying Charge`,value:`Surveying Charge`},
        {label:`Fumigation`,value:`Fumigation`},
        {label:`Transportation charges`,value:`Transportation charges`},
        {label:`Wildlife Noc Charges`,value:`Wildlife Noc Charges`},
        {label:`COO - Certification of Origin Charges`,value:`COO - Certification of Origin Charges`},
        {label:`Forklift Charges`,value:`Forklift Charges`},
        {label:`Pickup Charges`,value:`Pickup Charges`},
        {label:`AD Code Registration`,value:`AD Code Registration`},
        {label:`Label & Marking`,value:`Label & Marking`},
        {label:`Loading/Unloading charges`,value:`Loading/Unloading charges`},
        {label:`Examination charge`,value:`Examination charge`},
        {label:`Licence Registration`,value:`Licence Registration`},
        {label:`Weighment Charge`,value:`Weighment Charge`},
        {label:`Customs Clearance Origin`,value:`Customs Clearance Origin`},
        {label:`Agency Comission`,value:`Agency Comission`},
        {label:`Documentation Charges`,value:`Documentation Charges`},
        {label:`Customs Clearance Destination`,value:`Customs Clearance Destination`},
        {label:`Amendment charges`,value:`Amendment charges`},
        {label:`Insurance Premium Charges`,value:`Insurance Premium Charges`},
        {label:`Custom Fine & Penalty`,value:`Custom Fine & Penalty`},
        {label:`License de-registration fee`,value:`License de-registration fee`},
        {label:`License registration fee`,value:`License registration fee`},
        {label:`Stuffing/Destuffing Charge`,value:`Stuffing/Destuffing Charge`},
        {label:`Open Examination`,value:`Open Examination`},
        {label:`Examination Fees`,value:`Examination Fees`},
        {label:`Carting Charges`,value:`Carting Charges`},
        {label:`Lashing & Choking Charges`,value:`Lashing & Choking Charges`},
        {label:`Wrapping & Strapping Charges`,value:`Wrapping & Strapping Charges`},
        {label:`Origin Certificate Charge`,value:`Origin Certificate Charge`},
        {label:`Weighing Charges`,value:`Weighing Charges`},
        {label:`MEIS Licence Registration`,value:`MEIS Licence Registration`},
        {label:`Lab Report Charges`,value:`Lab Report Charges`},
        {label:`ICEGATE Charges`,value:`ICEGATE Charges`},
        {label:`On Wheel Charges`,value:`On Wheel Charges`},
        {label:`Destination Certificate Charge`,value:`Destination Certificate Charge`},
        {label:`Quarantine And Disinfection Fee`,value:`Quarantine And Disinfection Fee`},
        {label:`Palletization`,value:`Palletization`},
        {label:`Paper Lining Charge`,value:`Paper Lining Charge`},
        {label:`Warai Charge`,value:`Warai Charge`},
        {label:`Cargo unloading charges`,value:`Cargo unloading charges`},
        {label:`Phyto Sanitary Certificate`,value:`Phyto Sanitary Certificate`},
        {label:`Repacking Charges`,value:`Repacking Charges`},
        {label:`Landing Certificate`,value:`Landing Certificate`},
        {label:`Self Sealing Permission Charges`,value:`Self Sealing Permission Charges`},
        {label:`VGM Charges`,value:`VGM Charges`},
        {label:`Buffer Movement Charges`,value:`Buffer Movement Charges`},
        {label:`Shipping Bill Cancellation Fee`,value:`Shipping Bill Cancellation Fee`},
        {label:`Back To Town`,value:`Back To Town`},
        {label:`S/BILL Amendment Charges`,value:`S/BILL Amendment Charges`},
        {label:`Ground Rent`,value:`Ground Rent`},
        {label:`Warehouse Charges`,value:`Warehouse Charges`},
        {label:`Port Registration Fee`,value:`Port Registration Fee`},
        {label:`Stamp Duty Charges`,value:`Stamp Duty Charges`},
        {label:`CFS Lift On/Off Charges`,value:`CFS Lift On/Off Charges`},
      ]
    default:
      return [];
      break;
  }
}

export const shippingLinesOptiopns = [
{label:`Mediterranean Shipping Company	`,value:`MSC`},
{label:`Maersk Line	`,value:`Maersk`},
{label:`CMA CGM	`,value:`CMA CGM`},
{label:`COSCO Container Lines	`,value:`COSCON`},
{label:`Hapag Lloyd Container Line	`,value:`Hapag`},
{label:`Evergreen Line	`,value:`Evergreen`},
{label:`Ocean Network Express	`,value:`ONE`},
{label:`Hyundai Merchant Marine Co., Ltd.	`,value:`HMM`},
{label:`Orient Overseas Container Line Ltd.	`,value:`OOCL`},
{label:`Yang Ming Marine Transport Corp.	`,value:`YML`},
{label:`ZIM Israel Navigation Astramaris	`,value:`ZIM`},
{label:`Wan Hai Lines	`,value:`WHL`},
{label:`Pacific International Lines	`,value:`PIL`},
{label:`SITC Container Lines Co., LTD	`,value:`SITC`},
{label:`Korea Marine Transport Co., Ltd.	`,value:`KMTC`},
{label:`Islamic Republic of Iran Shipping Lines	`,value:`IRISL  `},
{label:`Unifeeder	`,value:`Unifeeder`},
{label:`X-Press Container Line	`,value:`XCL`},
{label:`TS Lines	`,value:`TSL`},
{label:`SM Line Corporation	`,value:`SML`},
{label:`China United Lines	CU `,value:`Lines`},
{label:`Perma Shipping Line	`,value:`Perma`},
{label:`Sinokor Merchant Marine Co.,Ltd	`,value:`Sinokor`},
{label:`Regional Container Lines	`,value:`RCL`},
{label:`Matson Navigation Company Inc	`,value:`MATS`},
{label:`Swire Shipping	`,value:`Swire`},
{label:`Emirates Shipping Line	`,value:`Emirates`},
{label:`Arkas Container Transport S.A.	`,value:`Arkas`},
{label:`Sinotrans Container Lines Co.,Ltd	`,value:`Sinotrans`},
{label:`American President Lines	`,value:`APL`},
{label:`Aliança Navegação e Logística	`,value:`Alianca`},
{label:`Australia National Line	`,value:`ANL`},
{label:`BLPL Singapore	`,value:`BLPL`},
{label:`Interasia Lines	`,value:`Interasia`},
{label:`Samudera Shipping Line Ltd	`,value:`Samudera		`},
{label:`Admiral Container Lines	`,value:`Admiral`},
{label:`Advance Container Lines	`,value:`AC Lines`},
{label:`Africa Express Line	`,value:`AEL`},
{label:`Alaska Marine Lines	`,value:`AML`},
{label:`Allalouf Shipping	`,value:`Allalouf`},
{label:`Antillean Marine Shipping `,value:`Corporation Antillean Marine`},
{label:`Asiatic Shipping Services	`,value:`AsiaTic`},
{label:`Atlantic Caribbean Line	`,value:`AC Line`},
{label:`Atlantic Container Line	`,value:`ACL`},
{label:`Atlantic Ro-Ro Carriers Inc	`,value:`Atlantic Ro Ro`},
{label:`Avana Global FZCO	`,value:`BALAJI`},
{label:`Avana Logistek	`,value:`Avana`},
{label:`Balaji Shipping Lines FZCO	`,value:`Balaji`},
{label:`Beacon Intermodal	`,value:`Beacon`},
{label:`Bengal Tiger Line	`,value:`BTL`},
{label:`Bermuda Container Line	`,value:`BCL`},
{label:`Bermuda International Shipping Ltd	`,value:`BISL`},
{label:`BG Freight Line	`,value:`BG Freight`},
{label:`Bien Dong Shipping Company	`,value:`Bien Dong`},
{label:`Blue Anchor America Line	`,value:`BAAL`},
{label:`Blue Water Lines	`,value:`BWL`},
{label:`Blue World Line	BW `,value:`Line`},
{label:`BMC Line Shipping LLC	BMC `,value:`Line`},
{label:`Borchard Lines Ltd	`,value:`Borchard`},
{label:`Brointermed Lines Limited	`,value:`BT`},
{label:`Navigation Maritime Bulgare	`,value:`Bulcon`},
{label:`Seereederei Baco-Liner GmbH	`,value:`Baco Liner`},
{label:`Cahaya Samudera Shipping Pte Ltd	`,value:`CSS`},
{label:`Care Lines	`,value:`Care Lines`},
{label:`Central Gulf Lines, Inc	`,value:`CGL`},
{label:`Ceylon Shipping Corporation Limited	`,value:`CSC`},
{label:`Cheng Lie Navigation Co.,Ltd	`,value:`CNC`},
{label:`China Navigation Company	`,value:`Swire Shipping`},
{label:`China Shipping Container Lines Co	`,value:`CSCL`},
{label:`Chinese-Polish Joint Stock Shipping Company	`,value:`CHIPOLBROK`},
{label:`Cido Car Carrier Services	`,value:`CCCS`},
{label:`CK Line	CK `,value:`Line`},
{label:`Columbia Coastal Transport, LLC	`,value:`CCT`},
{label:`Compagnia Chilena de Navigacion Interoceanica SA	`,value:`CCNI`},
{label:`Compania Sud Americana de Vapores	`,value:`CSAV`},
{label:`Container H Lines	`,value:`CHL`},
{label:`Containerships	`,value:`Containerships`},
{label:`Conti-Lines	`,value:`Conti Lines`},
{label:`Crowley Maritime	`,value:`Crowley`},
{label:`CSAL Canada States Africa Line	`,value:`CSAL`},
{label:`CSAV Norasia	`,value:`CSAV`},
{label:`Daylight Transport LLC	`,value:`Daylight`},
{label:`Delmas	`,value:`Delmas`},
{label:`Delphis	`,value:`Delphis`},
{label:`Delta Shipping Lines	`,value:`Delta`},
{label:`Deutsche Afrika-Linien	`,value:`DAL`},
{label:`Dole Ocean Cargo	`,value:`Dole`},
{label:`Dong Young Shipping	`,value:`Dong oung`},
{label:`Dongjin Shipping	`,value:`Dongjin`},
{label:`Econ Shipping	`,value:`Econship`},
{label:`ECU Worldwide	`,value:`ECU`},
{label:`Ecuadorian Line	`,value:`Ecuadorian Line`},
{label:`Egyptian Navigation Co.	`,value:`ENC`},
{label:`Eimskip	`,value:`Eimskip`},
{label:`Emkay Line	`,value:`Emkay`},
{label:`Eucon	`,value:`Eucon`},
{label:`Eukor	`,value:`Eukor`},
{label:`Euro Container Line	`,value:`ECL`},
{label:`Euro Marine Logistics	`,value:`EML`},
{label:`EuroAfrica Shipping Lines co. Ltd.	`,value:`ESL`},
{label:`Far Eastern Shipping Company	`,value:`FESCO`},
{label:`Fednav	`,value:`Fednav`},
{label:`Feederlink Shipping & Trading B.V.	`,value:`Feederlink`},
{label:`Finnlines	`,value:`Finnlines`},
{label:`Flexi-Van Leasing	`,value:`Flexi Van`},
{label:`FLORENS CONTAINER SERVICES	`,value:`Florens`},
{label:`Focus Trucking	`,value:`FOCUS`},
{label:`Frontier Liner Services	`,value:`FLS`},
{label:`G&G Shipping	`,value:`G G`},
{label:`Galborg	`,value:`Galborg`},
{label:`Geest Line	`,value:`Geest Line`},
{label:`General National Maritime Transport Company	`,value:`GNMTC`},
{label:`Global Container International	`,value:`Global`},
{label:`Gold Star Line Ltd.	`,value:`GSL`},
{label:`Gothong Southern Shipping Lines Incorporated	`,value:`Gothong Southern`},
{label:`Great White Fleet	`,value:`GWF`},
{label:`Greater Bali Hai	`,value:`GBH`},
{label:`Grieg Star Shipping	`,value:`Grieg Star`},
{label:`Grimaldi Deep Sea S.P.A.	`,value:`Grimaldi`},
{label:`Grimaldi Lines	`,value:`Grimaldi Lines`},
{label:`Hafez Darya Arya Shipping Company	`,value:`HDSCO Line`},
{label:`Hamburg Südamerikanische Dampfschifffahrts-Gesellschaft A / S & Co. KG	`,value:`Hamburg Sud`},
{label:`Hanoi Maritime Holding Company	`,value:`Marina Hanoi`},
{label:`Hartmann Project Lines	`,value:`HPL`},
{label:`Heung-A Shipping Co., Ltd.	`,value:`Heung A`},
{label:`Hoegh Autoliners	`,value:`Hoegh`},
{label:`Horizon Lines	`,value:`Horizon`},
{label:`HUBLine Berhad	`,value:`HUBLine`},
{label:`Hugo Stinnes Linien GmbH	`,value:`Hugo Stinnes`},
{label:`Hyde Shipping	`,value:`Hyde Shipping`},
{label:`Independent Container Line	`,value:`ICL`},
{label:`Interocean Lines	`,value:`Interocean Lines`},
{label:`Interport	`,value:`Interport`},
{label:`Industrial Maritime Carriers (Intermarine)	`,value:`Intermarine`},
{label:`Italia Marittima	`,value:`Italia Marittima`},
{label:`Jin Jiang Shipping	`,value:`SHJJ`},
{label:`Kambara Kisen Co., Ltd.	`,value:`Kambara`},
{label:`Kawasaki Kisen Kaisha, Ltd.	`,value:`“K” Line`},
{label:`King Ocean Services	King `,value:`Ocean`},
{label:`Liberty Global Logistics, LLC	`,value:`LGL`},
{label:`Linea Messina	Linea `,value:`Messina`},
{label:`Libyan Shipping Lines	`,value:`LSL`},
{label:`MacAndrews	`,value:`MacAndrews`},
{label:`Maghreb / CL-Line	`,value:`Maghreb`},
{label:`Malaysia International Shipping Corporation `,value:`Berhad	`},
{label:`Marfret Compagnie Maritime	`,value:`Marfret`},
{label:`Marguisa Shipping `,value:`Lines	`},
{label:`Mariana Express Lines Ltd	`,value:`MELL`},
{label:`Maritime Carrier Shipping Center GmbH & Co.	`,value:`MACS`},
{label:`Maruba	`,value:`Maruba`},
{label:`Maxicon Container Line	`,value:`MCL`},
{label:`MCC Transport Pte. Ltd.	`,value:`MCC`},
{label:`Melfi Lines	Melfi `,value:`Lines`},
{label:`Meratus Line	`,value:`Meratus`},
{label:`Mercosul Line	`,value:`Mercosul`},
{label:`Minsheng Ocean Shipping	`,value:`Minsheng`},
{label:`Mitsui O.S.K. Lines	`,value:`MOL`},
{label:`MTL Feeder	`,value:`MTL`},
{label:`Murmansk Shipping Company	`,value:`MSCO`},
{label:`Namsung Shipping Co., Ltd.	`,value:`Namsung`},
{label:`North Sea Container Line	`,value:`NSL`},
{label:`Nile Dutch Africa Line	`,value:`NDS`},
{label:`Nepal Shipping Lines	`,value:`Nepal Shipping`},
{label:`Neptune Shipping Line	`,value:`Neptune`},
{label:`Neptune Pacific Direct Line	`,value:`NPDL`},
{label:`Nirint Shipping Lines	`,value:`Nirint Shipping`},
{label:`NMT International Shipping	`,value:`NMT`},
{label:`Nor Lines	`,value:`Nor Lines`},
{label:`National Shipping of America	`,value:`NSA`},
{label:`NSC Arkhangelsk	`,value:`NSC`},
{label:`NYK Ro-Ro	`,value:`NYK Ro Ro`},
{label:`Nordana Line	`,value:`Nordana`},
{label:`Nippon Yusen Kabushiki Kaisha Line	`,value:`NYK Line`},
{label:`Ocean Africa Container Lines	`,value:`Ocean Africa`},
{label:`Oldenburg-Portugiesische Dampfschiffs-Rheederei	`,value:`OPDR`},
{label:`Orient Express Lines Singapore (Pte) Ltd.	`,value:`OEL`},
{label:`Orient Star Transport International Ltd	`,value:`Orient Star`},
{label:`PACC Container Line	`,value:`PACC`},
{label:`Pan Asia Logistics India Pvt Ltd	`,value:`Pan Asia Line`},
{label:`Pan Continental Shipping Co., Ltd.	`,value:`PanCon`},
{label:`Pan Ocean Co Ltd	`,value:`PanOcean`},
{label:`Pacific Direct Line	`,value:`PDL`},
{label:`Pacific Eagle Lines	`,value:`PEL`},
{label:`Pacific Forum Line	`,value:`PFL`},
{label:`POL-LEVANT Shipping Lines	`,value:`POL LEVANT`},
{label:`Polynesia Line	`,value:`POLY`},
{label:`Pasha Hawaii Transport Lines	`,value:`Pasha Hawaii`},
{label:`PORTLINE Bulk International, SA	`,value:`Portline`},
{label:`Qatar Navigation Lines	`,value:`QNL`},
{label:`Royal Arctic Line	`,value:`RAL`},
{label:`Reef Shipping	`,value:`Reef`},
{label:`RMR Shipping	RMR `,value:`Shipping`},
{label:`Safmarine	`,value:`Safmarine`},
{label:`Salam Pacific Indonesia Lines	`,value:`SPIL`},
{label:`Sallaum Lines	`,value:`Sallaum`},
{label:`Samskip, Inc.	`,value:`Samskip`},
{label:`Sarjak Container Lines	`,value:`Sarjak`},
{label:`Sakhalin Shipping Company	`,value:`SASCO`},
{label:`Shipco Transport	`,value:`Shipco`},
{label:`Shipping Corporation of India Ltd.	`,value:`SCI`},
{label:`Sea Cargo Logistics	`,value:`SCL`},
{label:`Seaboard Marine Ltd.	`,value:`Seaboard Marine`},
{label:`Sea Consortium	`,value:`SeaCon`},
{label:`SeaFreight Line	`,value:`SeaFreight`},
{label:`Sea Hawk Lines	`,value:`SHAL`},
{label:`SeaLand	`,value:`SeaLand`},
{label:`Seatrade Maritime	`,value:`Seatrade`},
{label:`Siem Car Carriers AS	`,value:`SIEM`},
{label:`Simatech Shipping and Forwarding L.L.C	`,value:`Simatech Shipping`},
{label:`SETH Shipping	`,value:`SETH`},
{label:`Sloman Neptun Schiffahrts AG	`,value:`Sloman`},
{label:`Sofrana Surville	`,value:`Sofrana`},
{label:`Sante Shipping Lines	`,value:`SSL`},
{label:`Star Feeders	Star `,value:`Feeders`},
{label:`Star Shipping	Star `,value:`Shipping`},
{label:`Stolt Tank Containers	`,value:`STC`},
{label:`STX Pan Ocean	`,value:`STX`},
{label:`Sunmarine Shipping Services	`,value:`Sunmarine`},
{label:`Swan Container Line	`,value:`Swan`},
{label:`Tarros S.p.a.	`,value:`Tarros`},
{label:`Taicang Container Lines	`,value:`Taicang`},
{label:`Team Lines	Team `,value:`Lines`},
{label:`TOTE Maritime (Sea Star Line)	TOTE `,value:`Maritime`},
{label:`Trans Asia Shipping Line	Trans `,value:`Asia`},
{label:`Transportes Maritimos Insulares, S.A.	`,value:`Transinsular`},
{label:`Transvision Shipping Line	`,value:`Transvision`},
{label:`Tropical Shipping	`,value:`Tropical`},
{label:`Tschudi Lines	`,value:`Tschudi`},
{label:`Turkon Line Inc	`,value:`Turkon`},
{label:`Thorco Shipping	`,value:`Thorco`},
{label:`TOHO Shipping Co., Ltd	`,value:`TOHO`},
{label:`Trinity Shipping Line	`,value:`Trinity`},
{label:`United Feeder Services	`,value:`UFS`},
{label:`Universal Africa Lines	`,value:`UAL`},
{label:`United Arab Shipping Company Co.(S.A.G)	`,value:`UASC`},
{label:`US Lines	`,value:`USL`},
{label:`Valmer Lines	`,value:`Valmer`},
{label:`Van Uden Maritime	Van `,value:`Uden`},
{label:`Van den Ban Autobanden B.V.	Van den `,value:`Ban`},
{label:`Van Donge & de Roo	D&`,value:`R`},
{label:`Vasco Maritime	`,value:`Vasco`},
{label:`Vietnam National Shipping Lines	`,value:`VINALines`},
{label:`Wallenius Wilhelmsen Logistics	`,value:`WWL`},
{label:`West European Container Lines	`,value:`WEC`},
{label:`Westwood Shipping Lines	`,value:`Westwood`},
{label:`World Logistics Service (USA) Inc	`,value:`WLS`},
{label:`Zeamarine	`,value:`Zeamarine`},
]


