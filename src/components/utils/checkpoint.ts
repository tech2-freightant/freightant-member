export const CheckpointCheck=(value:any)=>{
    let cp = [false,false,false]
    if(value.mtoMultimodalTransportLicense?.status||
    value.iata?.status||
    value.fiata?.status||
    value.fmcFreightForwarder?.status||
    value.nvooc?.status){
        cp[0] = true
    }

    if(value.customsAssociationMembership?.status||
    value.chamberOfCommerceTradeAssociation?.status||
    value.wca?.status||
    value.jctrans?.status){
        cp[1] = true
    }
    
    if(value.customLicense?.status||
    value.aeo?.status||
    value.dgHaz?.status||
    value.tapa?.status||
    value.basc?.status||
    value.ctpat?.status||
    value.iso9001?.status){
        cp[2] = true
    }
    if(cp[0] && cp[1]&& cp[2]){
        return {result:true}
    }
    return {result:false,cp};
}