import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUserAlt } from "react-icons/fa";



const XSNav = ({isOpenBool, func, userLogged}) => {


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
            {!userLogged && <li className="links">
                <NavLink onClick={() => func()} style={({isActive}) => isActive ? activeStyles : {}} to="signin" >Signin</NavLink>
            </li>}

            {userLogged && <li className="links">
                <NavLink onClick={() => func()} style={({isActive}) => isActive ? activeStyles : {}} to="user" >User</NavLink>
            </li>}

            {userLogged && <li className="links" id='isUser' style={{position: "relative"}} >
              <NavLink style={({isActive}) => isActive ? activeStyles : {}} to="settings" >
                <FaUserAlt onClick={() => func()} style={{fontSize: "19px"}} />
              </NavLink>
            </li>}
        </ul>
    </div>
  )
}

export default XSNav