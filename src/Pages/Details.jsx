import React from 'react';
import { useOutletContext } from 'react-router-dom';

const Details = () => {

  let idData = useOutletContext();

  let allStudios = []

  if(idData.studios){
    allStudios = idData?.studios?.map((item, index) => {
      if(index == idData.studios.length - 1){
        return `${item.name}.`
      }
      return `${item.name}, `
    })
  }


  return (
    <section id="dataDets">

      <div className="eachData">
        <span>Title:</span> <span id='dataExp'>{idData.title}</span>
      </div>

      <div className="eachData">
        <span>Other Tiles:</span> <span id='dataExp'>{
          
        }</span>
      </div>

      <div className="eachData">
        <span>Rating:</span> <span id='dataExp'>{idData.rating}</span>
      </div>

      <div className="eachData">
        <span>Score:</span> <span id='dataExp'>{idData.score}</span>
      </div>

      <div className="eachData">
        <span>Genre:</span> <span id='dataExp'>{idData.genres.map((item, index) => {
          if(index == idData.genres.length - 1){
            return `${item.name}.`
          }else{
            return `${item.name}, `
          }
        })}</span>
      </div>
      
      {allStudios.length > 0 ? <div className="eachData">
        <span>Studios:</span> <span id='dataExp'>{allStudios}</span>
      </div> : ""}

      <div className="eachData">
       {idData.airing != null ?
        <><span>Airing:</span> <span id='dataExp'>{JSON.stringify(idData.airing)}</span> </>: 
        <><span>Publishing:</span> <span id='dataExp'>{JSON.stringify(idData.publishing)}</span></> }
      </div>

      <div className="eachData">
        {idData.aired ?
        <><span>Aired:</span> <span id='dataExp'>{idData.aired.string}</span></> : 
        <><span>Published:</span> <span id='dataExp'>{idData.published.from.slice(0, 10)} - {idData.published.to == null ? "unknown" : idData.published.to}</span></>}
      </div>

      {idData?.season ? <div className="eachData">
        <span>Season:</span> <span id='dataExp'>{idData.season}</span>
      </div> : ""}

      {idData?.duration ? <div className="eachData">
        <span>Duration:</span> <span id='dataExp'>{idData.duration}</span>
      </div> : ""}

      {idData?.episodes ? <div className="eachData">
        <span>Episodes:</span> <span id='dataExp'>{idData.episodes}</span>
      </div> : ""}

      {idData?.source ? <div className="eachData">
        <span>Source:</span> <span id='dataExp'>{idData.source}</span>
      </div> : ""}

      {idData?.status ? <div className="eachData">
        <span>Status:</span> <span id='dataExp'>{idData.status}</span>
      </div> : ""}

      {idData?.rating ? <div className="eachData">
        <span>Rating:</span> <span id='dataExp'>{idData.rating}</span>
      </div> : ""}

      {idData?.synopsis ? <div className="eachData">
        <span>Synposis:</span> <span id='dataExp'>&nbsp;  {idData.synopsis}</span>
      </div> : ""}

    </section>
  )
}

export default Details