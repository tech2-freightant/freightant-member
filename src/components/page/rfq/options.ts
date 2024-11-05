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
          {key:strings.mt,label:strings.mt,value:strings.mt},
          {key:strings.cbm,label:strings.cbm,value:strings.cbm},
          {key:strings.awb,label:strings.awb,value:strings.awb},
          {key:strings.invoice,label:strings.invoice,value:strings.invoice},
          {key:strings.truck,label:strings.truck,value:strings.truck},
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
  { "label": "Mediterranean Shipping Company", "value": "MSC", "extra": "MSCU" },
  { "label": "Maersk Line", "value": "Maersk", "extra": "MAEU" },
  { "label": "CMA CGM", "value": "CMA CGM", "extra": "CMDU" },
  { "label": "COSCO Container Lines", "value": "COSCON", "extra": "COSU" },
  { "label": "Hapag Lloyd Container Line", "value": "Hapag", "extra": "HLCU" },
  { "label": "Evergreen Line", "value": "Evergreen", "extra": "EGLV" },
  { "label": "Hyundai Merchant Marine Co. Ltd", "value": "HMM", "extra": "HDMU" },
  { "label": "Ocean Network Express", "value": "ONE", "extra": "ONEY" },
  { "label": "Orient Overseas Container Line Ltd.", "value": "OOCL", "extra": "OOLU" },
  { "label": "Yang Ming Marine Transport Corp.", "value": "YML", "extra": "YMLU" },
  { "label": "ZIM Israel Navigation Astramaris", "value": "ZIM", "extra": "ZIMU" },
  { "label": "Wan Hai Lines", "value": "WHL", "extra": "22AA" },
  { "label": "Pacific International Lines", "value": "PIL", "extra": "PCIU" },
  { "label": "SITC Container Lines Co., LTD", "value": "SITC", "extra": "12PD" },
  { "label": "Korea Marine Transport Co., Ltd.", "value": "KMTC", "extra": "KMTU" },
  { "label": "Islamic Republic of Iran Shipping Lines", "value": "IRISL " },
  { "label": "Unifeeder", "value": "Unifeeder", "extra": "UFEE" },
  { "label": "X-Press Container Line", "value": "XCL", "extra": "XCLS" },
  { "label": "TS Lines", "value": "TSL", "extra": "TSTU" },
  { "label": "SM Line Corporation", "value": "SML", "extra": "SMLM" },
  { "label": "China United Lines", "value": "CU Lines", "extra": "CULU" },
  { "label": "Perma Shipping Line", "value": "Perma", "extra": "PMLU" },
  { "label": "Sinokor Merchant Marine Co.,Ltd", "value": "Sinokor", "extra": "SKLU" },
  { "label": "Regional Container Lines", "value": "RCL", "extra": "REGU" },
  { "label": "Matson Navigation Company Inc", "value": "MATS", "extra": "MATS" },
  { "label": "Swire Shipping", "value": "Swire", "extra": "CHVW" },
  { "label": "Emirates Shipping Line", "value": "Emirates", "extra": "ESPU" },
  { "label": "Arkas Container Transport S.A.", "value": "Arkas", "extra": "ARKU" },
  { "label": "Sinotrans Container Lines Co.,Ltd", "value": "Sinotrans", "extra": "12IH" },
  { "label": "American President Lines", "value": "APL", "extra": "APLU" },
  { "label": "AlianÃ§a NavegaÃ§Ã£o e LogÃ­stica", "value": "Alianca", "extra": "ANRM" },
  { "label": "Australia National Line", "value": "ANL", "extra": "ANNU" },
  { "label": "BLPL Singapore", "value": "BLPL", "extra": "BLZU" },
  { "label": "Interasia Lines", "value": "Interasia", "extra": "IAAU" },
  { "label": "Samudera Shipping Line Ltd", "value": "Samudera", "extra": "SIKU" },
  {},
  {},
  { "label": "Admiral Container Lines", "value": "Admiral", "extra": "ADMU" },
  { "label": "Advance Container Lines", "value": "AC Lines" },
  { "label": "Africa Express Line", "value": "AEL" },
  { "label": "Alaska Marine Lines", "value": "AML", "extra": "AKMR" },
  { "label": "Allalouf Shipping", "value": "Allalouf" },
  { "label": "Antillean Marine Shipping Corporation", "value": "Antillean Marine", "extra": "AMLU" },
  { "label": "Asiatic Shipping Services", "value": "AsiaTic", "extra": "AIDA" },
  { "label": "Atlantic Caribbean Line", "value": "AC Line", "extra": "ACBL" },
  { "label": "Atlantic Container Line", "value": "ACL", "extra": "ACLU" },
  { "label": "Atlantic Ro-Ro Carriers Inc", "value": "Atlantic Ro-Ro", "extra": "AROF" },
  { "label": "Avana Global FZCO", "value": "BALAJI", "extra": "BLJU" },
  { "label": "Avana Logistek", "value": "Avana" },
  { "label": "Balaji Shipping Lines FZCO", "value": "Balaji", "extra": "BLJU" },
  { "label": "Beacon Intermodal", "value": "Beacon" },
  { "label": "Bengal Tiger Line", "value": "BTL", "extra": "BTBI" },
  { "label": "Bermuda Container Line", "value": "BCL", "extra": "BCLU" },
  { "label": "Bermuda International Shipping Ltd", "value": "BISL", "extra": "BISU" },
  { "label": "BG Freight Line", "value": "BG Freight" },
  { "label": "Bien Dong Shipping Company", "value": "Bien Dong", "extra": "BIEN" },
  { "label": "Blue Anchor America Line", "value": "BAAL", "extra": "BANQ" },
  { "label": "Blue Water Lines", "value": "BWL", "extra": "BWLU" },
  { "label": "Blue World Line", "value": "BW Line", "extra": "BWLE" },
  { "label": "BMC Line Shipping LLC", "value": "BMC Line", "extra": "BMSU" },
  { "label": "Borchard Lines Ltd", "value": "Borchard", "extra": "BORU" },
  { "label": "Brointermed Lines Limited", "value": "BT", "extra": "BNAO" },
  { "label": "Navigation Maritime Bulgare", "value": "Bulcon", "extra": "NMBG" },
  { "label": "Seereederei Baco-Liner GmbH", "value": "Baco-Liner" },
  { "label": "Cahaya Samudera Shipping Pte Ltd", "value": "CSS" },
  { "label": "Care Lines", "value": "Care Lines" },
  { "label": "Central Gulf Lines, Inc", "value": "CGL", "extra": "CEGL" },
  { "label": "Ceylon Shipping Corporation Limited", "value": "CSC", "extra": "CEYP" },
  { "label": "Cheng Lie Navigation Co.,Ltd", "value": "CNC", "extra": "11DX" },
  { "label": "China Navigation Company", "value": "Swire Shipping", "extra": "CHVW" },
  { "label": "China Shipping Container Lines Co", "value": "CSCL", "extra": "CHNJ" },
  { "label": "Chinese-Polish Joint Stock Shipping Company", "value": "CHIPOLBROK", "extra": "CPJQ" },
  { "label": "Cido Car Carrier Services", "value": "CCCS" },
  { "label": "CK Line", "value": "CK Line", "extra": "CKLU" },
  { "label": "Columbia Coastal Transport, LLC", "value": "CCT" },
  { "label": "Compagnia Chilena de Navigacion Interoceanica SA", "value": "CCNI", "extra": "CNIU" },
  { "label": "Compania Sud Americana de Vapores", "value": "CSAV", "extra": "CHIW" },
  { "label": "Container H Lines", "value": "CHL" },
  { "label": "Containerships", "value": "Containerships", "extra": "CSFU" },
  { "label": "Conti-Lines", "value": "Conti-Lines" },
  { "label": "Crowley Maritime", "value": "Crowley", "extra": "CMCU, , CAMN" },
  { "label": "CSAL Canada States Africa Line", "value": "CSAL", "extra": "CFLD" },
  { "label": "CSAV Norasia", "value": "CSAV", "extra": "NSLU" },
  { "label": "Daylight Transport LLC", "value": "Daylight", "extra": "DYLT" },
  { "label": "Delmas", "value": "Delmas", "extra": "DVRU" },
  { "label": "Delphis", "value": "Delphis", "extra": "DPHS" },
  { "label": "Delta Shipping Lines", "value": "Delta", "extra": "DSLU" },
  { "label": "Deutsche Afrika-Linien", "value": "DAL", "extra": "DAYU" },
  { "label": "Dole Ocean Cargo", "value": "Dole", "extra": "DOLQ" },
  { "label": "Dong Young Shipping", "value": "Dong Young", "extra": "PSCU" },
  { "label": "Dongjin Shipping", "value": "Dongjin", "extra": "DJLU" },
  { "label": "Econ Shipping", "value": "Econship", "extra": "ECNU" },
  { "label": "ECU Worldwide", "value": "ECU", "extra": "ECUI" },
  { "label": "Ecuadorian Line", "value": "Ecuadorian Line", "extra": "EQLI" },
  { "label": "Egyptian Navigation Co.", "value": "ENC" },
  { "label": "Eimskip", "value": "Eimskip", "extra": "EIMU" },
  { "label": "Emkay Line", "value": "Emkay", "extra": "EMKU" },
  { "label": "Eucon", "value": "Eucon", "extra": "EUCU" },
  { "label": "Eukor", "value": "Eukor", "extra": "EUKO" },
  { "label": "Euro Container Line", "value": "ECL" },
  { "label": "Euro Marine Logistics", "value": "EML" },
  { "label": "EuroAfrica Shipping Lines co. Ltd.", "value": "ESL", "extra": "EULU" },
  { "label": "Far Eastern Shipping Company", "value": "FESCO", "extra": "FESO" },
  { "label": "Fednav", "value": "Fednav", "extra": "FCOM" },
  { "label": "Feederlink Shipping & Trading B.V.", "value": "Feederlink" },
  { "label": "Finnlines", "value": "Finnlines", "extra": "FLFU" },
  { "label": "Flexi-Van Leasing", "value": "Flexi-Van", "extra": "FLGZ" },
  { "label": "FLORENS CONTAINER SERVICES", "value": "Florens", "extra": "FBIU" },
  { "label": "Focus Trucking", "value": "FOCUS", "extra": "FCSK" },
  { "label": "Frontier Liner Services", "value": "FLS", "extra": "FLNV" },
  { "label": "G&G Shipping", "value": "G&G" },
  { "label": "Galborg", "value": "Galborg", "extra": "GFAL" },
  { "label": "Geest Line", "value": "Geest Line", "extra": "GILU" },
  { "label": "General National Maritime Transport Company", "value": "GNMTC" },
  { "label": "Global Container International", "value": "Global", "extra": "GCIU" },
  { "label": "Gold Star Line Ltd.", "value": "GSL", "extra": "GSLU" },
  { "label": "Gothong Southern Shipping Lines Incorporated", "value": "Gothong Southern" },
  { "label": "Great White Fleet", "value": "GWF", "extra": "UBCU" },
  { "label": "Greater Bali Hai", "value": "GBH" },
  { "label": "Grieg Star Shipping", "value": "Grieg Star", "extra": "ACSU" },
  { "label": "Grimaldi Deep Sea S.P.A.", "value": "Grimaldi", "extra": "GRIU" },
  { "label": "Grimaldi Lines", "value": "Grimaldi Lines", "extra": "GMGO" },
  { "label": "Hafez Darya Arya Shipping Company", "value": "HDSCO Line", "extra": "IRSU" },
  { "label": "Hamburg SÃ¼damerikanische Dampfschifffahrts-Gesellschaft A / S & Co. KG", "value": "Hamburg Sud", "extra": "SUDU" },
  { "label": "Hanoi Maritime Holding Company", "value": "Marina Hanoi" },
  { "label": "Hartmann Project Lines", "value": "HPL", "extra": "HALP" },
  { "label": "Heung-A Shipping Co., Ltd.", "value": "Heung-A", "extra": "11QU" },
  { "label": "Hoegh Autoliners", "value": "Hoegh", "extra": "HUAU" },
  { "label": "Horizon Lines", "value": "Horizon", "extra": "HRZU" },
  { "label": "HUBLine Berhad", "value": "HUBLine" },
  { "label": "Hugo Stinnes Linien GmbH", "value": "Hugo Stinnes" },
  { "label": "Hyde Shipping", "value": "Hyde Shipping", "extra": "HYDU" },
  { "label": "Independent Container Line", "value": "ICL", "extra": "IILU" },
  { "label": "Interocean Lines", "value": "Interocean Lines", "extra": "INOC" },
  { "label": "Interport", "value": "Interport" },
  { "label": "Industrial Maritime Carriers (Intermarine)", "value": "Intermarine", "extra": "IDMC" },
  { "label": "Italia Marittima", "value": "Italia Marittima" },
  { "label": "Jin Jiang Shipping", "value": "SHJJ", "extra": "11WJ" },
  { "label": "Kambara Kisen Co., Ltd.", "value": "Kambara", "extra": "KKCL" },
  { "label": "Kawasaki Kisen Kaisha, Ltd.", "value": "âKâ Line", "extra": "KKLU" },
  { "label": "King Ocean Services", "value": "King Ocean", "extra": "KOSL" },
  { "label": "Liberty Global Logistics, LLC", "value": "LGL", "extra": "LGLT" },
  { "label": "Linea Messina", "value": "Linea Messina", "extra": "LMCU" },
  { "label": "Libyan Shipping Lines", "value": "LSL" },
  { "label": "MacAndrews", "value": "MacAndrews" },
  { "label": "Maghreb / CL-Line", "value": "Maghreb" },
  { "label": "Malaysia International Shipping Corporation Berhad", "extra": "MISC" },
  { "label": "Marfret Compagnie Maritime", "value": "Marfret", "extra": "MFTU" },
  { "label": "Marguisa Shipping Lines", "extra": "MGSU" },
  { "label": "Mariana Express Lines Ltd", "value": "MELL", "extra": "MELL" },
  { "label": "Maritime Carrier Shipping Center GmbH & Co.", "value": "MACS", "extra": "ELOU" },
  { "label": "Maruba", "value": "Maruba", "extra": "MRUB" },
  { "label": "Maxicon Container Line", "value": "MCL", "extra": "MXCU" },
  { "label": "MCC Transport Pte. Ltd.", "value": "MCC", "extra": "MCCQ" },
  { "label": "Melfi Lines", "value": "Melfi Lines" },
  { "label": "Meratus Line", "value": "Meratus", "extra": "MRTU" },
  { "label": "Mercosul Line", "value": "Mercosul" },
  { "label": "Minsheng Ocean Shipping", "value": "Minsheng", "extra": "13CQ" },
  { "label": "Mitsui O.S.K. Lines", "value": "MOL", "extra": "MOLU" },
  { "label": "MTL Feeder", "value": "MTL" },
  { "label": "Murmansk Shipping Company", "value": "MSCO" },
  { "label": "Namsung Shipping Co., Ltd.", "value": "Namsung", "extra": "NSRU" },
  { "label": "North Sea Container Line", "value": "NSL" },
  { "label": "Nile Dutch Africa Line", "value": "NDS", "extra": "NIDU" },
  { "label": "Nepal Shipping Lines", "value": "Nepal Shipping" },
  { "label": "Neptune Shipping Line", "value": "Neptune", "extra": "NOSU" },
  { "label": "Neptune Pacific Direct Line", "value": "NPDL", "extra": "PDLU" },
  { "label": "Nirint Shipping Lines", "value": "Nirint Shipping", "extra": "32GH" },
  { "label": "NMT International Shipping", "value": "NMT" },
  { "label": "Nor Lines", "value": "Nor Lines" },
  { "label": "National Shipping of America", "value": "NSA" },
  { "label": "NSC Arkhangelsk", "value": "NSC" },
  { "label": "NYK Ro-Ro", "value": "NYK Ro Ro" },
  { "label": "Nordana Line", "value": "Nordana", "extra": "NODA" },
  { "label": "Nippon Yusen Kabushiki Kaisha Line", "value": "NYK Line", "extra": "NYKS" },
  { "label": "Ocean Africa Container Lines", "value": "Ocean Africa" },
  { "label": "Oldenburg-Portugiesische Dampfschiffs-Rheederei", "value": "OPDR", "extra": "OPDU" },
  { "label": "Orient Express Lines Singapore (Pte) Ltd.", "value": "OEL" },
  { "label": "Orient Star Transport International Ltd", "value": "Orient Star", "extra": "OSTI" },
  { "label": "PACC Container Line", "value": "PACC" },
  { "label": "Pan Asia Logistics India Pvt Ltd", "value": "Pan Asia Line", "extra": "PALU" },
  { "label": "Pan Continental Shipping Co., Ltd.", "value": "PanCon", "extra": "PCLU" },
  { "label": "Pan Ocean Co Ltd", "value": "PanOcean", "extra": "POBU" },
  { "label": "Pacific Direct Line", "value": "PDL" },
  { "label": "Pacific Eagle Lines", "value": "PEL" },
  { "label": "Pacific Forum Line", "value": "PFL" },
  { "label": "POL-LEVANT Shipping Lines", "value": "POL-LEVANT" },
  { "label": "Polynesia Line", "value": "POLY", "extra": "PLLU" },
  { "label": "Pasha Hawaii Transport Lines", "value": "Pasha Hawaii", "extra": "PSHI" },
  { "label": "PORTLINE Bulk International, SA", "value": "Portline" },
  { "label": "Qatar Navigation Lines", "value": "QNL", "extra": "QNLU" },
  { "label": "Royal Arctic Line", "value": "RAL" },
  { "label": "Reef Shipping", "value": "Reef" },
  { "label": "RMR Shipping", "value": "RMR Shipping" },
  { "label": "Safmarine", "value": "Safmarine", "extra": "SAFM" },
  { "label": "Salam Pacific Indonesia Lines", "value": "SPIL", "extra": "SPNU" },
  { "label": "Sallaum Lines", "value": "Sallaum", "extra": "SLAQ" },
  { "label": "Samskip, Inc.", "value": "Samskip", "extra": "SKII" },
  { "label": "Sarjak Container Lines", "value": "Sarjak", "extra": "SJKU" },
  { "label": "Sakhalin Shipping Company", "value": "SASCO" },
  { "label": "Shipco Transport", "value": "Shipco", "extra": "SHPT" },
  { "label": "Shipping Corporation of India Ltd.", "value": "SCI", "extra": "SCIU" },
  { "label": "Sea Cargo Logistics", "value": "SCL" },
  { "label": "Seaboard Marine Ltd.", "value": "Seaboard Marine", "extra": "SMLU" },
  { "label": "Sea Consortium", "value": "SeaCon" },
  { "label": "SeaFreight Line", "value": "SeaFreight", "extra": "SEFN" },
  { "label": "Sea Hawk Lines", "value": "SHAL", "extra": "SHKU" },
  { "label": "SeaLand", "value": "SeaLand", "extra": "SEJJ, MCCQ, SEAU" },
  { "label": "Seatrade Maritime", "value": "Seatrade" },
  { "label": "Siem Car Carriers AS", "value": "SIEM", "extra": "SCYE" },
  { "label": "Simatech Shipping and Forwarding L.L.C", "value": "Simatech Shipping" },
  { "label": "SETH Shipping", "value": "SETH", "extra": "SSPH" },
  { "label": "Sloman Neptun Schiffahrts AG", "value": "Sloman" },
  { "label": "Sofrana Surville", "value": "Sofrana" },
  { "label": "Sante Shipping Lines", "value": "SSL" },
  { "label": "Star Feeders", "value": "Star Feeders" },
  { "label": "Star Shipping", "value": "Star Shipping" },
  { "label": "Stolt Tank Containers", "value": "STC", "extra": "SNTU" },
  { "label": "STX Pan Ocean", "value": "STX", "extra": "POBU" },
  { "label": "Sunmarine Shipping Services", "value": "Sunmarine", "extra": "BAXU" },
  { "label": "Swan Container Line", "value": "Swan" },
  { "label": "Tarros S.p.a.", "value": "Tarros", "extra": "GETU" },
  { "label": "Taicang Container Lines", "value": "Taicang", "extra": "32GG" },
  { "label": "Team Lines", "value": "Team Lines" },
  { "label": "TOTE Maritime (Sea Star Line)", "value": "TOTE Maritime", "extra": "STRU" },
  { "label": "Trans Asia Shipping Line", "value": "Trans Asia", "extra": "TLXU" },
  { "label": "Transportes Maritimos Insulares, S.A.", "value": "Transinsular" },
  { "label": "Transvision Shipping Line", "value": "Transvision", "extra": "TVSU" },
  { "label": "Tropical Shipping", "value": "Tropical", "extra": "TSGL" },
  { "label": "Tschudi Lines", "value": "Tschudi" },
  { "label": "Turkon Line Inc", "value": "Turkon", "extra": "TRKU" },
  { "label": "Thorco Shipping", "value": "Thorco", "extra": "THZS" },
  { "label": "TOHO Shipping Co., Ltd", "value": "TOHO", "extra": "TOHO" },
  { "label": "Trinity Shipping Line", "value": "Trinity", "extra": "TRNH" },
  { "label": "United Feeder Services", "value": "UFS", "extra": "UFSB" },
  { "label": "Universal Africa Lines", "value": "UAL", "extra": "UALC" },
  { "label": "United Arab Shipping Company Co.(S.A.G)", "value": "UASC", "extra": "UASC" },
  { "label": "US Lines", "value": "USL", "extra": "USLU" },
  { "label": "Valmer Lines", "value": "Valmer" },
  { "label": "Van Uden Maritime", "value": "Van Uden" },
  { "label": "Van den Ban Autobanden B.V.", "value": "Van den Ban", "extra": "VDBU" },
  { "label": "Van Donge & de Roo", "value": "D&R", "extra": "VDDR" },
  { "label": "Vasco Maritime", "value": "Vasco" },
  { "label": "Vietnam National Shipping Lines", "value": "VINALines" },
  { "label": "Wallenius Wilhelmsen Logistics", "value": "WWL", "extra": "WLWH" },
  { "label": "West European Container Lines", "value": "WEC", "extra": "WECU" },
  { "label": "Westwood Shipping Lines", "value": "Westwood", "extra": "WWSU" },
  { "label": "World Logistics Service (USA) Inc", "value": "WLS", "extra": "WDLS" },
  { "label": "Zeamarine", "value": "Zeamarine", "extra": "RCKI" }
]

