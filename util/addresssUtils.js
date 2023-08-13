export function formatWideAddress(address){
    const { street, barangay, cityOrMunicipality, province } = address;
    var formattedAddress = "";
    
    if(street){formattedAddress += `${street}, `;}
    if(barangay){formattedAddress += `${barangay}, `;}
    if(cityOrMunicipality){formattedAddress += `${cityOrMunicipality}, `;}
    if(province){formattedAddress += `${province}`;}

    return formattedAddress;
}