import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';

const Others = () => {

  let idData = useOutletContext();

  let authors = [];
  let themes = [];
  let streamingLink = [];
  let producersList = [];

  if(idData?.authors != undefined){
    authors = idData.authors.map((item, index) => {
      if(index == idData.authors.length - 1){
        return `${index+1} => ${item.name}.`
      }
      return `${index+1} => ${item.name},  `
    })
  }

  if(idData?.themes){
    themes = idData.themes.map((item, index) => {
      if(index == idData.themes.length - 1){
        return `${item.name}.`
      }
      return `${item.name},  `
    })
  }

  if(idData?.streaming != undefined){
    streamingLink = idData.streaming.map((item, index) => {
      return (<li key={index}><Link to={item.url}>{item.name}</Link></li>)
    })
  }

  if(idData?.producers){
    producersList = idData.producers.map((item, index) => {
      if(index == idData.producers.length - 1){
        return `${item.name}.`
      }
      return `${item.name}, `
    })
  }

  return (
    <section className="dataOths">

    <div className="eachData">
      {idData.approved ? <><span>Approved:</span> <span id='dataExp'>{JSON.stringify(idData.approved)}</span></> : ""}
    </div>

    <div className="eachData">
      {idData.favorites ? <><span>Favouritism:</span> <span id='dataExp'>{(idData.favorites)}</span></> : ""}
    </div>

    <div className="eachData">
      {idData.rank ? <><span>Rank:</span> <span id='dataExp'>{(idData.rank)}</span></> : ""}
    </div>

    <div className="eachData">
      {idData.popularity ? <><span>Popularity:</span> <span id='dataExp'>{(idData.popularity)}</span></> : ""}
    </div>

    <div className="eachData">
      {idData.background ? <><span>Background:</span> <span id='dataExp'>&nbsp; {(idData.background)}</span></> : ""}
    </div>

    <div className="eachData">
      {idData?.authors != undefined ? <><span>Authors:</span> <span id='dataExp'>&nbsp; {authors}</span></> : ""}
    </div>

    <div className="eachData">
      {idData?.members != undefined ? <><span>Members:</span> <span id='dataExp'>&nbsp; {idData.members}</span></> : ""}
    </div>

    <div className="eachData">
      {idData?.themes != undefined ? <><span>Themes:</span> <span id='dataExp'>&nbsp; {themes}</span></> : ""}
    </div>

    <div className="eachData">
      {idData?.streaming != undefined ? <><span>Streaming:</span> <span id='dataExp'>&nbsp; <ul id='inlineLink'>{streamingLink}</ul> </span></> : ""}
    </div>

    <div className="eachData">
      {idData?.producers != undefined ? <><span>Producers:</span> <span id='dataExp'>&nbsp; {producersList}</span></> : ""}
    </div>

    </section>
  )
}

export default Others