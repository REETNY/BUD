import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import fetchUserData from '../AsyncFetch/UserFetch1';
import { useLocation } from 'react-router-dom';
import fetchUserData2 from '../AsyncFetch/FetchUserData2';
import EachData from '../Components/EachData';
import EachData2 from '../Components/EachData2';
import MovieData from '../Components/MovieData';
import TVShowData from '../Components/TVShowData';
import Lottie from "lottie-react";
import SandAnimation from "../Externals/sand_clock.json";

const UserIndex = () => {

    let [refresh, setRefresh] = useState(0)

    let likedData = JSON.parse(localStorage.getItem("likedData")) || [];
    let watchData = JSON.parse(localStorage.getItem("watchLater")) || [];

    let locate = useLocation();

    let currentRoute = `${locate.pathname}${locate.search}`;

    let animeIDS = [];
    let mangaIDS = [];
    let moviesIDS = [];
    let tv_seriesIDS = [];

    animeIDS = [...animeIDS, ...likedData.filter((item) => item.as == "anime" ? item : false)];
    animeIDS = [...animeIDS, ...watchData.filter((item) => item.as == "anime" ? item : false)];

    mangaIDS = [...mangaIDS, ...likedData.filter((item) => item.as == "manga" ? item : false)];
    mangaIDS = [...mangaIDS, ...watchData.filter((item) => item.as == "manga" ? item : false)];

    moviesIDS = [...moviesIDS, ...likedData.filter((item) => item.as == "movies" ? item : false)];
    moviesIDS = [...moviesIDS, ...watchData.filter((item) => item.as == "movies" ? item : false)];

    tv_seriesIDS = [...tv_seriesIDS, ...likedData.filter((item) => item.as == "tv/series" ? item : false)];
    tv_seriesIDS = [...tv_seriesIDS, ...watchData.filter((item) => item.as == "tv/series" ? item : false)];

    function refreshTab(){
        setRefresh((val) => val+1);
    }

    const jikanType = useQuery({
        queryKey: ["jikanType", animeIDS, mangaIDS],
        queryFn: async({queryKey}) => {
           return await fetchUserData2(queryKey)
        }
    })

    const tmdbType = useQuery({
        queryKey: ["imdbType", moviesIDS, tv_seriesIDS],
        queryFn: async({queryKey}) => {
           return await fetchUserData(queryKey)
        }
    })

    let likedAnime = [];
    let watchAnime = [];

    let likedManga = [];

    let likedMovies = [];
    let watchMovies = [];

    let likedSeries = [];
    let watchSeries = [];

    if(jikanType.data && jikanType?.data?.componentStack == undefined && jikanType?.data?.stack == undefined){
        
        watchAnime = jikanType.data.AMD.map((item, index) => {
            return item.for == "watch" && <EachData forUser={refreshTab} key={index} fetched={item} prevLink={currentRoute} itemNo={index+1} />
        })

        likedAnime = jikanType.data.AMD.map((item, index) => {
            return item.for == "liked" && <EachData forUser={refreshTab} key={index} fetched={item} prevLink={currentRoute} itemNo={index+1} />
        })

        likedManga = jikanType.data.MMD.map((item, index) => {
            return item.for == "liked" && <EachData2 forUser={refreshTab} key={index} fetched={item} prevUrl={currentRoute} itemNo={index+1} />
        })
    }

    if(tmdbType.data && tmdbType?.data?.componentStack == undefined && tmdbType?.data?.stack == undefined){
        likedMovies = tmdbType.data.MD.map((item, index) => {
            return item.for == "liked" && <MovieData forUser={refreshTab} fetched={item} key={index} backUrl={currentRoute} itemNo={index+1} />
        })
        watchMovies = tmdbType.data.MD.map((item, index) => {
            return item.for == "watch" && <MovieData forUser={refreshTab} fetched={item} key={index} backUrl={currentRoute} itemNo={index+2} />
        })

        likedSeries = tmdbType.data.TD.map((item, index) => {
            return item.for == "liked" && <TVShowData forUser={refreshTab} fetched={item} key={index} prevLink={currentRoute} itemNo={index+1} />
        })

        watchSeries = tmdbType.data.TD.map((item, index) => {
            return item.for == "watch" && <TVShowData forUser={refreshTab} fetched={item} key={index} prevLink={currentRoute} itemNo={index+2} />
        })
    }



  if(jikanType.data && jikanType?.data?.componentStack == undefined && jikanType?.data?.stack == undefined && tmdbType.data && tmdbType?.data?.componentStack == undefined && tmdbType?.data?.stack == undefined){
    return (
        <section className="allUserData">
            {/* liked */}
            <div className="eachDataForm">
                <div className="dataFormHead" style={{color: "#1DA1F2"}}>Liked</div>
    
                <section className="eachFormBox">
    
                    <div className="boxesXont">
                        <div className="xontHead" style={{color: "white"}}>Anime</div>
                        <div className="renderData">{likedAnime}</div>
                    </div>
    
                    <div className="boxesXont">
                        <div className="xontHead" style={{color: "white"}}>Manga</div>
                        <div className="renderData">{likedManga}</div>
                    </div>
    
                    <div className="boxesXont">
                        <div className="xontHead" style={{color: "white"}}>Movies</div>
                        <div className="renderData">{likedMovies}</div>
                    </div>
    
                    <div className="boxesXont">
                        <div className="xontHead" style={{color: "white"}}>Tv/Series</div>
                        <div className="renderData">{likedSeries}</div>
                    </div>
    
                </section>
            </div>
            {/* watch */}
            <div className="eachDataForm">
                <div className="dataFormHead" style={{color: "rgb(245, 24, 91)"}}>Watch</div>
    
                <section className="eachFormBox">
    
                    <div className="boxesXont">
                        <div className="xontHead" style={{color: "white"}}>Anime</div>
                        <div className="renderData">{watchAnime}</div>
                    </div>
    
                    <div className="boxesXont">
                        <div className="xontHead" style={{color: "white"}}>Movies</div>
                        <div className="renderData">{watchMovies}</div>
                    </div>
    
                    <div className="boxesXont">
                        <div className="xontHead" style={{color: "white"}}>Tv/Series</div>
                        <div className="renderData">{watchSeries}</div>
                    </div>
    
                </section>
            </div>

            <div className="hidden" style={{display: "none"}}>{refresh}</div>

        </section>
    )
  }

  if(jikanType.isFetching || tmdbType.isFetching){
    return (<div style={{width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", position: "relative"}}>
    <section style={{height: "90%", width: "100%", position: "absolute"}}>
      <Lottie animationData={SandAnimation} loop={true} style={{height: "100%"}} />
    </section>
    </div>)
  }


}

export default UserIndex