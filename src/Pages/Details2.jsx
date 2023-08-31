import React from 'react';
import { useOutletContext, Link } from 'react-router-dom';

const Details2 = () => {

  let data = useOutletContext();
  let url = window.location.href;

  let bodyData = (url.includes("/movie/")) ? 
    <>
      <div className="each_Dets2">
        <span className="label">Adult:</span>
        <span className="labelData">{data.adult ? `Yes` : `No`}</span>
      </div>

      <div className="each_Dets2">
        <span className="label">Genres:</span>
        <span className="labelData">{data.genres.map((item, index) => {
          if(index == data.genres.length - 1){
            return <span key={index}>{item.name}.</span>
          }else{
            return <span key={index}>{item.name}, </span>
          }
        })}</span>
      </div>

      <div className="each_Dets2">
        <span className="label">HomePage:</span>
        <span className="labelData">
          <Link to={data.homepage}>check out</Link>
        </span>
      </div>

      <div className="each_Dets2">
        <span className="label">Origanal Language:</span>
        <span className="labelData">{data.original_language}</span>
      </div>

      <div className="each_Dets2">
        <span className="label">Original Title:</span>
        <span className="labelData">{data.original_title}</span>
      </div>

      <div className="each_Dets2">
        <span className="label">Release Date:</span>
        <span className="labelData">{data.release_date}</span>
      </div>

      <div className="each_Dets2">
        <span className="label">Runtime:</span>
        <span className="labelData">{data.runtime}min</span>
      </div>

      <div className="each_Dets2">
        <span className="label">Status:</span>
        <span className="labelData">{data.status}</span>
      </div>

      <div className="each_Dets2">
        <span className="label">Overview:</span>
        <span style={{width: "90%"}} className="labelData">{data.overview}</span>
      </div>

      <div className="each_Dets2">
        <span className="label">Other Titles:</span>
        <span className="labelData">{data.title}</span>
      </div>

    </>
    : 
    <>
      <div className="each_Dets2">
        <span className="label">Adult:</span>
        <span className="labelData">{data.adult ? `Yes` : `No`}</span>
      </div>

      <div className="each_Dets2">
        <span className="label">Name:</span>
        <span className="labelData">{data.name}</span>
      </div>

      <div className="each_Dets2">
        <span className="label">Genres:</span>
        <span className="labelData">{data.genres.map((item, index) => {
          if(index == data.genres.length - 1){
            return <span key={index}>{item.name}.</span>
          }else{
            return <span key={index}>{item.name}, </span>
          }
        })}</span>
      </div>

      <div className="each_Dets2">
        <span className="label">Episode Runtime:</span>
        <span className="labelData">{data.episode_run_time.map((item, index) => {
          if(index == data.episode_run_time.length - 1){
            return <span key={index}>{item}min.</span>
          }else{
            return <span key={index}>{item}min, </span>
          }
        })}</span>
      </div>

      <div className="each_Dets2">
        <span className="label">HomePage:</span>
        <span className="labelData">
          <Link to={data.homepage}>check out</Link>
        </span>
      </div>

      <div className="each_Dets2">
        <span className="label">In Production:</span>
        <span className="labelData">{JSON.stringify(data.in_production)}</span>
      </div>

      <div className="each_Dets2">
        <span className="label">Languages:</span>
        <span className="labelData">{data.languages.map((item, index) => {
          if(index == data.languages.length - 1){
            return <span key={index}>{item}.</span>
          }else{
            return <span key={index}>{item}, </span>
          }
        })}</span>
      </div>
      
      <div className="each_Dets2">
        <span className="label">Total Episodes:</span>
        <span className="labelData">{data.number_of_episodes}</span>
      </div>

      <div className="each_Dets2">
        <span className="label">Total Seasons:</span>
        <span className="labelData">{data.number_of_seasons}</span>
      </div>

      <div className="each_Dets2">
        <span className="label">Oveview:</span>
        <span style={{width: "90%", display: 'block'}} className="labelData">{data.overview}</span>
      </div>

      <div className="each_Dets2">
        <span className="label">Status:</span>
        <span className="labelData">{data.status}</span>
      </div>

    </>

  return (
    <section className="detais2">
      {bodyData}
    </section>
  )
}

export default Details2