export const sortOptions = [
  'Lowest Ocean Freight' ,
  'Lowest Total landed cost' ,
  'Lowest Transit Time' ,
  'Least Transhipment Ports' ,
  'Earliest Departure' 
];


export const airlinesOptions = [
{label:`DW-	ACR Aero-Charter Airlines`,country:`Ukraine`},
{label:`E2-	Kampuchea Airlines`,country:`Pakistan`},
{label:`E4-	Aero Asia International`,country:`Italy`},
{label:`E6-	Bringer Air Cargo`,country:`United States`},
{label:`E8-	ALPI Eagles`,country:`Japan`},
{label:`E9-	AJT Air International`,country:`United States`},
{label:`EB-	Emery Worldwide`,country:`Ecuador`},
{label:`ED-	Airblue`,country:`China PRC`},
{label:`EG-	Japan Asia Airways`,country:`United States`},
{label:`EH-	SAETA-Soc.Ecuatoriana de Transp.Aereos`,country:`Afghanistan`},
{label:`EM-	Empire Airlines`,country:`United States`},
{label:`EO-	Demavia Airlines`,country:`Argentina`},
{label:`EQ-	TAME-Linea Aerea del Ecuador`,country:`United States`},
{label:`EV-	Atlantic Southeast Airlines`,country:`United States`},
{label:`F4-	Shanghai Airlines Cargo`,country:`Bahrain`},
{label:`F6-	First Cambodia Airlines`,country:`Gabon`},
{label:`FB-	Fine Air Services`,country:`United Kingdom`},
{label:`FD-	Cityflyer`,country:`Gabon`},
{label:`FG-	Ariana Afghan Airlines`,country:`United States`},
{label:`FJ-	Air Pacific`,country:`United States`},
{label:`FL-	AirTran`,country:`Sweden`},
{label:`FM-	Shanghai Airlines`,country:`Germany`},
{label:`FS-	STAF Airlines`,country:`Iraq`},
{label:`FU-	Air Littoral`,country:`Sweden`},
{label:`G4-	Allegiant Air`,country:`Azerbaijan`},
{label:`GA-	Garuda Indonesia`,country:`Iran`},
{label:`GB-	ABX Air`,country:`France`},
{label:`GD-	TAESA - Transportes Aereos Ejecutivos`,country:`Israel`},
{label:`GF-	Gulf Air`,country:`Russia`},
{label:`GL-	Air Greenland`,country:`United States`},
{label:`GN-	Air Gabon`,country:`Brazil`},
{label:`GO-	GO`,country:`Slovenia`},
{label:`GT-	GB Airways`,country:`North Korea`},
{label:`GV-	Riga Airlines`,country:`Singapore`},
{label:`GY-	Gabon Airlines`,country:`Kenya`},
{label:`H7-	Air Alfa`,country:`Canada`},
{label:`HA-	Hawaiian Airlines`,country:`Australia`},
{label:`HH-	Islandsflug`,country:`Cuba`},
{label:`HL-	Business Express (Delta Connection)`,country:`Hong Kong`},
{label:`HP-	America West Airlines`,country:`Antigua & Barbuda`},
{label:`HS-	Highland Air`,country:`Neth. Antilles`},
{label:`HU-	Hainan Airlines`,country:`Equatorial Guinea`},
{label:`HX-	Hamburg Airlines`,country:`United States`},
{label:`HZ-	SAT Airlines`,country:`United States`},
{label:`IA-	Iraqi Airways`,country:`Turkey`},
{label:`IE-	Solomon Airlines`,country:`China PRC`},
{label:`IH-	Falcon Air`,country:`Mauritius`},
{label:`II-	IBC Airways Inc`,country:`South Africa`},
{label:`IK-	Imair Airline`,country:`Egypt`},
{label:`IP-	Atyrau Airways`,country:`Armenia`},
{label:`IR-	Iran Air`,country:`Peru`},
{label:`IT-	Kingfisher Airlines`,country:`United States`},
{label:`IW-	AOM-Minerve`,country:`Austria`},
{label:`IY-	Yemenia Airways`,country:`New Zealand`},
{label:`IZ-	Arkia-Israeli Airlines`,country:`Japan`},
{label:`J3-	Northwestern Air Lease`,country:`Iceland`},
{label:`J7-	Centre-Avia Airlines`,country:`Guadaloupe`},
{label:`JA-	B&H Airlines`,country:`Mongolia`},
{label:`JF-	Lab Flying Service`,country:`Austria`},
{label:`JH-	Nordeste-Linhas Aereas Regionais`,country:`Estonia`},
{label:`JJ-	TAM Linhas Aereas`,country:`United States`},
{label:`JN-	XL Airways`,country:`Fiji`},
{label:`JP-	Adria Airways`,country:`Palestine`},
{label:`JQ-	Jetstar`,country:`Pakistan`},
{label:`JS-	Air Koryo`,country:`Ukraine`},
{label:`JV-	Bearskin Airlines`,country:`Papua New Guinea`},
{label:`JX-	Jett8 Airlines Cargo`,country:`United States`},
{label:`K2-	Kyrgyzstan Airlines`,country:`Mexico`},
{label:`K5-	Air East Africa`,country:`Malawi`},
{label:`K7-	Sakha Avia`,country:`Uganda`},
{label:`K9-	Skyward Aviation`,country:`United States`},
{label:`KB-	Druk Air`,country:`Armenia`},
{label:`KD-	Kendell Airlines`,country:`Faroe Is`},
{label:`KF-	Blue1`,country:`Ivory Coast`},
{label:`KG-	Aerogaviota`,country:`Romania`},
{label:`KJ-	British Mediterranean Airways`,country:`United States`},
{label:`LD-	Air Hong Kong`,country:`France`},
{label:`LF-	Linjeflyg`,country:`Namibia`},
{label:`LI-	LIAT (1974)`,country:`United Kingdom`},
{label:`LK-	Air Luxor`,country:`Ireland`},
{label:`LM-	ALM Airline`,country:`Sweden`},
{label:`LO-	LOT Polish Airlines`,country:`Lebanon`},
{label:`LQ-	Air Guinea Cargo`,country:`Portugal`},
{label:`LV-	Albanian Airlines`,country:`Canada`},
{label:`LW-	Pacific Wings`,country:`Belgium`},
{label:`M3-	ABSA Cargo Airline`,country:`Argentina`},
{label:`M6-	Amerijet`,country:`Chile`},
{label:`M9-	Motor Sich JSC Airlines`,country:`United Kingdom`},
{label:`MB-	MNG Airlines`,country:`Russia`},
{label:`MD-	Air Madagascar`,country:`Spain`},
{label:`MF-	Xiamen Airlines`,country:`Romania`},
{label:`MI-	SilkAir`,country:`Italy`},
{label:`MK-	Air Mauritius`,country:`France`},
{label:`ML-	Aero Costa Rica`,country:`Venezuela`},
{label:`MN-	Kulula.com`,country:`Vietnam`},
{label:`MP-	Martinair`,country:`Australia`},
{label:`MS-	Egyptair`,country:`Mexico`},
{label:`MT-	jmc airlines`,country:`Iran`},
{label:`MV-	Armenian International Airways`,country:`Rwanda`},
{label:`MY-	Mas Air`,country:`China PRC`},
{label:`N6-	Aero Continente`,country:`United States`},
{label:`N7-	Lagun Air`,country:`United States`},
{label:`NA-	National Airlines`,country:`Russia`},
{label:`NC-	Northern Air Cargo`,country:`United States`},
{label:`NG-	Lauda Air`,country:`France`},
{label:`NK-	Spirit Airlines`,country:`Turkey`},
{label:`NM-	Mount Cook`,country:`Peru`},
{label:`NQ-	Orbi Georgian Airlines`,country:`Iran`},
{label:`NU-	Japan TransOcean Air`,country:`North Cyprus`},
{label:`NW-	Northwest Airlines`,country:`Germany`},
{label:`NY-	Air Iceland`,country:`Togo`},
{label:`OB-	Astrakhan Airlines`,country:`United States`},
{label:`OG-	Air Guadaloupe`,country:`Ukraine`},
{label:`OK-	Czech Airlines`,country:`United Kingdom`},
{label:`OM-	MIAT-Mongolian Airlines`,country:`United States`},
{label:`OO-	SkyWest Airlines`,country:`Malayasia`},
{label:`OS-	Austrian Cargo`,country:``},
{label:`OT-	Avant Airlines`,country:`SingaporePeru`},
{label:`OV-	Estonian Air`,country:`Switzerland`},
{label:`P4-	Pacific International Airlines`,country:`Macedonia`},
{label:`P6-	Trans Air`,country:`Hungary`},
{label:`PB-	Provincial Airlines`,country:`Argentina`},
{label:`PC-	Air Fiji`,country:`Canada`},
{label:`PE-	Air Europe`,country:`Mexico`},
{label:`PF-	Palestinian Airlines`,country:`Hong Kong`},
{label:`PH-	Polynesian Airlines`,country:`Vanuatu`},
{label:`PK-	Pakistan International Airlines`,country:`Belgium`},
{label:`PO-	Polar Air Cargo`,country:`Martinique`},
{label:`PS-	Ukraine International Airlines`,country:`Canada`},
{label:`PW-	Precision Air`,country:`Greece`},
{label:`PX-	Air Niugini`,country:`United States`},
{label:`PZ-	TAM Mercosur`,country:`Nauru`},
{label:`Q5-	40 Mile Air`,country:`Croatia`},
{label:`Q9-	Interbrasil Star`,country:`Russia`},
{label:`QA-	Aerovias Caribe`,country:`Russia`},
{label:`QK-	Air Nova/Air Canada Regional Airlines`,country:`Thailand`},
{label:`QM-	Air Malawi`,country:`Peru`},
{label:`QO-	Aeromexpress Cargo`,country:`Uruguay`},
{label:`QU-	Uganda Airlines`,country:`Zambia`},
{label:`QV-	Lao Airways`,country:`Congo DR`},
{label:`QX-	Horizon Airlines`,country:`Sri Lanka`},
{label:`R2-	Orenair`,country:`United States`},
{label:`R3-	Armenian Airlines`,country:`Germany`},
{label:`RA-	Royal Nepal Airlines`,country:`Venezuela`},
{label:`RC-	Atlantic Airways`,country:`United States`},
{label:`RG-	VARIG Brazilian Airlines`,country:`Moldova`},
{label:`RK-	Air Afrique`,country:`Turks & Caicos Is`},
{label:`RN-	Euralair International`,country:`Costa Rica`},
{label:`RO-	TAROM-Romanian Air Transport`,country:`Venezuela`},
{label:`RV-	Reeve Aleutian Airways`,country:`United States`},
{label:`RX-	Redwing Airways`,country:`Russia`},
{label:`SP-	SATA - Air Acores`,country:`Kenya`},
{label:`SS-	Corsair`,country:`China PRC`},
{label:`SU-	Aeroflot-Cargo`,country:`France`},
{label:`SW-	Air Namibia`,country:`Indonesia`},
{label:`SZ-	China Southwest Airlines`,country:`Ireland`},
{label:`T3-	Eastern Airways`,country:`United States`},
{label:`T5-	Turkmenistan Airlines`,country:`United States`},
{label:`T7-	Transaer`,country:`Latvia`},
{label:`TA-	TACA International Airlines/Groupo TACA`,country:`Tanzania`},
{label:`TF-	Malmo Aviation`,country:`Thailand`},
{label:`TH-	Transmile Air Services`,country:`Cambodia`},
{label:`TL-	Trans Mediterranean Airways`,country:`United States`},
{label:`TN-	Air Tahiti Nui`,country:`Chile`},
{label:`TP-	TAP-Air Portugal`,country:`Cyprus`},
{label:`TQ-	Tandem Aero`,country:`United States`},
{label:`TS-	Air Transat`,country:`Russia`},
{label:`TU-	Tunisair`,country:`Russia`},
{label:`TV-	Virgin Express`,country:`Venezuela`},
{label:`TY-	Air Caledonie`,country:`Russia`},
{label:`U3-	Air Plus Argentina`,country:`Germany`},
{label:`U8-	Armavia`,country:`Taiwan ROC`},
{label:`UD-	Fast Air Carrier`,country:`Italy`},
{label:`UG-	Tuninter`,country:`Bahrain`},
{label:`UK-	KLCuk`,country:`Germany`},
{label:`UL-	Srilankan Airlines`,country:`Nepal`},
{label:`UN-	Transaero Airlines`,country:`Dubai`},
{label:`US-	US Airways`,country:`Iceland`},
{label:`UX-	Air Europa`,country:`Ireland`},
{label:`UY-	Cameroon Airlines`,country:`Russia`},
{label:`V3-	Carpatair`,country:`United States`},
{label:`V8-	ATRAN Cargo Airlines`,country:`Taiwan ROC`},
{label:`VA-	Volare Airlines`,country:`South Africa`},
{label:`VB-	Maersk Air (UK)`,country:`Guatemala`},
{label:`VD-	Air Liberte`,country:`Russia`},
{label:`VF-	British World Airlines`,country:`Seychelles`},
{label:`VH-	Aeropostal Alas de Venezuela`,country:`Germany`},
{label:`VK-	Air Tungaru`,country:`Uzbekistan`},
{label:`VN-	Vietnam Airlines`,country:``},
{label:`VP-	VASP`,country:`IndiaFrance`},
{label:`VQ-	Impulse Airlines`,country:`Germany`},
{label:`VU-	Air Ivoire`,country:`France`},
{label:`VW-	Transportes Aeromar SA de CV`,country:`Russia`},
{label:`VY-	Formosa Airlines`,country:`Canada`},
{label:`W5-	Mahan Air`,country:`China PRC`},
{label:`W7-	Sayakhat Air Company`,country:`Jamaica`},
{label:`WB-	Rwandair Express`,country:`Mexico`},
{label:`WE-	Centurion Air Cargo`,country:`United States`},
{label:`WH-	China Northwest Airlines`,country:`Russia`},
{label:`WK-	American Falcon`,country:`United States`},
{label:`WN-	Southwest Airlines`,country:`Malta`},
{label:`WQ-	Romavia`,country:`United States`},
{label:`WV-	Air South Airlines`,country:`United States`},
{label:`WZ-	West African Airlines`,country:`Kuwait`},
{label:`X7-	Chita Avia`,country:`Sao Tome & Principe`},
{label:`X8-	Icaro`,country:`United States`},
{label:`XE-	ExpressJet`,country:`Italy`},
{label:`XG-	North American Airlines`,country:`Mali`},
{label:`XK-	Compagnie Corse Mediterranee`,country:`Bolivia`},
{label:`XM-	Australian Air Express`,country:`United States`},
{label:`XQ-	SunExpress`,country:`Sierra Leone`},
{label:`XR-	Skywest Airlines`,country:`Libya`},
{label:`XX-	Aeronaves del Peru`,country:`Puerto Rico`},
{label:`Y7-	Silverjet Cargo/Flyjet`,country:`Austria`},
{label:`Y9-	Kish Air`,country:`French Polynesia`},
{label:`YI-	Air Sunshine`,country:`Colombia`},
{label:`YK-	Cyprus Turkish Airlines`,country:`Canada`},
{label:`YN-	Air Creebec`,country:`Norway`},
{label:`YP-	Aero Lloyd`,country:`Neth. Antilles`},
{label:`YS-	Regional`,country:`Tonga`},
{label:`YT-	Air Togo`,country:`Russia`},
{label:`YV-	Mesa Airlines`,country:`Russia`},
{label:`YX-	Midwest Airlines`,country:`Ecuador`},
{label:`Z3-	Avient Aviation`,country:`Netherlands`},
{label:`Z6-	Dniproavia`,country:`China PRC`},
{label:`Z7-	Sahara Air Cargo`,country:`Russia`},
{label:`ZB-	Monarch Airlines`,country:`Cyprus`},
{label:`ZE-	Lineas Aereas Azteca`,country:`Spain`},
{label:`ZK-	Great Lakes Aviation Ltd`,country:`Bangladesh`},
{label:`G9-	Air Arabia`,country:`Swaziland`},
{label:`AK-	Air Asia`,country:`United States`},
{label:`D7-	Air Asia X`,country:`Pakistan`},
{label:`TR-	Tiger Airways Cargo`,country:`United Kingdom`},
{label:`D0-	European Airlines`,country:`Vietnam`},
{label:`LP-	Lan Peru`,country:`Latvia`},
{label:`LR-	TACA/LACSA-Lineas Aereas Costarricenses`,country:`United Kingdom`},
{label:`LX-	Swiss WorldCargo`,country:`Netherlands`},
{label:`LZ-	Balkan Bulgarian Airlines`,country:`Germany`},
{label:`M4-	Avioimpex`,country:`South Africa`},
{label:`M8-	AirMax Cargo`,country:`Germany`},
{label:`MA-	Malev Hungarian Airlines`,country:`Guam`},
{label:`ME-	Middle East Airlines`,country:`United Kingdom`},
{label:`MJ-	LAPA Lineas Aereas Privadas Argentinas`,country:`Congo DR`},
{label:`MM-	Sociedad Aeronautica de Medellin (SAM)`,country:`Puerto Rico`},
{label:`MO-	Calm Air International ltd`,country:`Russia`},
{label:`MR-	Air Mauritanie`,country:`United Kingdom`},
{label:`MX-	Mexicana`,country:`United States`},
{label:`MZ-	Merpati Nusantara`,country:`Belgium`},
{label:`N8-	Hong Kong Airlines Ltd`,country:`Canada`},
{label:`NB-	Sterling`,country:`Kazakhstan`},
{label:`NF-	Air Vanuatu`,country:`Canada`},
{label:`NI-	Portugalia Airlines`,country:`Canada`},
{label:`VG-	VLM Airlines`,country:`Bolivia`},
{label:`NL-	Shaheen Air International`,country:`Canada`},
{label:`NN-	Air Martinique`,country:`Sweden`},
{label:`NT-	Binter Canarias`,country:`Israel`},
{label:`NV-	NWT Air`,country:`United States`},
{label:`NX-	Air Macau`,country:`Argentina`},
{label:`OA-	Olympic Airways`,country:`Congo DR`},
{label:`OF-	Air Finland`,country:`Russia`},
{label:`OH-	Comair - Delta Connection`,country:`Libya`},
{label:`OL-	OLT- Ostfriesische Lufttransport GmbH`,country:`Tajikistan`},
{label:`ON-	Our Airline`,country:`Libya`},
{label:`OR-	Crimea Air`,country:`Peru`},
{label:`OU-	Croatia Airlines`,country:`Canada`},
{label:`OX-	Orient Thai Airlines`,country:`Canada`},
{label:`P2-	Tyumenavia`,country:`United States`},
{label:`P5-	AeroRepublica`,country:`China PRC`},
{label:`P7-	Russian Sky Airlines`,country:`Venezuela`},
{label:`PD-	Pemair`,country:`Greece`},
{label:`PG-	Bangkok Airways`,country:`Spain`},
{label:`PI-	Sunflower Airlines`,country:`Belarus`},
{label:`PL-	Aeroperu`,country:`Italy`},
{label:`PT-	West Air Sweden`,country:`Argentina`},
{label:`PU-	PLUNA`,country:`Ecuador`},
{label:`PY-	Surinam Airways`,country:`Sri Lanka`},
{label:`Q3-	Zambian Airways`,country:`Italy`},
{label:`Q7-	Sobelair`,country:`Moldova`},
{label:`QC-	Air Zaire`,country:`United States`},
{label:`QI-	Cimber Sterling`,country:`United States`},
{label:`QL-	Aero Lanka`,country:`Russia`},
{label:`QN-	Air Armenia`,country:`Canada`},
{label:`QQ-	Reno Air`,country:`United States`},
{label:`QT-	Tampa Air Cargo`,country:`Azerbaijan`},
{label:`QW-	Blue Wings`,country:`United States`},
{label:`QY-	European Air Transport`,country:`United Kingdom`},
{label:`R7-	ASERCA Airlines`,country:`Neth. Antilles`},
{label:`RB-	Syrianair`,country:`United States`},
{label:`RF-	Florida West International Airways`,country:`United States`},
{label:`RJ-	Royal Jordanian`,country:`Egypt`},
{label:`RM-	Air Moldova International`,country:`Northern Marianas`},
{label:`RQ-	Swisswings Airlines`,country:`Thailand`},
{label:`RU-	Skyking Airlines`,country:`India`},
{label:`RW-	Republic Airlines`,country:`Argentina`},
{label:`RZ-	SANSA Servicios Aereos Nacionales`,country:`Germany`},
{label:`S2-	Sahara Airlines`,country:`Algeria`},
{label:`S3-	SBA Airlines`,country:`Argentina`},
{label:`S4-	SATA International`,country:`Netherlands`},
{label:`S5-	Shuttle America`,country:`Taiwan ROC`},
{label:`S6-	Air St Martin`,country:`Iceland`},
{label:`S7-	S7 Airlines`,country:`Indonesia`},
{label:`S8-	ELK-Estonian Aviation Company`,country:`Italy`},
{label:`S9-	East African Safari Air`,country:`India`},
{label:`SB-	Air Caledonie International`,country:`United States`},
{label:`SC-	Shandong Airlines`,country:`China PRC`},
{label:`SD-	Sudan Airways`,country:`Canada`},
{label:`SE-	XL Airways France`,country:`Marshall Is`},
{label:`SF-	Tassili Airlines`,country:`India`},
{label:`SG-	Sempati Air`,country:`Panama`},
{label:`SH-	Air Toulouse International`,country:`Russia`},
{label:`SI-	Skynet Airlines`,country:`Georgia`},
{label:`SL-	Rio-Sul Servicos Aereos Regionais SA`,country:`Germany`},
{label:`SM-	Sunworld International Airlines`,country:`United States`},
{label:`SN-	Brussels Cargo`,country:`Germany`},
{label:`SY-	Sun Country Airlines`,country:`Denmark`},
{label:`T2-	Thai Air Cargo`,country:`Dominican Republic`},
{label:`T4-	TransEast Airlines`,country:`Bulgaria`},
{label:`T6-	Tavrey Airlines`,country:`Colombia`},
{label:`TC-	Air Tanzania`,country:`Argentina`},
{label:`TE-	flyLAL - Lithuanian Airlines`,country:`Mexico`},
{label:`TG-	Thai Airways`,country:`Russia`},
{label:`TM-	LAM-Linhas Aereas de Mozambique`,country:`United Kingdom`},
{label:`TO-	President Airlines`,country:`Indonesia`},
{label:`TX-	Air Caraibes`,country:`Canada`},
{label:`TZ-	American Trans Air`,country:`Slovakia`},
{label:`U6-	Ural Airlines`,country:`Russia`},
{label:`UC-	LAN Cargo`},
{label:`UF-	UM Air`},
{label:`UI-	Eurocypria Airlines`},
{label:`UM-	Air Zimbabwe`},
{label:`UP-	Bahamasair`},
{label:`UU-	Air Austral`},
{label:`V2-	Karat`},
{label:`V7-	Air Senegal International`},
{label:`V9-	Bashkir Airlines`},
{label:`VC-	Servivensa-Empresa Servicios Avensa`},
{label:`VE-	Avensa`},
{label:`E3-	Domodedovo Airlines`},
{label:`E5-	Samara Airlines`},
{label:`E7-	Estafeta Carga Aerea`},
{label:`EA-	European Air Express`},
{label:`EC-	Avialeasing`},
{label:`EF-	Far Eastern Air Transport`},
{label:`EI-	Aer Lingus Cargo`},
{label:`EN-	Air Dolomiti SPA`},
{label:`EP-	Iran Aseman Airlines`},
{label:`ES-	DHL/SNAS`},
{label:`EU-	Ecuatoriana Airlines`},
{label:`EW-	Eurowings`},
{label:`EZ-	Evergreen International Airlines`},
{label:`F5-	Cosmic Air`},
{label:`FA-	Safair`},
{label:`FC-	Falcon Express Cargo Airline`},
{label:`FF-	Tower Air`},
{label:`FI-	Icelandair Cargo`},
{label:`FK-	Africa West`},
{label:`FR-	Ryanair`},
{label:`FT-	Fly FTI`},
{label:`FV-	Rossiya Airlines`},
{label:`G3-	Aerochago Airlines`},
{label:`G7-	GoJet Airlines`},
{label:`GC-	Gambia International Airlines`},
{label:`GE-	Transasia Airways`},
{label:`GI-	Air Guinee`},
{label:`GM-	Luxavia/Flitestar/Trek Airways`},
{label:`GR-	Gemini Air Cargo`},
{label:`GU-	TACA/Aviateca`},
{label:`H5-	Magadan Airlines`},
{label:`H8-	Dalavia`},
{label:`HF-	Tuifly`},
{label:`HM-	Air Seychelles`},
{label:`HO-	Antinea Airlines`},
{label:`HR-	Hahn Air`},
{label:`HV-	Transavia Airlines`},
{label:`HY-	Uzbekistan Airways`},
{label:`I9-	Air Italy`},
{label:`IC-	Indian Airlines`},
{label:`IG-	Meridiana`},
{label:`IJ-	TAT European Airlines`},
{label:`IN-	Macedonian Airlines-MAT`},
{label:`IQ-	Augsburg Airways`},
{label:`IV-	Air Gambia`},
{label:`IX-	Flandre Air`},
{label:`J2-	Azerbaijan Airlines`},
{label:`J5-	Aviaprima Sochi Airlines`},
{label:`J8-	Berjaya Air`},
{label:`JB-	Helijet Airways`},
{label:`JG-	Air Greece-Aerodromis`},
{label:`JI-	Jade Cargo International`},
{label:`JK-	Spanair`},
{label:`JM-	Air Jamaica`},
{label:`JO-	JAL Ways`},
{label:`JR-	Aero California`},
{label:`JU-	Jat Airways`},
{label:`JW-	Arrow Cargo`},
{label:`JZ-	Skyways AB`},
{label:`K8-	Kalingrad Air Enterprise`},
{label:`KA-	Dragonair`},
{label:`KH-	Aloha Air Cargo`},
{label:`KK-	Atlasjet`},
{label:`KM-	Air Malta`},
{label:`KO-	Khors Aircompany`},
{label:`KP-	Kiwi International Airlines`},
{label:`KQ-	Kenya Airways`},
{label:`KR-	Kitty Hawk Aircargo`},
{label:`KS-	Penair`},
{label:`KU-	Kuwait Airways`},
{label:`KX-	Cayman Airways`},
{label:`KY-	Air Sao Tome e Principe`},
{label:`KZ-	Linea Aerea`},
{label:`L2-	Lynden Air Cargo`},
{label:`L3-	DHL de Guatemala`},
{label:`L4-	Lauda Air Italy`},
{label:`L6-	Air Maldives`},
{label:`L9-	Air Mali S.A.`},
{label:`LA-	LAN Airlines`},
{label:`LB-	Lloyd Aereo Boliviano (LAB)`},
{label:`LC-	Loganair`},
{label:`LE-	Laparkan Airways`},
{label:`LG-	Luxair`},
{label:`LJ-	Sierra National Airlines`},
{label:`LL-	Lineas Aereas Allegro`},
{label:`LN-	Libyan Airlines`},
{label:`DT-	TAAG Angola Airlines`},
{label:`VI-	Vieques Air Link`},
{label:`VL-	Air VIA Bulgarian Airways`},
{label:`VO-	Tyrolean Airways/Austrian Arrows`},
{label:`VR-	Transportes Aereos de Cabo Verde (TACV)`},
{label:`VT-	Air Tahiti`},
{label:`VV-	AeroSvit Airlines`},
{label:`VX-	ACES-Aerolineas Central de Colombia`},
{label:`W3-	Flyhy Cargo Airlines`},
{label:`W8-	Cargojet Airways`},
{label:`WC-	Islena Airlines`},
{label:`WF-	Wideroe Cargo`},
{label:`WJ-	Air Labrador`},
{label:`WM-	Windward Island Airways`},
{label:`WO-	World Airways`},
{label:`WR-	Royal Tongan Airlines`},
{label:`WX-	Cityjet`},
{label:`X3-	Baikal`},
{label:`XC-	Air Caribbean`},
{label:`XF-	Vladivostok Air`},
{label:`XJ-	Mesaba Aviation`},
{label:`XL-	LAN Ecuador`},
{label:`XO-	Xinjiang Airlines`},
{label:`XT-	KLM Exel`},
{label:`XZ-	South African Express Airways`},
{label:`Y8-	Yangtze River Express Airlines`},
{label:`YC-	Flight West Airlines`},
{label:`YL-	Yamal Airlines`},
{label:`YM-	Montenegro Airlines`},
{label:`YQ-	Polet Cargo Airlines`},
{label:`YU-	Aerolineas Dominicanas`},
{label:`YW-	Air Nostrum LAMSA`},
{label:`Z2-	Styrian Airlines`},
{label:`Z5-	GMG Airlines`},
{label:`Z9-	Aero Zambia`},
{label:`ZC-	Royal Swazi National Airways`},
{label:`ZI-	Aigle Azur Transport Aeriens`},
{label:`AX-	Air Aurora`},
{label:`B2-	Belavia`},
{label:`B4-	Bhoja Airlines`},
{label:`BD-	bmi Cargo`},
{label:`BE-	FlyBE`},
{label:`BG-	Biman Bangladesh Airlines`},
{label:`BL-	Pacific Airlines`},
{label:`BP-	Air Botswana`},
{label:`BT-	Air Baltic`},
{label:`BW-	Caribbean Airlines`},
{label:`BY-	Thomsonfly`},
{label:`C3-	Icar Airlines`},
{label:`C6-	Bright Air`},
{label:`C7-	Special Cargo Airlines`},
{label:`C9-	Cirrus Airlines`},
{label:`CC-	Air Atlanta Icelandic`},
{label:`CE-	Nationwide Air`},
{label:`CJ-	China Northern Airlines`},
{label:`CL-	Lufthansa CityLine`},
{label:`CO-	Continental Airlines`},
{label:`CS-	Continental Micronesia`},
{label:`CU-	Cubana`},
{label:`DP-	First Choice Airways`},
{label:`ZL-	Affretair`},
{label:`ZM-	Scibe Airlift`},
{label:`ZN-	Eagle Airlines`},
{label:`ZP-	Air St Thomas`},
{label:`ZQ-	Ansett New Zealand`},
{label:`ZR-	Aviacon Zitotrans`},
{label:`ZS-	Azzurra Air`},
{label:`ZU-	Helios Airways`},
{label:`ZV-	Air Midwest`},
{label:`ZW-	Air Wisconsin Airlines`},
{label:`ZY-	Ada Air`},
{label:`3V-	TNT Airways`},
{label:`3Z-	Necon Air`},
{label:`4B-	Perimeter Airlines (Inland) Ltd`},
{label:`4D-	Air Sinai`},
{label:`4L-	Air Astana`},
{label:`4N-	Air North`},
{label:`4V-	Voyageur Airways`},
{label:`5C-	CAL Cargo Airlines`},
{label:`5G-	Skyservice`},
{label:`5J-	Cebu Pacific Air`},
{label:`5L-	Aerosur`},
{label:`5N-	Aeroflot-Nord`},
{label:`5T-	Canadian North Cargo`},
{label:`5Z-	Airfreight Express`},
{label:`6B-	Britannia Airways`},
{label:`6F-	Laker Airways`},
{label:`6H-	Israir`},
{label:`6K-	Korsar Airlines`},
{label:`6M-	Maverick Airways`},
{label:`6P-	DAC Air SA`},
{label:`5U-	Lineas Aereas Del Estado`},
{label:`6R-	Georgian Airlines`},
{label:`6V-	Lignes Aeriennes Congolaises - LAC`},
{label:`6Y-	TACA/Nicaraguense de Aviacion`},
{label:`7B-	KrasAir`},
{label:`7D-	Donbassaero`},
{label:`7F-	Air Kufra`},
{label:`7H-	Era Aviation (Alaska Airlines Commuter)`},
{label:`7J-	Tajikair`},
{label:`7M-	Air Atlantique`},
{label:`7Q-	Air Libya`},
{label:`7Z-	Laker Bahamas`},
{label:`8A-	Americana`},
{label:`8D-	Expo Aviation`},
{label:`8P-	Pacific Coastal Airlines Limited`},
{label:`8U-	Afriqiyah Airways`},
{label:`9A-	Air Atlantic`},
{label:`9F-	Haiti Air Freight International`},
{label:`9K-	Cape Air`},
{label:`9M-	Central Mountain Air`},
{label:`9S-	Spring Airlines`},
{label:`9U-	Air Moldova`},
{label:`9V-	Avior Airlines`},
{label:`9Y-	Air Kazakhstan`},
{label:`A3-	Aegean Airlines`},
{label:`A6-	Air Alps`},
{label:`A7-	Air Comet`},
{label:`AG-	Air Contractors`},
{label:`AL-	Transaviaexport Airlines`},
{label:`AO-	Aviaco`},
{label:`AP-	Air One`},
{label:`AS-	Alaska Airlines`},
{label:`AU-	Austral Lineas Aereas`},
{label:`1A-	Leader Jet`},
{label:`2A-	AECA-Aeroservicios Ecuatorianos CA`},
{label:`2B-	ATA Aerocondor Transportes Aereos`},
{label:`2E-	Sky Cabs`},
{label:`2F-	Payam Air`},
{label:`2G-	Cargoitalia`},
{label:`2J-	Air Burkina`},
{label:`2M-	Moldavian Airlines`},
{label:`2P-	Air Philippines`},
{label:`2R-	Regal (Crownair)`},
{label:`2U-	Air Guinee Express`},
{label:`3A-	Alliance Airlines`},
{label:`3D-	Palair Macedonia`},
{label:`3G-	Atlant-Soyuz`},
{label:`3H-	Air Inuit`},
{label:`3J-	Air Alliance Inc`},
{label:`3K-	Everts Air Cargo`},
{label:`3M-	Gulfstream International Airlines`},
{label:`3Q-	Yunnan Airlines`},
{label:`3T-	Turan Air`},
{label:`3U-	Sichuan Airlines`},
{label:`3X-	Premier Trans Aire`},
{label:`6Z-	Panavia Cargo Airlines`},
{label:`7C-	Coyne Airways`},
{label:`7G-	Cargo d'Or`},
{label:`7I-	Insel Air`},
{label:`7L-	Aero Caribbean`},
{label:`7P-	APA International Air`},
{label:`7T-	Trans Am`},
{label:`8C-	Air Transport International`},
{label:`8M-	Myanmar Airways International`},
{label:`8S-	Scorpio Aviation`},
{label:`8V-	Astral Aviation`},
{label:`9J-	Pacific Island Aviation`},
{label:`9L-	Colgan Air`},
{label:`9R-	Phuket Airlines`},
{label:`9T-	Transwest Air`},
{label:`9W-	Jet Airways`},
{label:`A2-	Cielos Airlines`},
{label:`A4-	Southern Winds`},
{label:`A8-	Benin Golf Air`},
{label:`AB-	Air Berlin`},
{label:`AE-	Mandarin Airlines`},
{label:`AH-	Air Algerie`},
{label:`AM-	Aeromexico`},
{label:`AR-	Aerolineas Argentinas`},
{label:`AT-	Royal Air Maroc`},
{label:`AW-	Schreiner Airways`},
{label:`B3-	Bellview Airlines`},
{label:`B7-	UNI Air`},
{label:`BB-	Cargo B`},
{label:`BF-	Bluebird Cargo`},
{label:`BI-	Royal Brunei Airlines`},
{label:`BO-	Bouraq Airlines`},
{label:`BQ-	Aeromar`},
{label:`BV-	Blue Panorama Airlines`},
{label:`BX-	Coast Air AS`},
{label:`BZ-	Blue Dart Aviation`},
{label:`C4-	Click Airways`},
{label:`C8-	Chicago Express Airlines`},
{label:`CD-	Air India Regional`},
{label:`CK-	China Cargo Airlines`},
{label:`CM-	COPA Airlines`},
{label:`CP-	Canadian Airlines International`},
{label:`CT-	Air Sofia`},
{label:`CW-	Air Marshall Islands`},
{label:`CY-	Cyprus Airways`},
{label:`D2-	Skyline NEPC`},
{label:`D3-	Daallo Airlines`},
{label:`D5-	DHL Aero Expreso`},
{label:`D6-	Interair South Africa`},
{label:`D8-	Diamond Sakha Airlines`},
{label:`D9-	Aeroflot-Don`},
{label:`DA-	Air Georgia`},
{label:`DB-	Brit Air`},
{label:`DE-	Condor`},
{label:`DF-	Deer Jet`},
{label:`DG-	Custom Air Transport`},
{label:`DH-	Atlantic Coast Airlines (United Express)`},
{label:`DI-	dba`},
{label:`DJ-	Virgin Blue`},
{label:`DK-	MyTravel Airways`},
{label:`DM-	Maersk Air Cargo`},
{label:`DO-	Dominicana de Aviacion`},
{label:`DQ-	Coastal Air Transport`},
{label:`DU-	Hemus Air`},
{label:`DY-	Norwegian Air Shuttle`},
{label:`4C-	Aires Colombia (Aerovias de Integracion)`},
{label:`4G-	Shenzhen Airlines`},
{label:`4M-	LAN Argentina`},
{label:`4Z-	Airlink`},
{label:`5D-	Aerolitoral`},
{label:`5K-	State Air Company Odessa Airlines`},
{label:`5M-	Sibavia`},
{label:`5S-	Global Aviation and Services`},
{label:`5W-	Astraeus`},
{label:`6A-	AVIACSA- Consorcio Aviaxsa SA de CV`},
{label:`6D-	Pelita Air Service`},
{label:`6G-	Gabon Airlines Cargo`},
{label:`6L-	Aklak Inc`},
{label:`6N-	Trans Travel Airlines`},
{label:`6Q-	Slovak Airlines`},
{label:`6U-	Air Ukraine`},
{label:`6W-	Saravia`},
]


