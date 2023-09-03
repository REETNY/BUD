import MovieApi from "../Apis/MovieApi";

export default async function MovieFetch(queryKey){

    let pageNum = queryKey[1];
    let movType = queryKey[2];

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZDQxMmEzM2Y3ZGM2YjZlNGYxYzhlNGEyYWI4YWRhNCIsInN1YiI6IjYzYTk3ZjI2ZWRhNGI3MDBkNzY3MWM5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aaQDnk3-5VSEXMcuUlZa1Bgxq6c3CTUmJ0tvqEzC3Wg'
        }
    };

    let popularUrl = `/movie/popular?language=en-US&page=${pageNum}`;
    let topRatedUrl = `/movie/top_rated?language=en-US&page=${pageNum}`;
    let upComingUrl = `/movie/upcoming?language=en-US&page=${pageNum}`;

    let currentUrl = "";

    if(movType == "popular"){
        currentUrl = popularUrl;
    }else if(movType == "top-rated"){
        currentUrl = topRatedUrl;
    }else{
        currentUrl = upComingUrl;
    }

    const APIKEY = `0d412a33f7dc6b6e4f1c8e4a2ab8ada4`;
    try{
        let res = await MovieApi.get(`${currentUrl}`, options);
        // let res = await MovieApi.get(`hwh`, options);
        let rep = res.data;
        let myData = rep.results;
        let arrData = {
            fetch: myData,
            totalItem: (rep.total_pages)
        }
        return arrData;
    }catch(err){
        return err
    }
}