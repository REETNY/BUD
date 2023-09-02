import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams, useLocation } from 'react-router-dom';
import TVShowFetch from '../AsyncFetch/TVShowFetch';
import Anime_MangaHeader from '../Headers/Anime_MangaHeader';
import TVShowData from '../Components/TVShowData';
import LoadingAnimation from '../Externals/LoadingAnimation';
import Error from '../Components/Error';

const TV_Show = () => {

  let title = document.getElementsByTagName("title");
  title[0].textContent = `BUD/TV`

  let [SP, setSP] = useSearchParams();

  let pageNum = SP.get("page") != undefined ? SP.get("page") : 1;
  let movType = SP.get("type") != undefined ? SP.get("type") : "popular";
  let locate = useLocation();

  let backUrl = `${locate.pathname}${locate.search}`

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

  const fetchTVShow = useQuery({
    queryKey: ["fetchTVShow", `${pageNum}`, `${movType}`],
    queryFn: async({queryKey}) => {
      return await TVShowFetch(queryKey)
      
    }
  })

  let mappedShow = [];

    if(fetchTVShow.data && fetchTVShow.data.stack == undefined && fetchTVShow.data.componentStack == undefined){
      mappedShow = fetchTVShow.data.fetch.map((item, index) => {
          return(<TVShowData prevLink={backUrl} fetched={item} key={index} />)
      })
    }


  if(fetchTVShow.data && fetchTVShow.data.stack == undefined && fetchTVShow.data.componentStack == undefined)return (
    <section className="myMoviesSect">
      <Anime_MangaHeader oth1={500} currPage={pageNum} oth2={1} newDataFunc={genSearchParams} />

      <header className="forMoviesOnly">
        <ul className="moviesType">
            <li onClick={() => genSearchParams("type", "popular")} style={movType == "popular" ? {background : "#800080"} : {}} className="movFilter">Popular</li>
            <li onClick={() => genSearchParams("type", "top-rated")} style={movType == "top-rated" ? {background : "#800080"} : {}} className="movFilter">Top Rated</li>
            <li onClick={() => genSearchParams("type", "airing")} style={movType == "airing" ? {background : "#800080"} : {}} className="movFilter">Airing Today</li>
        </ul>
      </header>

      <section className="renderData">
        {mappedShow}
      </section>

    </section>
  )

  if(fetchTVShow.data?.stack != undefined || fetchTVShow.data?.componentStack != undefined)return (<Error errorData={fetchTVShow.data} rf={backUrl} />)

  if(fetchTVShow.isFetching && mappedShow.length == 0)return (<LoadingAnimation />)
}

export default TV_Show