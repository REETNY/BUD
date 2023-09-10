import React from 'react';
import { useQuery, QueryCache } from '@tanstack/react-query';
import MovieFetch from '../AsyncFetch/MovieFetch';
import { useSearchParams, useLocation } from 'react-router-dom';
import Anime_MangaHeader from '../Headers/Anime_MangaHeader';
import MovieData from '../Components/MovieData';
import LoadingAnimation from '../Externals/LoadingAnimation';
import Error from '../Components/Error';

const Movies = () => {

    let title = document.getElementsByTagName("title");
    title[0].textContent = `BUD/Movies`;

    let [SP, setSP] = useSearchParams();

    let locationData = useLocation();
    let {pathname, search} = locationData;
    let backRoute = `${pathname+search}`;

    let pageNum = SP.get("page") != undefined ? SP.get("page") : 1;
    let movType = SP.get("type") != undefined ? SP.get("type") :"popular";

    function genSearchParams(key, val){
        let param = new URLSearchParams(SP);

        if(key == "type"){
            param.delete("page");
        }

        if(!key || key == null){
            param.delete(key)
        }else{
            param.set(key, val)
            setSP(() => param.toString())
        }
    }

    const fetchMovies = useQuery({
        queryKey: ["moviesFetch", `${pageNum}`, `${movType}`],
        queryFn: async({queryKey}) => {
            return await MovieFetch(queryKey)
        }
    })

    let mappedMovie = [];

    if(fetchMovies.data && fetchMovies.data.stack == undefined){
        mappedMovie = fetchMovies.data.fetch.map((item, index) => {
            return(<MovieData itemNo={index+1} backUrl={backRoute} fetched={item} key={index} />)
        })
    }

    if(fetchMovies.data && fetchMovies.data.stack == undefined ) return (
    <section className="myMoviesSect">
        <Anime_MangaHeader oth1={500} currPage={pageNum} oth2={1} newDataFunc={genSearchParams} />
        
        <header className="forMoviesOnly">
            <ul className="moviesType">
                <li onClick={() => {
                    genSearchParams("type", "popular");

                }} style={movType == "popular" ? {background : "#800080"} : {}} className="movFilter">Popular</li>
                <li onClick={() => {
                    genSearchParams("type", "top-rated");
                }} style={movType == "top-rated" ? {background : "#800080"} : {}} className="movFilter">Top Rated</li>
                <li onClick={() => {
                    genSearchParams("type", "upcoming");
                }} style={movType == "upcoming" ? {background : "#800080"} : {}} className="movFilter">Upcoming</li>
            </ul>
        </header>

        <section className="renderData">
            {mappedMovie}
        </section>

    </section>
  )

  if(fetchMovies.data?.stack != undefined || fetchMovies.data?.componentStack != undefined){
    return (<Error errorData={fetchMovies.data} rf={`${backRoute}`} />)
  }

  if(fetchMovies.isFetching && mappedMovie.length == 0)return (<LoadingAnimation />)
}

export default Movies























//const APIKEY = `0d412a33f7dc6b6e4f1c8e4a2ab8ada4`;
// const APIURL = `https://api.themoviedb.org/3/movie/popular?api_key=`;
// const imgPath = `https://image.tmdb.org/t/p/w500`;