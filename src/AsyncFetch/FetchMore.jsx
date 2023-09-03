import MovieApi from "../Apis/MovieApi";
import IPAPI from "../Apis/IPAPI";
import LocateAPI from "../Apis/LocateAPI";

async function getIP(){
    return IPAPI.get();
}

async function delay(val){
    return new Promise((resolve) => setTimeout(resolve, val))
}

export default async function FetchMore(queryKey){
    let type = queryKey[2];
    let id = queryKey[1];

    let Credit = `/${type}/${id}/credits?language=en-US`;
    let OthImgs = `/${type}/${id}/images`;
    let Similar = `/${type}/${id}/similar?language=en-US&page=1`;
    let Reviews = `/${type}/${id}/reviews?language=en-US&page=1`;
    let WatchProvider = `/${type}/${id}/watch/providers`;
    let ReleaseDate = `/${type}/${id}/release_dates`;
    let ContentRating = `/${type}/${id}/content_ratings`;

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZDQxMmEzM2Y3ZGM2YjZlNGYxYzhlNGEyYWI4YWRhNCIsInN1YiI6IjYzYTk3ZjI2ZWRhNGI3MDBkNzY3MWM5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aaQDnk3-5VSEXMcuUlZa1Bgxq6c3CTUmJ0tvqEzC3Wg'
        }
    };


    try{

        let IP = await IPAPI();
        let IPD = IP.data;

        let res0 = await LocateAPI.get(`/${IPD.ipString}?access_key=0881d4bf37230e966329baa6316c557e&format=1`);
        let rep0 = res0.data;
        await delay(2500);

        let res1 = await MovieApi.get(Credit, options);
        let rep1 = res1?.data;
        
        let res2 = await MovieApi.get(OthImgs, options);
        let rep2 = res2?.data;

        let res3 = await MovieApi.get(Similar, options);
        let rep3 = res3?.data;

        let res4 = await MovieApi.get(Reviews, options);
        let rep4 = res4?.data;

        let res5 = await MovieApi.get(WatchProvider, options);
        let rep5 = res5?.data;

        let res6 = type == "movie" ? await MovieApi.get(ReleaseDate, options) : "";
        let rep6 = res6?.data;

        console.log(rep6);

        let res7 = type == "tv" ? await MovieApi.get(ContentRating, options) : "";
        let rep7 = res7?.data;

        let fetchedData = {
            creditsData: rep1,
            otherImages: rep2,
            releaseDate: rep6,
            contentRating: rep7,
            similar: rep3,
            reviews: rep4,
            watchProvide: rep5,
            CR: rep6?.results?.filter((item) => {
                let CC = rep0.country_code;
                return item.iso_3166_1 == CC ? item : false;
            }),
            geoDatas: rep0
        }

        return fetchedData
    }catch(err){
        return err
    }
}
  