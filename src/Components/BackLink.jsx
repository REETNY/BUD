import React from 'react';
import { Link } from 'react-router-dom';
const BackLink = ({prevUrl}) => {

  return (
    <div className="backLink">
      <Link to={prevUrl == undefined ? "/" : prevUrl}>{prevUrl == undefined ? "Home" : "Back"}</Link>
    </div>
  )
}

export default BackLink