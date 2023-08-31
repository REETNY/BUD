import React from 'react';
import { NavLink } from 'react-router-dom';

const XSNav = ({isOpenBool, func}) => {

    const activeStyles = {
        borderBottom: "2px solid #ecb318"
    }

  return (
    <div className={isOpenBool ? `xmNav active` : `xmNav`}>
        <ul className="xmLinks">
        <li className="links">
            <NavLink onClick={() => func()} end style={({isActive}) => isActive ? activeStyles : {}} to="/" >Home</NavLink>
        </li>
        <li className="links">
            <NavLink onClick={() => func()} style={({isActive}) => isActive ? activeStyles : {}} to="anime" >Anime</NavLink>
        </li>
        <li className="links">
            <NavLink onClick={() => func()} style={({isActive}) => isActive ? activeStyles : {}} to="manga" >Manga</NavLink>
        </li>
        <li className="links">
            <NavLink onClick={() => func()} style={({isActive}) => isActive ? activeStyles : {}} to="movies_tv" >Movies/TV</NavLink>
        </li>
        </ul>
    </div>
  )
}

export default XSNav