import React from 'react'

const LoadingAnimation = () => {
    // cube animation
    let ani1 = 
    <div className="cube-loader">
        <div className="cube-top" />
        <div className="cube-wrapper">
          <span style={{"--i":"0"}} className="cube-span" />
          <span style={{"--i":"1"}} className="cube-span" />
          <span style={{"--i":"2"}} className="cube-span" />
          <span style={{"--i":"3"}} className="cube-span" />
        </div>
    </div>

    // hand animation
    let ani2 = 
    <div className="🤚">
        <div className="👉" />
        <div className="👉" />
        <div className="👉" />
        <div className="👉" />
        <div className="🌴" />		
        <div className="👍" />
    </div>

    // spiral animation
    let ani3 = 
    <div className="bar">
      <div className="ball"></div>
    </div>

    // hamster animation
    let ani4 = 
    <div aria-label="Orange and tan hamster running in a metal wheel" role="img" className="wheel-and-hamster">
        <div className="wheel" />
        <div className="hamster">
          <div className="hamster__body">
            <div className="hamster__head">
              <div className="hamster__ear" />
              <div className="hamster__eye" />
              <div className="hamster__nose" />
            </div>
            <div className="hamster__limb hamster__limb--fr" />
            <div className="hamster__limb hamster__limb--fl" />
            <div className="hamster__limb hamster__limb--br" />
            <div className="hamster__limb hamster__limb--bl" />
            <div className="hamster__tail" />
          </div>
        </div>
        <div className="spoke" />
    </div>

    // loading rings
    let ani5 = 
    <div id="page">
        <div id="container">
        <div id="ring" />
        <div id="ring" />
        <div id="ring" />
        <div id="ring" />
        <div id="h3">loading</div>
        </div>
    </div>

    let ani6 = 
    <div className="pyramid-loader">
      <div className="wrapper">
        <span className="side side1"></span>
        <span className="side side2"></span>
        <span className="side side3"></span>
        <span className="side side4"></span>
        <span className="shadow"></span>
      </div>
    </div>


    let ranAni = [ani1, ani2, ani3, ani4, ani5, ani6];

  return (
    <section className="loadAnimate">
      {ranAni[Math.floor(Math.random() * ranAni.length)]}s
    </section>
  )
}

export default LoadingAnimation