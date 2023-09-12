import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams, useLocation } from 'react-router-dom';
import Ani_ManSearch from '../AsyncFetch/Ani_ManSearch';
import EachData from '../Components/EachData';
import EachData2 from '../Components/EachData2';

import Mov_TvSearch from '../AsyncFetch/Mov_TvSearch';
import TVShowData from '../Components/TVShowData';
import MovieData from '../Components/MovieData';

import LoadingAnimation from '../Externals/LoadingAnimation';

const Search = () => {

    let title = document.getElementsByTagName("title");
    title[0].textContent = `BUD/Search`

    let [SP, setSP] = useSearchParams();
    let currLocate = useLocation();

    let urlBack = `${currLocate.pathname}${currLocate.search}`;

    let searchKey = SP.get("search");
    let pageNum = SP.get("page") != undefined ? SP.get("page") : 1;
    let currType = SP.get("type") != undefined ? SP.get("type") : "Anime";

    function changePage(key, page){
        let param = new URLSearchParams(SP);
        if(key != "" && page == ""){
            param.delete(key);
            setSP(param)
        }else{
            param.set(key, page);
            setSP(param)
        }
        
    }

    function changeType(key, val){
        let param = new URLSearchParams(SP);
        if(key != "" && val == ""){
            param.delete(key);
            setSP(param);
        }else{
            param.set(key, val);
            param.set("page", 1);
            setSP(param)
        }
    }

    let fetchSearch1 = useQuery({
        queryKey: ["fetchSearch1", "Anime", `${searchKey}`, `${pageNum}`],
        enabled: currType == "Anime" ? true : false,
        queryFn: async({queryKey}) => {
           return await Ani_ManSearch(queryKey)
        }
    });

    let fetchSearch2 = useQuery({
        queryKey: ["fetchSearch2", "Manga", `${searchKey}`, `${pageNum}`],
        enabled: currType == "Manga" ? true : false,
        queryFn: async({queryKey}) => {
            return await Ani_ManSearch(queryKey)
        }
    });

    let fetchSearch3 = useQuery({
        queryKey: ["fetchSearch3", "Movie", `${searchKey}`, `${pageNum}`],
        enabled: currType == "Movies" ? true : false,
        queryFn: async({queryKey}) => {
            return await Mov_TvSearch(queryKey)
        }
    });

    let fetchSearch4 = useQuery({
        queryKey: ["fetchSearch4", "TV", `${searchKey}`, `${pageNum}`],
        enabled: currType == "TV" ? true : false,
        queryFn: async({queryKey}) => {
            return await Mov_TvSearch(queryKey)
        }
    });

    let activeType = {
        borderBottom: "2px solid white",
        color: "white"
    }

    let renderedData = [];
    let pageChanger = [];
    let fixedChanger = [];

    if(currType == "Anime" && fetchSearch1.data){
        let TP = fetchSearch1.data.totalPage;
        for(let i = 1; i <= TP; i++){
            let page = <li key={i} style={pageNum == `${i}` ? {borderColor: "green", color: "green"} : {}} onClick={() => changePage("page", `${i}`)} className="pageNum">{i}</li>
            pageChanger.push(page)
        }

        renderedData = []
        renderedData = fetchSearch1.data.fetched.map((item, index) => {
            return (<EachData prevLink={urlBack} fetched={item} key={index} />)
        })

    }else if(currType == "Manga" && fetchSearch2.data){
        let TP = fetchSearch2.data.totalPage;
        for(let i = 1; i <= TP; i++){
            let page = <li key={i} style={pageNum == `${i}` ? {borderColor: "green", color: "green"} : {}} onClick={() => changePage("page", `${i}`)} className="pageNum">{i}</li>
            pageChanger.push(page)
        }

        renderedData = []
        renderedData = fetchSearch2.data.fetched.map((item, index) => {
            return (<EachData2 prevUrl={urlBack} fetched={item} key={index} />)
        })


    }else if(currType == "Movies" && fetchSearch3.data){
        let TP = fetchSearch3.data.totalPage;
        for(let i = 1; i <= TP; i++){
            let page = <li key={i} style={pageNum == `${i}` ? {borderColor: "green", color: "green"} : {}} onClick={() => changePage("page", `${i}`)} className="pageNum">{i}</li>
            pageChanger.push(page)
        }

        renderedData = []
        renderedData = fetchSearch3.data.fetched.map((item, index) => {
            return (<MovieData fetched={item} backUrl={urlBack} key={index} />)
        })

    }else if(currType == "TV" && fetchSearch4.data){
        let TP = fetchSearch4.data.totalPage;
        for(let i = 1; i <= TP; i++){
            let page = <li key={i} style={pageNum == `${i}` ? {borderColor: "green", color: "green"} : {}} onClick={() => changePage("page", `${i}`)} className="pageNum">{i}</li>
            pageChanger.push(page)
        }

        renderedData = []
        renderedData = fetchSearch4.data.fetched.map((item, index) => {
            return (<TVShowData fetched={item} prevLink={urlBack} key={index} />)
        })
    }
    
    if(pageNum % 5 == 0){
        fixedChanger = pageChanger.slice(pageNum - 2, (pageNum * 1 + 3));
    }else if(pageNum % 5 != 0 && pageNum > 5){
        fixedChanger = pageChanger.slice(pageNum - 2, (pageNum * 1 + 3));
    }
    else{
        fixedChanger = pageChanger.slice(0, 5);
    }



    if(renderedData.length != 0){
        return (
            <section className="searchCont">
                <header className="searchHead">
                    <nav className="searchBox">
                        <ul className="searchSection">
        
                            <li onClick={() => {
                                changeType("type","Anime");
                                renderedData = []
                            }} style={currType == "Anime" ? activeType : {}} className="searchSelect">Anime</li>
        
                            <li onClick={() => {
                                changeType("type","Manga");
                                renderedData = []
                            }} style={currType == "Manga" ? activeType : {}} className="searchSelect">Manga</li>
        
                            <li onClick={() => {
                                changeType("type","Movies");
                                renderedData = []
                            }} style={currType == "Movies" ? activeType : {}} className="searchSelect">Movies</li>
        
                            <li onClick={() => {
                                changeType("type","TV");
                                renderedData = []
                            }} style={currType == "TV" ? activeType : {}} className="searchSelect">TV</li>
                        </ul>
                    </nav>
        
                    <div className="otherNavLink">
                        <ul className="selectPage">
                            {fixedChanger}
                        </ul>
                    </div>
                </header>
        
                <div className="foundDatas">
        
                    <div className="foundDataHead">{currType} &nbsp; &gt;&gt;&gt; &nbsp; {searchKey}</div>
        
                    <div className="foundData">
                        {renderedData}
                    </div>
                    
                </div>
            </section>
        )
    }else if(renderedData.length == 0 && !(fetchSearch1?.isFetching) && !(fetchSearch2?.isFetching) && !(fetchSearch3.isFetching) && !(fetchSearch4?.isFetching) ){
        return (
            <section className="searchCont">
                <header className="searchHead">
                    <nav className="searchBox">
                        <ul className="searchSection">
        
                            <li onClick={() => {
                                changeType("type","Anime");
                                renderedData = []
                            }} style={currType == "Anime" ? activeType : {}} className="searchSelect">Anime</li>
        
                            <li onClick={() => {
                                changeType("type","Manga");
                                renderedData = []
                            }} style={currType == "Manga" ? activeType : {}} className="searchSelect">Manga</li>
        
                            <li onClick={() => {
                                changeType("type","Movies");
                                renderedData = []
                            }} style={currType == "Movies" ? activeType : {}} className="searchSelect">Movies</li>
        
                            <li onClick={() => {
                                changeType("type","TV");
                                renderedData = []
                            }} style={currType == "TV" ? activeType : {}} className="searchSelect">TV</li>
                        </ul>
                    </nav>
        
                    <div className="otherNavLink">
                        <ul className="selectPage">
                            {fixedChanger.length != 0 ? fixedChanger : ""}
                        </ul>
                    </div>
                </header>
        
                <div className="foundDatas">
        
                    <div className="foundDataHead">{currType} &nbsp; &gt;&gt;&gt; &nbsp; {searchKey}</div>
        
                    <div className="foundData">
                        {renderedData.length != 0 ? renderedData : <span style={{fontSize: "19px", fontWeight: "700"}} className="noData">Nothing to Show in here</span> }
                    </div>
                    
                </div>
            </section>
        )
    }

  if(fetchSearch1.isFetching || fetchSearch2.isFetching || fetchSearch3.isFetching || fetchSearch4.isFetching ){
    return (<LoadingAnimation />)
  }
}

export default Search