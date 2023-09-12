import RanMangaApi from "../Apis/RanMangaApi";

export default async function MangaFetch(queryKey){
    let alphab = queryKey[1];
    let pageNum = queryKey[2];
    try{
        let res = await RanMangaApi.get(`/manga?letter=${alphab}&page=${pageNum}`);
        // let res = await RanMangaApi.get(`https://api.jikan.moe/v4/man`)
        let rep = res.data;
        let myData = rep.data;

        let arrData = {
            fetch: myData,
            totalItem: (res.data.pagination.items.total)
        }
        return arrData
    }catch(err){
        return err
    }
}