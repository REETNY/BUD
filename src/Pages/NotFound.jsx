import React from 'react';
import Lottie from "lottie-react";
import NotFoundAnimation from "../Externals/404.json";

const NotFound = () => {

  const options = {
    animationData: NotFoundAnimation,
    loop: true,
  };

  return (
    <div style={{width: "100%", height: "100%"}}>
      <Lottie animationData={NotFoundAnimation} loop={true} style={{height: "100%"}} />
    </div>
  )
}

export default NotFound