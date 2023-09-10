import React from 'react';
import HomeHeader from '../Headers/HomeHeader';
import HomeFooter from '../Footers/HomeFooter';
import { Outlet } from 'react-router-dom';
import XSNav from "../Components/XSNav.jsx"
import { useState } from 'react';

const HomeLayOut = () => {

  const [isOpen, setActive] = useState(false);  // for making link container active in small device 

  const [isLogged, setLogged] = useState(() => {
    let LS = JSON.parse(localStorage.getItem("isLogged")) || {};
    return LS.isLogged != undefined ? LS.isLogged : false
  });

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

  const refresh = () => {
    setLogged(() => true);
  }

  const refresh2 = () => {
    setLogged(() => false);
  }


  return (
    <section className="homePageSection">
        <HomeHeader userLogged={isLogged} userOut={refresh2} isOpenBool={isOpen} func={closeHam} isHamActiveFunc={isHamActive} />
        <Outlet context={refresh} id="mainOutLet" />
        <XSNav userOut={refresh2} userLogged={isLogged} func={closeHam} isOpenBool={isOpen}/>
        <HomeFooter />
    </section>
  )
}

export default HomeLayOut