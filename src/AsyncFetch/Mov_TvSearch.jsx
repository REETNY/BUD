import MovieApi from "../Apis/MovieApi";

export default async function Mov_TvSearch(queryKey){
    let type = queryKey[1].toLowerCase();
    let pageNum = queryKey[3];
    let keySearch = queryKey[2];
    
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZDQxMmEzM2Y3ZGM2YjZlNGYxYzhlNGEyYWI4YWRhNCIsInN1YiI6IjYzYTk3ZjI2ZWRhNGI3MDBkNzY3MWM5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aaQDnk3-5VSEXMcuUlZa1Bgxq6c3CTUmJ0tvqEzC3Wg'
        }
    };

    let url = `/search/${type}?query=${keySearch}&include_adult=false&language=en-US&page=${pageNum}`;

    try{
        let res = await MovieApi.get(url, options);
        let rep = res.data;
        let con = rep.results;
        let fetchedData = {
            fetched: con,
            totalPage: rep.total_pages
        }
        return (fetchedData);
    }catch(err){
        return err
    }
}