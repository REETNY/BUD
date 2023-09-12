import React from 'react'
import { useOutletContext } from 'react-router-dom';

import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';

// Default theme
import '@splidejs/react-splide/css';




const Extras = () => {

  const imgPath = `https://image.tmdb.org/t/p/w500`;
  let data = useOutletContext();
  let url = window.location.href;
  let screenWid = window.innerWidth;

  let carouselWidth = 0;

  if(screenWid <= 600){
    carouselWidth = screenWid - 40;
  }else if(screenWid > 600 && screenWid <= 900){
    carouselWidth = screenWid - 200;
  }else{
    carouselWidth = 600
  }

  let bodyData = (url.includes("/movie/")) 
    ?
    <>
      <div className="each_Dets2">
        <span className="label">Tagline:</span>
        <span className="labelData">{data.tagline}</span>
      </div>

      <div className="each_Dets2">
        <span className="label">Rating:</span>
        <span className="labelData">{Math.floor(data.vote_average*10)}%</span>
      </div>

      <div className="each_Dets2">
        <span className="label">Vote Count:</span>
        <span className="labelData">{Math.floor(data.vote_count)}</span>
      </div>

      <div className="each_Dets2">
        <span className="label">Popularity:</span>
        <span className="labelData">{Math.floor(data.popularity)}</span>
      </div>

      <div className="each_Dets2">
        <span className="label">Budget:</span>
        <span className="labelData">${(data.budget)}</span>
      </div>

      <div className="each_Dets2">
        <span className="label">Revenue:</span>
        <span className="labelData">${(data.revenue)}</span>
      </div>

      <div className="each_Dets2">
        <span className="label">Collection:</span>
        <span className="labelData">{(data?.belongs_to_collection?.name)}</span>
      </div>

      <div className="each_Dets2">
        <span className="label">Production Countries:</span>
        <span className="labelData">{data.production_countries.map((item, index) => {
          if(index == data.production_countries.length - 1){
            return <span key={index}>{item.name}.</span>
          }else{
            return <span key={index}>{item.name}, </span>
          }
        })}</span>
      </div>

      <div className="each_Dets2">
        <span className="label">IDS:</span>
        <span className="labelData">{`TMDB ID - ${data.id}`}, {`IMDB ID - ${data.imdb_id}`}.</span>
      </div>

      <div className="each_Dets2">
        <span className="label">Spoken Languages:</span>
        <span className="labelData">{data.spoken_languages.map((item, index) => {
          if(index == data.spoken_languages.length - 1){
            return <span key={index}>{item.english_name}.</span>
          }else{
            return <span key={index}>{item.english_name}, </span>
          }
        })}</span>
      </div>

      <div style={{flexDirection: "column", rowGap: "0px", columnGap: "0px"}} className="each_Dets2">
        <span className="label">Production Conpanies:</span>
        <div className="company">
          <Splide
            options={ {
              rewind: true,
              width : carouselWidth,
              gap   : '0.5em',
              autoplay: true,
              type: "loop",
              arrows: false,
              perMove: 1
            } }
            tag='section'
            hasTrack={ false }
            >
              <SplideTrack>
                {data.production_companies.map((item, index) => {
                  return item.logo_path != null ? (<SplideSlide key={index}>
                    <div className="box" style={{width: "150px", height: "150px", background: "#e4e2e24d", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden"}}>
                      <img src={`${imgPath}${item.logo_path}`} style={{width: "70%", height: "70%", objectFit: "100%"}} alt="" />
                    </div>
                  </SplideSlide>) : ""
                })}
              </SplideTrack>
          </Splide>
        </div>
      </div>

    </>
    :
    <>
      <div className="each_Dets2">
        <span className="label">Tagline:</span>
        <span className="labelData">{data.tagline}</span>
      </div>

      <div className="each_Dets2">
        <span className="label">Rating:</span>
        <span className="labelData">{Math.floor(data.vote_average*10)}%</span>
      </div>

      <div className="each_Dets2">
        <span className="label">Vote Count:</span>
        <span className="labelData">{Math.floor(data.vote_count)}</span>
      </div>

      <div className="each_Dets2">
        <span className="label">Type:</span>
        <span className="labelData">{data.type}</span>
      </div>

      <div className="each_Dets2">
        <span className="label">Created By:</span>
        <span className="labelData">{data.created_by.map((item, index) => {
          if(data.created_by.length - 1 == index){
            return <span>{item.name}.</span>
          }
          return <span>{item.name}, </span>
        })}</span>
      </div>

      <div className="each_Dets2">
        <span className="label">IDS:</span>
        <span className="labelData">{`TMDB ID - ${data.id}`}.</span>
      </div>

      <div className="each_Dets2">
        <span className="label">First Air Date:</span>
        <span className="labelData">{data.first_air_date}.</span>
      </div>

      <div className="each_Dets2">
        <span className="label">Last Air Date:</span>
        <span className="labelData">{data.last_air_date}.</span>
      </div>

      <div className="each_Dets2">
        <span className="label">Networks:</span>
        <span className="labelData">{data.networks.map((item, index) => {
          if(index == data.networks.length - 1){
            return <span key={index}>{item.name}.</span>
          }else{
            return <span key={index}>{item.name}, </span>
          }
        })}</span>
      </div>

      <div className="each_Dets2">
        <span className="label">Origin Countries:</span>
        <span className="labelData">{data.origin_country.map((item, index) => {
          if(index == data.origin_country.length - 1){
            return <span key={index}>{item}.</span>
          }else{
            return <span key={index}>{item}, </span>
          }
        })}</span>
      </div>

      <div className="each_Dets2">
        <span className="label">Popularity:</span>
        <span className="labelData">{Math.floor(data.popularity)}</span>
      </div>

      <div className="each_Dets2">
        <span className="label">Production Countries:</span>
        <span className="labelData">{data.production_countries.map((item, index) => {
          if(index == data.production_countries.length - 1){
            return <span key={index}>{item.name}.</span>
          }else{
            return <span key={index}>{item.name}, </span>
          }
        })}</span>
      </div>

      <div className="each_Dets2">
        <span className="label">Spoken Language:</span>
        <span className="labelData">{data.spoken_languages.map((item, index) => {
          if(index == data.spoken_languages.length - 1){
            return <span key={index}>{item.english_name}.</span>
          }else{
            return <span key={index}>{item.english_name}, </span>
          }
        })}</span>
      </div>

      <div className="each_Dets2">
        <span className="label">Original Language:</span>
        <span className="labelData">{data.original_language}.</span>
      </div>

      <div style={{flexDirection: "column", rowGap: "0px", columnGap: "0px"}} className="each_Dets2">
        <span className="label">Production Conpanies:</span>
        <div className="company">
        <Splide
            options={ {
              rewind: true,
              width : carouselWidth,
              gap   : '0.5em',
              autoplay: true,
              type: "loop",
              arrows: false,
              perMove: 1
            } }
            tag='section'
            hasTrack={ false }
            >
              <SplideTrack>
                {data.production_companies.map((item, index) => {
                  return item.logo_path != null ? (<SplideSlide key={index}>
                    <div className="box" style={{width: "150px", height: "150px", background: `#e4e2e24d`, borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden"}}>
                      <img src={`${imgPath}${item.logo_path}`} style={{width: "65%", height: "65%", objectFit: "100%"}} alt="" />
                    </div>
                  </SplideSlide>) : ""
                })}
              </SplideTrack>
          </Splide>
        </div>
      </div>

      

    </>

  return (
    <section className="extras">
      {bodyData}
    </section>
  )
}

export default Extras