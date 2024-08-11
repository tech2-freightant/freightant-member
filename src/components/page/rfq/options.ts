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
  }
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
      "range": ""
    },
    {
      "label": "Animal & Animal Products",
      "range": "01-05",
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
      "range": "06-14",
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
      "range": "15-15",
      children:[
        {range:15,label:`Animals or Vegetable Fats and Oils and their Cleavage Products; Prepared Edible Fats; Animal or Vegetable Waxes`}
      ]
    },
    {
      "label": "Foodstuffs, Beverages and Tobacco",
      "range": "16-24",
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
      "range": "25-27",
      children:[
        {range:25,label:`Salt; Sulphur; Earths and Stone; Plastering Materials, Lime and Cement`},
        {range:26,label:`Ores, Slag and Ash`},
        {range:27,label:`Mineral Fuels, Mineral Oils and Products of their Distillation; Bituminous Substances; Mineral Waxes`},
      ]
    },
    {
      "label": "Chemicals & Allied Industries",
      "range": "28-38",
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
      "range": "39-40",
      children:[
        {range:39,label:`Plastics and Articles thereof`},
        {range:40,label:`Rubber and Articles thereof`},
      ]
    },
    {
      "label": "Raw Hides, Skins, Leather, & Furs",
      "range": "41-43",
      children:[
        {range:41,label:`Raw Hides and Skins (Other than Furskins) and Leather`},
        {range:42,label:`Articles of Leather; Saddlery and Harness; Travel Goods, Handbags and similar containers; Articles of Animal Gut (other than Silk-worm Gut)`},
        {range:43,label:`Furskins and Artificial Fur; Manufactures thereof`},
      ]
    },
    {
      "label": "Wood & Wood Products",
      "range": "44-46",
      children:[
        {range:44, label:`Wood and Articles of Wood; Wood Charcoal`},
        {range:45, label:`Cork and Articles of Cork`},
        {range:46, label:`Manufactures of Straw, of Esparto or of other Plaiting Materials; Basketware And Wickerwork`},
      ]
    },
    {
      "label": "Pulp of Wood and Fibrous Material",
      "range": "47-49",
      children:[
        {range:47, label:`Pulp of Wood or of other Fibrous Cellulosic Material; Recovered (Waste and Scrap) Paper or Paperboard`},
        {range:48, label:`Paper and Paperboard; Article of Paper Pulp, of Paper or of Paperboard Currency Paper (Water-mark Bank Note Paper)`},
        {range:49, label:`Printed Books, Newspapers, Pictures and other Products of the Printing Industry; Manuscripts, Typescripts and Plans`},
      ]
    },
    {
      "label": "Textiles",
      "range": "50-63",
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
      "range": "64-67",
      children:[
        {range:64,label:`Footwear, Gaiters and the Like; Parts of such Articles`},
        {range:65,label:`Headgear and Parts Thereof`},
        {range:66,label:`Umbrellas, Sun Umbrellas, Walking-sticks, Seat-sticks, Whips, Riding-crops, and Parts Thereof`},
        {range:67,label:`Prepared Feathers and Down and Articles Made of Feathers or of Down; Artificial Flowers; Articles of Human Hair`},
      ]
    },
    {
      "label": "Stone/Glass",
      "range": "68-70",
      children:[
        {range:68,label:`Articles of Stone, Plaster, Cement, Asbestos, Mica or Similar Materials`},
        {range:69,label:`Ceramic Products`},
        {range:70,label:`Glass and Glassware`},
      ]
    },
    {
      "label": "Precious Stone, Metal, Pearls and Coins",
      "range": "71-71",
      children:[
        {range:71,label:`Natural or Cultured Pearls, Precious or Semi-precious Stones, Precious Metals, Metals Clad with Precious Metal, and Articles thereof; Imitation Jewellery; Coin`}
      ]
    },
    {
      "label": "Base Metals",
      "range": "72-83",
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
      "range": "84-85",
      children:[
        {range:84, label:`Nuclear Reactors, Boilers, Machinery and Mechanical Appliances; Parts thereof`},
        {range:85, label:`Electrical Machinery and Equipment and Parts Thereof; Sound Recorders and Reproducers, Television Image and Sound Recorders and Reproducers, and Parts and Accessories of Such Articles`},
      ]
    },
    {
      "label": "Vehicles",
      "range": "86-89",
      children:[
        {range:86,label:`Railway or tramway locomotives, rolling-stock and parts thereof; rail-way or tramway track fixtures and fittings and parts thereof; mechanical (including electro-mechanical) traffic ignaling equipment of all kinds`},
        {range:87,label:`Vehicles other than Railway or Tramway Rolling-stock, and Parts and Accessories thereof`},
        {range:88,label:`For Aircraft, Spacecraft and Parts thereof`},
        {range:89,label:`Ships, Boats and Floating Structures`},
      ]
    },
    {
      "label": "Precision Instruments",
      "range": "90-92",
      children:[
        {range:90, label:`Optical, photographic, cinematographic, measuring, checking, precision, medical or surgical instruments and apparatus; parts and accessories thereof`},
        {range:91, label:`Clocks and Watches and parts thereof`},
        {range:92, label:`Musical Instruments Parts and Accessories of such articles`},
      ]
    },
    {
      "label": "Arms and Ammunition",
      "range": "93-93",
      children:[
        {range:93,label:`For Arms and Ammunition; Parts and Accessories thereof`}
      ]
    },
    {
      "label": "Miscellaneous Manufactured Articles",
      "range": "94-96",
      children:[
        {range:94, label:`Furniture; Bedding, Mattresses, Mattress Supports, Cushions and similar stuffed furnishings; Lamps and Lighting Fittings, not elsewhere specified or included; Illuminated signs, Illuminated name-plates and the like; Prefabricated Building`},
        {range:95, label:`Toys, Games and Sports Requisites; Parts and Accessories thereof`},
        {range:96, label:`Miscellaneous Manufactured Articles`},
      ]
    },
    {
      "label": "Works of Art",
      "range": "97-97",
      children:[
        {range:97,label:`Works of Art, Collectors’ Pieces and Antiques`}
      ]
    },
    {
      "label": "Unique US National HS Codes",
      "range": "98-99",
      children:[
        {range:98,	label:`Project Imports; Laboratory Chemicals; Passengers’ Baggage; Personal Importations by Air or Post; Ship Stores`}
      ]
    }
  ]
export const packageTypeOptions = [strings.totalCargo, strings.perPackage]

export const DimsOptions = ["MM","CM","METER","INCH","FT"]
export const WeightOptions = ["KG","TON"]


