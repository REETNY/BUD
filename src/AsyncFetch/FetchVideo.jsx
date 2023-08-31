import MovieApi from "../Apis/MovieApi";


export default async function FetchVideo(queryKey){
    
    let type = queryKey[1];
    let id = queryKey[2];

    const options = {
        method: 'GET',
        headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZDQxMmEzM2Y3ZGM2YjZlNGYxYzhlNGEyYWI4YWRhNCIsInN1YiI6IjYzYTk3ZjI2ZWRhNGI3MDBkNzY3MWM5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aaQDnk3-5VSEXMcuUlZa1Bgxq6c3CTUmJ0tvqEzC3Wg'
        }
    };

    let url = `/${type}/${id}/videos?language=en-US`;

    try{
        let res = await MovieApi.get(url, options);
        let rep = res.data;
        return rep
    }catch(err){
        return err
    }
}