export const countryOption = [
  {
    "name": "Afghanistan",
    "id": 1
  },
  {
    "name": "Albania",
    "id": 3
  },
  {
    "name": "Algeria",
    "id": 4
  },
  {
    "name": "Andorra",
    "id": 6
  },
  {
    "name": "Angola",
    "id": 7
  },
  {
    "name": "Antigua and Barbuda",
    "id": 10
  },
  {
    "name": "Argentina",
    "id": 11
  },
  {
    "name": "Armenia",
    "id": 12
  },
  {
    "name": "Australia",
    "id": 14
  },
  {
    "name": "Austria",
    "id": 15
  },
  {
    "name": "Azerbaijan",
    "id": 16
  },
  {
    "name": "The Bahamas",
    "id": 17
  },
  {
    "name": "Bahrain",
    "id": 18
  },
  {
    "name": "Bangladesh",
    "id": 19
  },
  {
    "name": "Barbados",
    "id": 20
  },
  {
    "name": "Belarus",
    "id": 21
  },
  {
    "name": "Belgium",
    "id": 22
  },
  {
    "name": "Belize",
    "id": 23
  },
  {
    "name": "Benin",
    "id": 24
  },
  {
    "name": "Bhutan",
    "id": 26
  },
  {
    "name": "Bolivia",
    "id": 27
  },
  {
    "name": "Bosnia and Herzegovina",
    "id": 28
  },
  {
    "name": "Botswana",
    "id": 29
  },
  {
    "name": "Brazil",
    "id": 31
  },
  {
    "name": "Brunei",
    "id": 33
  },
  {
    "name": "Bulgaria",
    "id": 34
  },
  {
    "name": "Burkina Faso",
    "id": 35
  },
  {
    "name": "Burundi",
    "id": 36
  },
  {
    "name": "Cambodia",
    "id": 37
  },
  {
    "name": "Cameroon",
    "id": 38
  },
  {
    "name": "Canada",
    "id": 39
  },
  {
    "name": "Cape Verde",
    "id": 40
  },
  {
    "name": "Central African Republic",
    "id": 42
  },
  {
    "name": "Chad",
    "id": 43
  },
  {
    "name": "Chile",
    "id": 44
  },
  {
    "name": "China",
    "id": 45
  },
  {
    "name": "Colombia",
    "id": 48
  },
  {
    "name": "Comoros",
    "id": 49
  },
  {
    "name": "Congo",
    "id": 50
  },
  {
    "name": "Democratic Republic of the Congo",
    "id": 51
  },
  {
    "name": "Cook Islands",
    "id": 52
  },
  {
    "name": "Costa Rica",
    "id": 53
  },
  {
    "name": "Croatia",
    "id": 55
  },
  {
    "name": "Cuba",
    "id": 56
  },
  {
    "name": "Cyprus",
    "id": 57
  },
  {
    "name": "Czech Republic",
    "id": 58
  },
  {
    "name": "Denmark",
    "id": 59
  },
  {
    "name": "Djibouti",
    "id": 60
  },
  {
    "name": "Dominica",
    "id": 61
  },
  {
    "name": "Dominican Republic",
    "id": 62
  },
  {
    "name": "Timor-Leste",
    "id": 63
  },
  {
    "name": "Ecuador",
    "id": 64
  },
  {
    "name": "Egypt",
    "id": 65
  },
  {
    "name": "El Salvador",
    "id": 66
  },
  {
    "name": "Equatorial Guinea",
    "id": 67
  },
  {
    "name": "Eritrea",
    "id": 68
  },
  {
    "name": "Estonia",
    "id": 69
  },
  {
    "name": "Ethiopia",
    "id": 70
  },
  {
    "name": "Fiji Islands",
    "id": 73
  },
  {
    "name": "Finland",
    "id": 74
  },
  {
    "name": "France",
    "id": 75
  },
  {
    "name": "Gabon",
    "id": 79
  },
  {
    "name": "Gambia The",
    "id": 80
  },
  {
    "name": "Georgia",
    "id": 81
  },
  {
    "name": "Germany",
    "id": 82
  },
  {
    "name": "Ghana",
    "id": 83
  },
  {
    "name": "Greece",
    "id": 85
  },
  {
    "name": "Grenada",
    "id": 87
  },
  {
    "name": "Guatemala",
    "id": 90
  },
  {
    "name": "Guinea",
    "id": 92
  },
  {
    "name": "Guinea-Bissau",
    "id": 93
  },
  {
    "name": "Guyana",
    "id": 94
  },
  {
    "name": "Haiti",
    "id": 95
  },
  {
    "name": "Honduras",
    "id": 97
  },
  {
    "name": "Hong Kong S.A.R.",
    "id": 98
  },
  {
    "name": "Hungary",
    "id": 99
  },
  {
    "name": "Iceland",
    "id": 100
  },
  {
    "name": "India",
    "id": 101
  },
  {
    "name": "Indonesia",
    "id": 102
  },
  {
    "name": "Iran",
    "id": 103
  },
  {
    "name": "Iraq",
    "id": 104
  },
  {
    "name": "Ireland",
    "id": 105
  },
  {
    "name": "Israel",
    "id": 106
  },
  {
    "name": "Italy",
    "id": 107
  },
  {
    "name": "Jamaica",
    "id": 108
  },
  {
    "name": "Japan",
    "id": 109
  },
  {
    "name": "Jersey",
    "id": 110
  },
  {
    "name": "Jordan",
    "id": 111
  },
  {
    "name": "Libya",
    "id": 124
  },
  {
    "name": "Peru",
    "id": 173
  },
  {
    "name": "Kazakhstan",
    "id": 112
  },
  {
    "name": "Kenya",
    "id": 113
  },
  {
    "name": "Kiribati",
    "id": 114
  },
  {
    "name": "North Korea",
    "id": 115
  },
  {
    "name": "South Korea",
    "id": 116
  },
  {
    "name": "Kuwait",
    "id": 117
  },
  {
    "name": "Kyrgyzstan",
    "id": 118
  },
  {
    "name": "Laos",
    "id": 119
  },
  {
    "name": "Latvia",
    "id": 120
  },
  {
    "name": "Lebanon",
    "id": 121
  }
]