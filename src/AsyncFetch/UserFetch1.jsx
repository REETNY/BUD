import MovieApi from "../Apis/MovieApi";

export default async function fetchUserData(queryKey){

    let moviesID = queryKey[1];
    let seriesID = queryKey[2];

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZDQxMmEzM2Y3ZGM2YjZlNGYxYzhlNGEyYWI4YWRhNCIsInN1YiI6IjYzYTk3ZjI2ZWRhNGI3MDBkNzY3MWM5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aaQDnk3-5VSEXMcuUlZa1Bgxq6c3CTUmJ0tvqEzC3Wg'
        }
    };

    let urlS = `/tv/series_id?language=en-US`;
    let urlM = `/movie/movie_id?language=en-US`;

    let fetchUserData = await Promise.all(moviesID.map( async(item) => {
        let res = await MovieApi.get(`/movie/${item.id}?language=en-US`, options);
        let rep = res.data;
        let ret = {...rep, for: item.type, as: item.as}
        return ret
    }))

    let fetchUserData2 = await Promise.all(seriesID.map( async(item) => {
        let res = await MovieApi.get(`/tv/${item.id}?language=en-US`, options);
        let rep = res.data;
        let ret = {...rep, for: item.type, as: item.as}
        return ret
    }))

    
    let fulReq = {
        MD: fetchUserData,
        TD: fetchUserData2
    }

    return fulReq


}