import React from 'react';
import HomePageHeader from '../Headers/HomePageHeader';
import EachData from '../Components/EachData';
import EachData2 from '../Components/EachData2';
import Error from '../Components/Error';
import { useQuery } from '@tanstack/react-query';
import { useRef } from 'react';

import RanAnime_Manga from '../AsyncFetch/RanAnime_Manga';
import { Link } from 'react-router-dom';

import LoadingAnimation from '../Externals/LoadingAnimation';

const HomePage = () => {

  let title = document.getElementsByTagName("title");
  title[0].textContent = `BUD/Home`

  let animeStore = useRef([]);
  let mangaStore = useRef([]);
  // let [reset, seteset] = useState(0)


  function delay(wait) {
    return new Promise((resolve) => setTimeout(resolve, wait))
  }

  const {isFetching, isError, isSuccess, data} = useQuery({
    queryKey: ["randomFetch"],
    enabled: animeStore.current.length == 0 ? true : false,
    queryFn: async() => {
      let res = await RanAnime_Manga();
      return res;
    }
  })


  if(isSuccess){
    animeStore.current = [...data[0]];
    mangaStore.current = [...data[1]]
  }

  let mappedAnimeData = [];
  let mappedAnimeList = []

  if(animeStore.current.length > 0){
    mappedAnimeData = animeStore.current.map((item, index) => {
      return (<EachData fetched={item} key={index} />)
    })
    
    mappedAnimeList = animeStore.current.map((item, index) => {
      return (<li key={index}>
        <Link >
          <span>{item.title} | {`episodes: ${item?.episodes}`}</span>
          <div>{`status: ${item.status}`}</div>
        </Link>
      </li>)

    })
  }

  let mappedMangaData = [];
  let mappedMangaList = []

  if(mangaStore.current.length > 0){
    mappedMangaData = mangaStore.current.map((item, index) => {
      return (<EachData2 fetched={item} key={index} />)
    })
    mappedMangaList = mangaStore.current.map((item, index) => {
      return (<li key={index}>
        <Link >
          <span>{item.title} | {`chapters: ${item?.chapters}`}</span>
          <div>{`status: ${item.status}`}</div>
        </Link>
      </li>)
    })
  }

  if(isFetching && mangaStore.current.length == 0){
    return (<LoadingAnimation />)
  }

  if(isSuccess)return (

    <section className="homePageLayOut">

      <section className="homePageCont">
        <HomePageHeader />
        {animeStore.current.length == 0 ? '' : <div className="animeHead">Anime</div>}
        <section className="eachDataCont">
          {mappedAnimeData.length > 0 ? mappedAnimeData : ""}
        </section>

        {mangaStore.current.length == 0 ? '' : <div className="mangaHead">Manga</div>}
        <section className="eachDataCont">
          {mappedMangaData.length > 0 ? mappedMangaData : ""}
        </section>
      </section>

      <div className="styles2">
        <div className="animationList">
        <div className="booksList">Anime List</div>
        <ul>
          {mappedAnimeList}
        </ul>
        </div>

        <div className="mangaList">
          <div className="booksList">Manga List</div>
          <ul>
            {mappedMangaList}
          </ul>
        </div>
      </div>

    </section>
  )

  if(isError){
    return <Error errorData={data} rf={"/"} />
  }

}

export default HomePage