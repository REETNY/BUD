import DataIdApi from "../Apis/DataIdApi";

export default async function fetchUserData2(queryKey){
    
    let urlA = `/anime/{id}/full`;
    let urlM = `/v4/manga/{id}/full`;

    let animeID = queryKey[1];
    let mangaID = queryKey[2];

    function delay(val){
        return new Promise((resolve) => setTimeout(resolve, val));
    }

    let requestManga = await Promise.all(mangaID.map( async(item) => {
        await delay(1500);
        let res = await DataIdApi.get(`/manga/${item.id}/full`);
        let rep = res.data;
        let ret = {...rep.data, for: item.type, as: item.as};
        return ret
    }))

    let requestAnime = await Promise.all(animeID.map(async (item) => {
        await delay(1500);
        let res = await DataIdApi.get(`/anime/${item.id}/full`);
        let rep = res.data;
        let ret = {...rep.data, for: item.type, as: item.as};
        return ret
    }))

    let requestedData = {
        AMD: requestAnime,
        MMD: requestManga 
    }

    return requestedData;

}