import DataIdApi from "../Apis/DataIdApi";



export default async function getDataById(queryKey){
    let type = queryKey[1];
    let id = queryKey[2];
    try{
        let res = await DataIdApi.get(`/${type}/${id}/full`);
        // let res = await DataIdApi.get(`wefet536`);
        let rep = res.data;
        let fetched = rep.data
        return fetched
    }catch(err){
        return err
    }
}