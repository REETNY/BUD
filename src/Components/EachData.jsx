import React from 'react';
import { Link } from 'react-router-dom';
import NoImg from "../assets/No-Img/NoImage.webp";
import Like_WatchFunc from './Like_WatchFunc';

const EachData = ({fetched, prevLink, itemNo, forUser}) => {

    let {images, 
        title, 
        score, 
        title_english,
        type,
        popularity,
        mal_id: id
    } = fetched;

    function ecc(){
        let screenWidth = window.innerWidth;
        if(screenWidth <= 950 && itemNo % 2 == 0){
            return {
                position: "absolute",
                top: "-5px",
                right: "8%",
            }
        }else if(screenWidth <= 950 && itemNo % 2 != 0){
            return {
                position: "absolute",
                top: "-5px",
                left: "8%",
            }
        }else{
            return {
                position: "absolute",
                top: "0",
                left: "50%",
                transform: "translate(-50%, 0%)"
            }
        }
    }


    let fakePercentage = Math.floor(score * 10);

    let deg = Math.floor(360*fakePercentage/100);

    let firstAngle = 0;
    let secondAngle = 0;

    if(deg > 180){
        firstAngle = 180
    }else{
        firstAngle = deg;
    }
    if(deg > 180){
        secondAngle = deg
    }else if(deg < 180){
        secondAngle = 0;
    }

    let colorCode = '';

    if(fakePercentage <= 35){
        colorCode = "red"
    }else if(fakePercentage > 35 && fakePercentage <= 50){
        colorCode = "orange"
    }else if(fakePercentage > 50 && fakePercentage < 75){
        colorCode = "yellow"
    }else{
        colorCode = "green";
    }


  return (
    <div className="contentWrapper" style={{width: "100%", height: "fit-content", position: "relative"}}>
        <Link className='eachDataLink' state={{myLink: prevLink}} to={`/anime/${id}`}>
            <div className="eachDataComp">
                <div className="imgDets">
                    <img onError={({nativeEvent}) => nativeEvent.srcElement.src = `${NoImg}`} src={images.webp.image_url} alt="" />
                </div>
                <div className="dataDets">
                    <div className="animeName">{title}</div>
                    <div className="animeRating">
                        <div className="circularPercentage">
                            <div className="semiCirclePer" style={firstAngle != 0 ? {transform: `rotate(${firstAngle}deg)`, display: `block`,  transition: `transform 2.5s linear 2.5s`, background: `${colorCode}`} : {}}></div>
                            <div className="semiCirclePer" style={secondAngle != 0 ? {transform: `rotate(${secondAngle}deg)`, display: `block`, zIndex: `10`,  transition: `transform 5s linear 2.5s`,  background: `${colorCode}`} : {}}></div>
                            <div className="semiCirclePer"></div>

                            <div className="fullCircle">
                                <span className="rating">{fakePercentage}<sup>%</sup></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>

        <div className="absoluteContDets" style={ecc()}>
            <Like_WatchFunc userFunc={forUser} idData={fetched.mal_id}  type={'anime'} />
            <div className="imgCont">
                <img onError={({nativeEvent}) => nativeEvent.srcElement.src = `${NoImg}`} src={images.webp.image_url} alt="" />
            </div>
            <div className="detailsABS">
                {title_english && <div className="anime titleEng"><span className="mildHead">English Title:</span> {title_english}</div>}
                <div className="type"><span className="mildHead">Type:</span> {type}</div>
                <div className="popularity"><span className="mildHead">Popularity{itemNo}:</span> {popularity}</div>
                
            </div>
        </div>
    </div>
    
    
  )
}

export default EachData