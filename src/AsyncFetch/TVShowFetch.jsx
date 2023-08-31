import MovieApi from "../Apis/MovieApi";

export default async function TVShowFetch(queryKey){
    
    let pageNum = queryKey[1];
    let tvType = queryKey[2];

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZDQxMmEzM2Y3ZGM2YjZlNGYxYzhlNGEyYWI4YWRhNCIsInN1YiI6IjYzYTk3ZjI2ZWRhNGI3MDBkNzY3MWM5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aaQDnk3-5VSEXMcuUlZa1Bgxq6c3CTUmJ0tvqEzC3Wg'
        }
    };

    let populatUrl = `/tv/popular?language=en-US&page=${pageNum}`;
    let topRatedUrl = `/tv/top_rated?language=en-US&page=${pageNum}`;
    let airingTodayUrl = `/tv/airing_today?language=en-US&page=${pageNum}`;


    let curentUrl = "";

    if(tvType == "popular"){
        curentUrl = populatUrl;
    }else if(tvType == "top-rated"){
        curentUrl = topRatedUrl
    }else{
        curentUrl = airingTodayUrl;
    }

    try{
        let res =await MovieApi.get(`${curentUrl}`, options);
        // let res =await MovieApi.get(`$hs`, options);
        let rep = res.data;
        let myData = rep.results;
        let myArr = {
            fetch: myData,
            totalItems: rep.total_pages
        }
        return (myArr)
    }catch(err){
        return err
    }

}