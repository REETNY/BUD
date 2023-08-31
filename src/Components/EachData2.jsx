import React from 'react';
import { Link } from 'react-router-dom';
import NoImg from "../assets/No-Img/NoImage.webp"

const EachData2 = ({fetched, prevUrl}) => {

    let {images, 
        title,  
        title_english,
        genres,
        rank,
        score,
        mal_id: id
    } = fetched;

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
    <Link className='eachDataLink' state={{myLink: prevUrl}} to={`/manga/${id}`}>
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

        <div className="absoluteContDets">
            <div className="imgCont">
                <img onError={({nativeEvent}) => nativeEvent.srcElement.src = `${NoImg}`} src={images.webp.image_url} alt="" />
            </div>
            <div className="detailsABS">
                <div className="animeName2"><span className="mildHead">Title:</span> {title}</div>
                {title_english && <div className="anime titleEng"><span className="mildHead">English Title:</span> {title_english}</div>}
                <div className="type" style={{display: "flex", flexWrap: "wrap", alignItems: "center", columnGap: "8px"}}><span className="mildHead">Genre:</span> 
                    <ul style={{display: "flex", flexWrap: "wrap", columnGap: "8px", alignItems: "center"}}>
                        {genres.map((item, index) => {
                            return <li style={{listStyle: "none"}} key={index} >{item.name}{genres.length == index + 1 ? "" : ","}</li>
                        })}
                    </ul>
                </div>
                <div className="popularity"><span className="mildHead">Rank:</span> {rank}</div>
                
            </div>
        </div>
    </Link>
  )
}

export default EachData2