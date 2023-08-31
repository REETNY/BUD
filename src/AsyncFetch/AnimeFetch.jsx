import RanAnimeApi from "../Apis/RanAnimeApi";

export default async function AnimeFetch(queryKey){
    let IPP = 12;
    let alphab = queryKey[1];
    let pageNum = queryKey[2];
    try{
        let res = await RanAnimeApi.get(`/anime?letter=${alphab}&page=${pageNum}`);
        // let res = await RanAnimeApi.get(`https://api.jikan.moe/v4/man`)
        let rep = res.data;
        let myData = rep.data;

        let arrData = {
            fetch: myData,
            totalItem: (res.data.pagination.items.total)
        }
        return arrData
    }catch(err){
        // console.log(err)
        return err
    }
}