import React from 'react';
import HomeHeader from '../Headers/HomeHeader';
import HomeFooter from '../Footers/HomeFooter';
import { Outlet } from 'react-router-dom';
import XSNav from '../Components/xsNav';
import { useState } from 'react';

const HomeLayOut = () => {

  const [isOpen, setActive] = useState(false);  // for making link container active in small device 

  const isHamActive = (e) => {
    let allClasses = [...e.target.classList];
    if(allClasses.includes("active")){
      e.target.classList.remove("active");
      setActive(() => false)
    }else{
      e.target.classList.add("active");
      setActive(() => true)
    }
  }

  const closeHam = () => {
    setActive(() => false)
  }


  return (
    <section className="homePageSection">
        <HomeHeader isOpenBool={isOpen} isHamActiveFunc={isHamActive} />
        <Outlet id="mainOutLet" />
        <XSNav func={closeHam} isOpenBool={isOpen}/>
        <HomeFooter />
    </section>
  )
}

export default HomeLayOut