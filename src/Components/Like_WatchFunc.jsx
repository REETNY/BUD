import React, { useEffect, useState } from 'react';
import { AiFillLike } from "react-icons/ai";
import { BiMoviePlay } from "react-icons/bi";
import { useNavigate, useLocation } from 'react-router-dom';

const Like_WatchFunc = ({idData, type, userFunc}) => {

  let LSA = JSON.parse(localStorage.getItem("likedData")) || [];
  let LSA2 = JSON.parse(localStorage.getItem("watchLater")) || [];

  let c1 = [];
  let c2 = []

  let obj2 = {
    id: idData,
    as: type
  }

  function checkUser(){
    let isLogged = JSON.parse(localStorage.getItem("isLogged")) || false;
    return isLogged.isLogged
  }

  const [isLiked, setLiked] = useState("");

  const [watchLater, setWatch] = useState("");

  let navigate = useNavigate();

  let locate = useLocation();

  let route = `${locate.pathname}${locate.search}`;

  useEffect(() => {
    c2 = LSA2.filter((item) => (item.id == obj2.id && item.as == obj2.as) ? item : false);

    if(c2.length > 0){
      setWatch(() => true)
    }else{
      setWatch(() => false)
    }

    c1 = LSA.filter((item) => (item.id == obj2.id && item.as == obj2.as) ? item : false);

    if(c1.length > 0){
      setLiked(() => true)
    }else{
      setLiked(() => false)
    }
  })

  // function for like and unlike
  const addLiked = (obj2) => {
    let LS = JSON.parse(localStorage.getItem("likedData")) || [];
    LS = [{...obj2, type: "liked"}, ...LS];
    localStorage.setItem("likedData", JSON.stringify(LS));
    setLiked(() => true);
  }
  const removeLike = (obj2) => {
    let LS = JSON.parse(localStorage.getItem("likedData")) || [];
    LS = LS.filter((item) => {
      return (item.id == obj2.id && item.as == obj2.as) ? false : item;
    })
    localStorage.setItem("likedData", JSON.stringify(LS));
    setLiked(() => false);
  }

  // function for watchlater adding and removing
  const watchYup = (obj2) => {
    let LS = JSON.parse(localStorage.getItem("watchLater")) || [];
    LS = [{...obj2, type: "watch"}, ...LS];
    localStorage.setItem("watchLater", JSON.stringify(LS));
    setWatch(() => true);
  }
  const watchNot = (obj2) => {
    let LS = JSON.parse(localStorage.getItem("watchLater")) || [];
    LS = LS.filter((item) => {
      return (item.id == obj2.id && item.as == obj2.as) ? false : item;
    })
    localStorage.setItem("watchLater", JSON.stringify(LS));
    setWatch(() => false);
  }

  return (
    <div className="like_watchFunc" style={{width: "100%", height: "30px", display: "flex", justifyContent: "flex-end", columnGap: "5px", alignItems: "center", position: "absolute", bottom: "0%", left: "0%", paddingRight: "8px"}}>
        <button className="likeItem" style={{cursor: "pointer", background: "none", outline: "none", border: "none"}}>
            <AiFillLike onClick={() => {
              if(checkUser()){
                isLiked ? removeLike(obj2) : addLiked(obj2)
                if(userFunc != undefined) {
                  userFunc()
                }
              }else{
                navigate(`/signin?navTo=${route.replace("/", "")}&message=You need to login to access such feature`)
              }
            }} role="button" tabIndex="0" style={isLiked ? {color: "#1DA1F2", fontSize: "24px"} : {color: "#D3D3D3", fontSize: "24px"}} />;
        </button>
        {type != "manga" && <button className="watchBtn" style={{cursor: "pointer", background: "none", outline: "none", border: "none"}}>
            <BiMoviePlay onClick={() => {
              if(checkUser()){
                watchLater ? watchNot(obj2) : watchYup(obj2);
                if(userFunc != undefined){
                  userFunc()
                }
              }else{
                navigate(`/signin?navTo=${route.replace("/", "")}&message=You need to login to access such feature`)
              }
            }} role='button' tabIndex="0"  style={watchLater ? {color: "rgb(245, 24, 91)", fontSize: "24px"}  : {color: "#D3D3D3", fontSize: "24px"}} />
        </button>}
    </div>
  )
}

export default Like_WatchFunc