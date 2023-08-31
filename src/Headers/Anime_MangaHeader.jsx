import React from 'react'
import Kist from '../Components/Kist';

const Anime_MangaHeader = ({newDataFunc, oth1, oth2, currPage}) => {

    let currLocation = window.location.href;
    let Heading = '';

    if(currLocation.includes("anime")){
        Heading = "Anime"
    }else if(currLocation.includes("manga")){
        Heading = "Manga"
    }else if(currLocation.includes("tv")){
        Heading = "TV Shows"
    }else{
        Heading = "Movies"
    }

    let pageItem = [];
    let totalPage = Math.ceil(oth1/oth2);

    for(let i = 0; i < totalPage; i++){
        pageItem = [...pageItem, <Kist pageNo={currPage} key={i} func={newDataFunc} data={i+1} />]
    }

    let currentLink = [];

    if(currPage % 5 == 0){
        currentLink = pageItem.slice(currPage - 2, (currPage * 1 + 3));
    }else if(currPage % 5 != 0 && currPage > 5){
        currentLink = pageItem.slice(currPage - 2, (currPage * 1 + 3));
    }
    else{
        currentLink = pageItem.slice(0, 5);
    }


  return (
    <header id='anime_manga_head'>
        <div className="currentRoute">{Heading}</div>
        <nav className="animag_navigate">
            <ul className="animag_links">
                {
                    currentLink
                }
            </ul>
        </nav>
    </header>
  )
}

export default Anime_MangaHeader