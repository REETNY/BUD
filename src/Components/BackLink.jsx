import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaArrowLeft, FaHandPointLeft } from "react-icons/fa";
import { AiOutlineArrowLeft } from "react-icons/ai";


const BackLink = ({prevUrl}) => {

  return (
    <div className="backLink">
      <Link onHov to={prevUrl == undefined ? "/" : prevUrl}>{prevUrl == undefined ?  <FaHome /> : <FaHandPointLeft style={{fontWeight: "700"}} />}</Link>
    </div>
  )
}

export default BackLink