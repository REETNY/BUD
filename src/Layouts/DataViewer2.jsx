import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useParams, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import MOV_TVFetch from '../AsyncFetch/MOV_TVFetch';
import BackLink from '../Components/BackLink';
import LoadingAnimation from '../Externals/LoadingAnimation';
import Error from '../Components/Error';

const DataViewer2 = () => {

  const imgPath = `https://image.tmdb.org/t/p/w500`;
  let { id: searchedID, type: searchType} = useParams();
  let locate = useLocation();
  let prevLink = locate?.state?.backLink;
  let [myPrevLink, setPrev] = useState("")

  let fetchData = useQuery({
    queryKey: ['fetchData', `${searchedID}`, `${searchType}`],
    queryFn: async({queryKey}) => {
      return await MOV_TVFetch(queryKey)
    }
  })

   useEffect(() => {
    setPrev(() => prevLink);
  }, [fetchData.data])

  const active = {
    borderBottom: `2px solid white`,
  }

  let {vote_average, name, popularity, id, backdrop_path} = fetchData.data != undefined ? fetchData.data : [];

  let fakePercentage = Math.floor(vote_average * 10);

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

  if(fetchData.data && fetchData.data.stack == undefined && fetchData.data.componentStack == undefined)return (
    <section className="dataViewCont">
     
      <header className="forMovies_tv">

        <BackLink prevUrl={myPrevLink} />

        <div className="hero">
          <div className="heroCont">
            <div className="blurAbs"></div>
            <div className="heroImg">
              <img src={`${imgPath}${fetchData.data.backdrop_path}`} alt="" />
            </div>
            <div className="heroImg2">
              <img src={`${imgPath}${fetchData.data.poster_path}`} alt="" />
            </div>
          </div>

          <div className="heroDets">
            <div className="eachDets">{fetchData.data.original_title != undefined ? fetchData.data.original_title : fetchData.data.name}</div>
            <div className="eachDets">{fetchData.data.runtime != undefined ? `${fetchData.data.runtime}min` : `${fetchData.data.episode_run_time}min per episode`}</div>
            <div className="eachDets">{fetchData.data.adult ? `16+` : <span className='pgDesign'>PG</span> }</div>
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

        <nav>
          <ul className="forTV_mov">
            <li className="tv_movLink">
              <NavLink end style={({isActive}) => isActive ? active : {}} to='.'>Details</NavLink>
            </li>
            <li className="tv_movLink">
              <NavLink style={({isActive}) => isActive ? active : {}} to="extras" >Extras</NavLink>
            </li>
            <li className="tv_movLink">
              <NavLink style={({isActive}) => isActive ? active : {}} to="trailer" >Trailer</NavLink>
            </li>
            <li className="tv_movLink">
              <NavLink style={({isActive}) => isActive ? active : {}} to="other" >Others</NavLink>
            </li>
          </ul>
        </nav>

      </header>

      <Outlet context={fetchData.data}/>

    </section>
  )

  if(fetchData.data?.stack != undefined || fetchData.data?.componentStack != undefined)return (<Error errorData={fetchData.data} rf={`${locate.pathname}${locate.search}`} />)


  if(fetchData.isFetching)return(<LoadingAnimation />)
}

export default DataViewer2