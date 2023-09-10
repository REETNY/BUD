import React from 'react';
import { NavLink } from 'react-router-dom';
import { AiFillLike } from 'react-icons/ai';
import { BiMoviePlay } from 'react-icons/bi';

const UserViewerHead = () => {
  return (
    <div className="tv_movieHead">
       <ul className="links">
            <li>
                <NavLink end style={({isActive}) => isActive ? {borderColor: `#ecb318`, color: "#ecb318"} : {}} to=".">All </NavLink>
            </li>
            <li>
                <NavLink style={({isActive}) => isActive ? {borderColor: `rgb(245, 24, 91)`, color: "rgb(245, 24, 91)"} : {}} to="watch">Watch <BiMoviePlay style={{fontSize: "22px"}} /> </NavLink>
            </li>
            <li>
                <NavLink style={({isActive}) => isActive ? {borderColor: `#1DA1F2`, color: "#1DA1F2"} : {}} to="liked">Liked <AiFillLike  style={{fontSize: "22px"}} /> </NavLink>
            </li>
        </ul>
    </div>
  )
}

export default UserViewerHead