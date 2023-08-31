import React from 'react';
import { Outlet } from 'react-router-dom';
import TV_Movie_Header from '../Headers/TV_Movie_Header';

const Movie_TVLayOut = () => {
  return (
    <section className="fullWidthCont">
      <TV_Movie_Header />
      <Outlet />
    </section>
  )
}

export default Movie_TVLayOut