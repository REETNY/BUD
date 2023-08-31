import React from 'react';
import { useOutletContext, useParams, useLocation } from 'react-router-dom';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import { useQuery } from '@tanstack/react-query';
import FetchMore from '../AsyncFetch/FetchMore';
import LoadingDots from "../Externals/loading_dots.json";
import Lottie from "lottie-react"

const More = () => {

  const imgPath = `https://image.tmdb.org/t/p/w500`;
  let data = useOutletContext();
  let url = window.location.href;
  let screenWid = window.innerWidth;

  let locate = useLocation();

  let {id} = useParams();
  let type = (url.includes("/movie/")) ? "movie" : "tv";

  let fetchData = useQuery({
    queryKey: ["fetchdata", `${id}`, `${type}`],
    queryFn: async({queryKey}) => {
      return await FetchMore(queryKey);
    }
  });

  function runType(data, coun){
    let counData = data["US"];
    if(counData.buy == undefined){
      return []
    }else{
      return(Object.values(counData.buy))
    }
  }

  function runType2(data, coun){
    let counData = data["US"];
    console.log(counData.rent);
    if(counData.rent == undefined){
      return []
    }else{
      return(Object.values(counData.rent))
    }
  }

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
      {/* Credits */}
      <div style={{flexDirection: "column", rowGap: "15px", columnGap: "0px"}} className="each_Dets2">
        <span style={{width: "100%", textAlign: "center"}} className="label">Credits</span>

          <div style={{fontSize: "19px", fontWeight: "700", color: "white"}} className="actingBox">
            <span className="acting">Cast</span>
            <div style={{width: "100%", display: "flex", justifyContent: "center", marginTop: "20px"}} className="actingPic">
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
                {fetchData?.data?.creditsData?.cast?.map((item, index) => {
                  if(item.profile_path == null)return ""
                  return item.known_for_department != "" ? (<SplideSlide key={index}>
                    <div className="boxCast">
                      <img src={`${imgPath}${item.profile_path}`} style={{width: "95%", height: "95%", objectFit: "100%", borderRadius: "50%"}} alt="" />
                      <span className="castDets">
                        <div style={{fontSize: "13px", fontWeight: "800", width: "95%", textAlign: "center"}} className="castName">{item.name}</div>
                        <div style={{fontSize: "13px", fontWeight: "800", width: "95%", textAlign: "center"}} className="castName">{item.known_for_department}</div>
                        <div style={{fontSize: "13px", fontWeight: "800", width: "95%", textAlign: "center"}} className="castRole">{item.character}</div>
                        <div style={{fontSize: "13px", fontWeight: "800", width: "95%", textAlign: "center"}} className="castTyp">{
                        item.gender == 1 ? "Female" : (item.gender == 2 ? "Male" : "Not specified") }</div>
                      </span>
                    </div>
                  </SplideSlide>) : ""
                })}
              </SplideTrack>
            </Splide>
            </div>
          </div>

          <div style={{fontSize: "19px", fontWeight: "700", color: "white"}} className="actingBox">
            <span className="acting">Crew</span>
            <div style={{width: "100%", display: "flex", justifyContent: "center", marginTop: "20px"}} className="actingPic">
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
                {fetchData?.data?.creditsData?.crew?.map((item, index) => {
                  if(item.profile_path == null)return ""
                  return item.known_for_department != "" ? (<SplideSlide key={index}>
                    <div className="boxCast">
                      <img src={`${imgPath}${item.profile_path}`} style={{width: "95%", height: "95%", objectFit: "100%", borderRadius: "50%"}} alt="" />
                      <span className="castDets">
                        <div style={{fontSize: "13px", fontWeight: "800", width: "95%", textAlign: "center"}} className="castName">{item.name}</div>
                        <div style={{fontSize: "13px", fontWeight: "800", width: "95%", textAlign: "center"}} className="castName">{item.known_for_department}</div>
                        <div style={{fontSize: "13px", fontWeight: "800", width: "95%", textAlign: "center"}} className="castRole">{item.character}</div>
                        <div style={{fontSize: "13px", fontWeight: "800", width: "95%", textAlign: "center"}} className="castTyp">{
                        item.gender == 1 ? "Female" : (item.gender == 2 ? "Male" : "Not specified") }</div>
                      </span>
                    </div>
                  </SplideSlide>) : ""
                })}
              </SplideTrack>
            </Splide>
            </div>
          </div>
      </div>

      {/* Other Images */}

      <div style={{flexDirection: "column", rowGap: "15px", columnGap: "0px"}} className="each_Dets2">
        <span style={{width: "100%", textAlign: "center"}} className="label">Other Images</span>

          <div style={{fontSize: "19px", fontWeight: "700", color: "white"}} className="actingBox">
            <span className="acting">Logos</span>
            <div style={{width: "100%", display: "flex", justifyContent: "center", marginTop: "20px"}} className="actingPic">
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
                {fetchData?.data?.otherImages?.logos?.map((item, index) => {
                  if(item.file_path == null)return ""
                  return (<SplideSlide key={index}>
                    <div className="boxCast">
                      <img src={`${imgPath}${item.file_path}`} style={{width: "95%", height: "95%", objectFit: "100%", borderRadius: "50%"}} alt="" />
                    </div>
                  </SplideSlide>)
                })}
              </SplideTrack>
            </Splide>
            </div>
          </div>

          <div style={{fontSize: "19px", fontWeight: "700", color: "white"}} className="actingBox">
            <span className="acting">BackDrops</span>
            <div style={{width: "100%", display: "flex", justifyContent: "center", marginTop: "20px"}} className="actingPic">
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
                {fetchData?.data?.otherImages?.backdrops?.map((item, index) => {
                  if(item.file_path == null || index > 15)return ""
                  return (<SplideSlide key={index}>
                    <div className="boxCast">
                      <img src={`${imgPath}${item.file_path}`} style={{width: "95%", height: "95%", objectFit: "100%", borderRadius: "50%"}} alt="" />
                    </div>
                  </SplideSlide>)
                })}
              </SplideTrack>
            </Splide>
            </div>
          </div>
      </div>

      {/* watch provider */}

     {fetchData?.data?.watchProvide?.results?.length > 0 && <div style={{flexDirection: "column", rowGap: "15px", columnGap: "0px"}} className="each_Dets2">
        <span style={{width: "100%", textAlign: "center"}} className="label">Watch Provider</span>

          {fetchData?.data?.watchProvide?.results?.buy != undefined && 
          <div style={{fontSize: "19px", fontWeight: "700", color: "white"}} className="actingBox">
            <span className="acting">Buy</span>
            <div style={{width: "100%", display: "flex", justifyContent: "center", marginTop: "20px"}} className="actingPic">
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
                {runType(fetchData?.data?.watchProvide?.results)?.map((item, index) => {
                  if(item.logo_path == null)return ""
                  return (<SplideSlide key={index}>
                    <div className="boxCast">
                      <img src={`${imgPath}${item.logo_path}`} style={{width: "95%", height: "95%", objectFit: "100%", borderRadius: "50%"}} alt="" />
                    </div>
                  </SplideSlide>)
                })}
              </SplideTrack>
            </Splide>
            </div>
          </div>}

          {fetchData?.data?.watchProvide?.results?.rent != undefined &&
          <div style={{fontSize: "19px", fontWeight: "700", color: "white"}} className="actingBox">
            <span className="acting">Rent</span>
            <div style={{width: "100%", display: "flex", justifyContent: "center", marginTop: "20px"}} className="actingPic">
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
                {runType2(fetchData?.data?.watchProvide?.results)?.map((item, index) => {
                  if(item.logo_path == null)return ""
                  return (<SplideSlide key={index}>
                    <div className="boxCast">
                      <img src={`${imgPath}${item.logo_path}`} style={{width: "95%", height: "95%", objectFit: "100%", borderRadius: "50%"}} alt="" />
                    </div>
                  </SplideSlide>)
                })}
              </SplideTrack>
            </Splide>
            </div>
          </div>}
      </div>}

      {/* similar */}

      <div style={{flexDirection: "column", rowGap: "15px", columnGap: "0px"}} className="each_Dets2">
        <span style={{width: "100%", textAlign: "center"}} className="label">Similar</span>

          <div style={{fontSize: "19px", fontWeight: "700", color: "white"}} className="actingBox">
            <div style={{width: "100%", display: "flex", justifyContent: "center", marginTop: "20px"}} className="actingPic">
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
                {fetchData?.data?.similar?.results?.map((item, index) => {
                  if(item.backdrop_path == null)return ""
                  return (<SplideSlide key={index}>
                    <div className="boxCast">
                      <img src={`${imgPath}${item.backdrop_path}`} style={{width: "95%", height: "95%", objectFit: "100%", borderRadius: "50%"}} alt="" />
                        <span className="castDets">
                          <div style={{fontSize: "13px", fontWeight: "800", width: "95%", textAlign: "center"}} className="castName">{item.title}</div>
                        </span>
                    </div>
                  </SplideSlide>)
                })}
              </SplideTrack>
            </Splide>
            </div>
          </div>
      </div>
      
      {/* release date */}
      <div className="each_Dets2">
        <span className="label">Release Date:</span>
        <span className="labelData">{fetchData?.data?.releaseDate.results.map((item, index) => {
          let counCode = fetchData?.data?.geoDatas?.cc != undefined ? fetchData?.data?.geoDatas?.cc : "US";
          if(item.iso_3166_1 != counCode && index == fetchData?.data?.releaseDate.results.length - 1)return `No release date available for ${fetchData?.data?.geoDatas?.cc}`;
          return item.iso_3166_1 == counCode ? item.release_dates[0].release_date : ""
        })}</span>
      </div>

      {/* reviews */}

      <div style={{flexDirection: "column", rowGap: "15px", columnGap: "0px"}} className="each_Dets2">

          <div style={{fontSize: "19px", fontWeight: "700", color: "white"}} className="reviewBox">
            <span className="acting">Few Reviews:</span>
            <div className="forReviews">
              {fetchData?.data?.reviews?.results.map((item, index) => {
                return <div className="userReviews">

                  <span className="revUser">
                    <span className="rev_userName">{item.author_details.name || "UnKnown"} / {item.author_details.username}</span>
                    <span className="rev_upload">{item.created_at.slice(0, item.updated_at.indexOf(".")).replaceAll("T", "  ")}</span>
                  </span>

                  <span className='rev'>{item.content}</span>

                  {item.updated_at ? <span className="revUps">
                    updated@ : {item.updated_at.slice(0, item.updated_at.indexOf(".")).replaceAll("T", "  ")}
                  </span> : ""}

                </div>
              })}
            </div>
          </div>
      </div>

    </>
    :
    <>
      
      {/* Credits */}
      <div style={{flexDirection: "column", rowGap: "15px", columnGap: "0px"}} className="each_Dets2">
        <span style={{width: "100%", textAlign: "center"}} className="label">Credits</span>

          <div style={{fontSize: "19px", fontWeight: "700", color: "white"}} className="actingBox">
            <span className="acting">Cast</span>
            <div style={{width: "100%", display: "flex", justifyContent: "center", marginTop: "20px"}} className="actingPic">
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
                {fetchData?.data?.creditsData?.cast?.map((item, index) => {
                  if(item.profile_path == null)return ""
                  return item.known_for_department != "" ? (<SplideSlide key={index}>
                    <div className="boxCast">
                      <img src={`${imgPath}${item.profile_path}`} style={{width: "95%", height: "95%", objectFit: "100%", borderRadius: "50%"}} alt="" />
                      <span className="castDets">
                        <div style={{fontSize: "13px", fontWeight: "800", width: "95%", textAlign: "center"}} className="castName">{item.name}</div>
                        <div style={{fontSize: "13px", fontWeight: "800", width: "95%", textAlign: "center"}} className="castName">{item.known_for_department}</div>
                        <div style={{fontSize: "13px", fontWeight: "800", width: "95%", textAlign: "center"}} className="castRole">{item.character}</div>
                        <div style={{fontSize: "13px", fontWeight: "800", width: "95%", textAlign: "center"}} className="castTyp">{
                        item.gender == 1 ? "Female" : (item.gender == 2 ? "Male" : "Not specified") }</div>
                      </span>
                    </div>
                  </SplideSlide>) : ""
                })}
              </SplideTrack>
            </Splide>
            </div>
          </div>

          <div style={{fontSize: "19px", fontWeight: "700", color: "white"}} className="actingBox">
            <span className="acting">Crew</span>
            <div style={{width: "100%", display: "flex", justifyContent: "center", marginTop: "20px"}} className="actingPic">
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
                {fetchData?.data?.creditsData?.crew?.map((item, index) => {
                  if(item.profile_path == null)return ""
                  return item.known_for_department != "" ? (<SplideSlide key={index}>
                    <div className="boxCast">
                      <img src={`${imgPath}${item.profile_path}`} style={{width: "95%", height: "95%", objectFit: "100%", borderRadius: "50%"}} alt="" />
                      <span className="castDets">
                        <div style={{fontSize: "13px", fontWeight: "800", width: "95%", textAlign: "center"}} className="castName">{item.name}</div>
                        <div style={{fontSize: "13px", fontWeight: "800", width: "95%", textAlign: "center"}} className="castName">{item.known_for_department}</div>
                        <div style={{fontSize: "13px", fontWeight: "800", width: "95%", textAlign: "center"}} className="castRole">{item.character}</div>
                        <div style={{fontSize: "13px", fontWeight: "800", width: "95%", textAlign: "center"}} className="castTyp">{
                        item.gender == 1 ? "Female" : (item.gender == 2 ? "Male" : "Not specified") }</div>
                      </span>
                    </div>
                  </SplideSlide>) : ""
                })}
              </SplideTrack>
            </Splide>
            </div>
          </div>
      </div>

      {/* Other Images */}

      <div style={{flexDirection: "column", rowGap: "15px", columnGap: "0px"}} className="each_Dets2">
        <span style={{width: "100%", textAlign: "center"}} className="label">Other Images</span>

          <div style={{fontSize: "19px", fontWeight: "700", color: "white"}} className="actingBox">
            <span className="acting">Logos</span>
            <div style={{width: "100%", display: "flex", justifyContent: "center", marginTop: "20px"}} className="actingPic">
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
                {fetchData?.data?.otherImages?.logos?.map((item, index) => {
                  if(item.file_path == null)return ""
                  return (<SplideSlide key={index}>
                    <div className="boxCast">
                      <img src={`${imgPath}${item.file_path}`} style={{width: "95%", height: "95%", objectFit: "100%", borderRadius: "50%"}} alt="" />
                    </div>
                  </SplideSlide>)
                })}
              </SplideTrack>
            </Splide>
            </div>
          </div>

          <div style={{fontSize: "19px", fontWeight: "700", color: "white"}} className="actingBox">
            <span className="acting">BackDrops</span>
            <div style={{width: "100%", display: "flex", justifyContent: "center", marginTop: "20px"}} className="actingPic">
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
                {fetchData?.data?.otherImages?.backdrops?.map((item, index) => {
                  if(item.file_path == null || index > 15)return ""
                  return (<SplideSlide key={index}>
                    <div className="boxCast">
                      <img src={`${imgPath}${item.file_path}`} style={{width: "95%", height: "95%", objectFit: "100%", borderRadius: "50%"}} alt="" />
                    </div>
                  </SplideSlide>)
                })}
              </SplideTrack>
            </Splide>
            </div>
          </div>
      </div>

      {/* watch provider */}

     {fetchData?.data?.watchProvide?.results?.length > 0 && <div style={{flexDirection: "column", rowGap: "15px", columnGap: "0px"}} className="each_Dets2">
        <span style={{width: "100%", textAlign: "center"}} className="label">Watch Provider</span>

          {fetchData?.data?.watchProvide?.results?.buy != undefined && 
          <div style={{fontSize: "19px", fontWeight: "700", color: "white"}} className="actingBox">
            <span className="acting">Buy</span>
            <div style={{width: "100%", display: "flex", justifyContent: "center", marginTop: "20px"}} className="actingPic">
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
                {runType(fetchData?.data?.watchProvide?.results)?.map((item, index) => {
                  if(item.logo_path == null)return ""
                  return (<SplideSlide key={index}>
                    <div className="boxCast">
                      <img src={`${imgPath}${item.logo_path}`} style={{width: "95%", height: "95%", objectFit: "100%", borderRadius: "50%"}} alt="" />
                    </div>
                  </SplideSlide>)
                })}
              </SplideTrack>
            </Splide>
            </div>
          </div>}

          {fetchData?.data?.watchProvide?.results?.rent != undefined &&
          <div style={{fontSize: "19px", fontWeight: "700", color: "white"}} className="actingBox">
            <span className="acting">Rent</span>
            <div style={{width: "100%", display: "flex", justifyContent: "center", marginTop: "20px"}} className="actingPic">
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
                {runType2(fetchData?.data?.watchProvide?.results)?.map((item, index) => {
                  if(item.logo_path == null)return ""
                  return (<SplideSlide key={index}>
                    <div className="boxCast">
                      <img src={`${imgPath}${item.logo_path}`} style={{width: "95%", height: "95%", objectFit: "100%", borderRadius: "50%"}} alt="" />
                    </div>
                  </SplideSlide>)
                })}
              </SplideTrack>
            </Splide>
            </div>
          </div>}
      </div>}

      {/* similar */}

      <div style={{flexDirection: "column", rowGap: "15px", columnGap: "0px"}} className="each_Dets2">
        <span style={{width: "100%", textAlign: "center"}} className="label">Similar</span>

          <div style={{fontSize: "19px", fontWeight: "700", color: "white"}} className="actingBox">
            <div style={{width: "100%", display: "flex", justifyContent: "center", marginTop: "20px"}} className="actingPic">
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
                {fetchData?.data?.similar?.results?.map((item, index) => {
                  if(item.backdrop_path == null)return ""
                  return (<SplideSlide key={index}>
                    <div className="boxCast">
                      <img src={`${imgPath}${item.backdrop_path}`} style={{width: "95%", height: "95%", objectFit: "100%", borderRadius: "50%"}} alt="" />
                        <span className="castDets">
                          <div style={{fontSize: "13px", fontWeight: "800", width: "95%", textAlign: "center"}} className="castName">{item.title  || item.name}</div>
                        </span>
                    </div>
                  </SplideSlide>)
                })}
              </SplideTrack>
            </Splide>
            </div>
          </div>
      </div>

      {/* reviews */}

      <div style={{flexDirection: "column", rowGap: "15px", columnGap: "0px"}} className="each_Dets2">

          <div style={{fontSize: "19px", fontWeight: "700", color: "white"}} className="reviewBox">
            <span className="acting">Few Reviews:</span>
            <div className="forReviews">
              {fetchData?.data?.reviews?.results.map((item, index) => {
                return <div className="userReviews">

                  <span className="revUser">
                    <span className="rev_userName">{item.author_details.name || "UnKnown"} / {item.author_details.username}</span>
                    <span className="rev_upload">{item.created_at.slice(0, item.updated_at.indexOf(".")).replaceAll("T", "  ")}</span>
                  </span>

                  <span className='rev'>{item.content}</span>

                  {item.updated_at ? <span className="revUps">
                    updated@ : {item.updated_at.slice(0, item.updated_at.indexOf(".")).replaceAll("T", "  ")}
                  </span> : ""}

                </div>
              })}
            </div>
          </div>
      </div>
      
    </>

  if(fetchData.data && fetchData.data?.stack == undefined && fetchData.data?.componentStack == undefined) return (
    <section className="extras">
      {bodyData}
    </section>
  )

  if(fetchData.isFetching){
    return (
      <div style={{width: "100%", height: "100%", minHeight: "450px"}} className="loadTrailer">
        <Lottie loop={true} animationData={LoadingDots} style={{height: "100%", width: "100%"}}/>
      </div>
    )
  }

  if(fetchData?.data?.stack != undefined || fetchData?.data?.componentStack != undefined){
    return(<Error errorData={fetchData.data} rf={`${locate.pathname}${locate.search}`} />)
  }
}

export default More