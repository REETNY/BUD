import React from 'react';
import { TypeAnimation } from 'react-type-animation';


const HomeFooter = () => {

  let screenHeight = window.innerHeight;
  let screenWidth = window.innerWidth;
  console.log(screenWidth)

  let date = new Date().getFullYear();

  return (
    <section className="homeFooter">
      {/* AJUDE SHAMSDIEEN 2023 {date == 2023 ? `` : `- ${date}`} All copyrights reserved  */}
      <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        'My Name is Shamsideen Olanrewaju, Ajide',
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        'I am a frontend developer',
        1000,
        'I build both static and dynamic websites and web application',
        1000,
        `AJIDEX 2023 ${date == 2023 ? `` : `- ${date}`} All copyrights reserved`,
        1000
      ]}
      wrapper="div"
      speed={30}
      style={{ fontSize: `calc(10px + .7vmax)`, display: 'inline-block' }}
      repeat={Infinity}
    />
    </section>
  )
}

export default HomeFooter