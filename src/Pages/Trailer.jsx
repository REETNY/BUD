import React from 'react'
import { useOutletContext } from 'react-router-dom'

const Trailer = () => {


  let idData = useOutletContext();
  let YTURL = "";
  if(idData.trailer){
    YTURL = idData.trailer.embed_url != undefined ? idData.trailer.embed_url : idData.trailer.url?.replace("watch?v=", "embed/");
  }

  console.log(YTURL);

  return (
    <>
      {YTURL != undefined ? 
    <section className="dataTrailer">
      <iframe src={YTURL} frameborder="0"></iframe>
    </section> : <div style={{marginTop: "20px", color: "red", fontSize: "19px", fontWeight: "700"}} className="noVid">No Video is available!</div> }
    </>
  )
}

export default Trailer