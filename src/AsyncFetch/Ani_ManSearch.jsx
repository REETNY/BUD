import RanAnimeApi from "../Apis/RanAnimeApi";


export default async function Ani_ManSearch(queryKey){

    let type = queryKey[1].toLowerCase();
    let page = queryKey[3];
    let keySearch = queryKey[2];

    try{
        let res = await RanAnimeApi.get(`/${type}?q=${keySearch}&page=${page}`);
        let rep = res.data;
        let con = rep.data;
        let dataRet = {
            fetched: con,
            totalPage: rep.pagination.last_visible_page
        }
        return(dataRet);
    }catch(err){
        return err
    }
}