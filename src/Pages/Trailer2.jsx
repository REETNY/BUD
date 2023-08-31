import React, { useState } from 'react'
import { useOutletContext, useLocation } from 'react-router-dom';
import { useQuery, QueryClient } from '@tanstack/react-query';
import FetchVideo from '../AsyncFetch/FetchVideo';
import { useRef } from 'react';
import Lottie from "lottie-react";
import LoadingVideo from "../Externals/loading_video.json";
import Error from '../Components/Error';

const queries = new QueryClient();

const Trailer2 = () => {

  let data = useOutletContext();
  let urlLink = window.location.href;
  let type = "";

  let locate = useLocation();

  if(urlLink.includes("/movie/")){
    type = "movie"
  }else{
    type = "tv"
  }

  let [currentKey, setKey] = useState(0);

  let keyDatas = useRef([]);

  let getKey = useQuery({
    queryKey: ["fetchKey", `${type}`, `${data.id}`],
    disabled: keyDatas.current.length == 0 ? false : true,
    queryFn: async({queryKey}) => {
      return await FetchVideo(queryKey);
    }
  })

  console.log(currentKey);

  if(getKey.data && getKey.data.stack == undefined && getKey.data.componentStack == undefined){
    keyDatas.current = getKey?.data?.results?.filter((item, index) => {
      return item.type == "Trailer" ? item : false
    });

  }

  if(getKey.data && getKey.data.stack == undefined && getKey.data.componentStack == undefined)return (

    <>
      <div className="eachVideoBtn">
        {keyDatas.current.map((item, index) => {
          return (<button id='changeTrailer' style={index == currentKey ? {background: "#ecb318", cursor: "not-allowed"} : {}} onClick={() => setKey(() => index)} key={index}>Trailer {index + 1}</button>)
        })}
      </div>
  
      <section className="forTrailer2">
        
        <div className="iframeCont">
        <iframe src={`https://www.youtube.com/embed/${keyDatas?.current[currentKey]?.key}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>

      </section>
    </>
  )

  if(getKey.isFetching){
    return (
      <div style={{width: "100%", height: "100%", minHeight: "450px"}} className="loadTrailer">
        <Lottie loop={true} animationData={LoadingVideo} style={{height: "100%", width: "100%"}}/>
      </div>
    )
  }

  if(getKey?.data?.stack != undefined || getKey?.data?.componentStack != undefined){
    return(<Error errorData={getKey.data} rf={`${locate.pathname}${locate.search}`} />)
  }
}

export default Trailer2