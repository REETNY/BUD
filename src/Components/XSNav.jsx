import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUserAlt } from "react-icons/fa";



const XSNav = ({isOpenBool, func, userLogged}) => {


    const activeStyles = {
        borderBottom: "2px solid #ecb318"
    }

    const userData = JSON.parse(localStorage.getItem("signedUser")) || [];

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
              <NavLink style={({isActive}) => isActive ? activeStyles : {}} to="user" >{userData.username}</NavLink>
            </li>}

            {userLogged && <li className="links" id='isUser' style={{position: "relative"}} >
                
              {
                userData.avatar == ""
                ?
                  <NavLink style={({isActive}) => isActive ? activeStyles : {}} to="settings" >
                  <FaUserAlt style={{fontSize: "19px"}} />
                  </NavLink>
                :

                <NavLink to="settings" style={({isActive}) => isActive ? activeStyles : {}}>
                  <div className="userIcon" style={{width: "55px", height: "55px"}}>
                    <div className="iconTab" style={{width: "100%", height: "100%", borderRadius: "50%", overflow: "hidden", position: "relative"}}>

                      <span className="coloredItem">
                        <div className="box"></div>
                        <div className="box"></div>
                        <div className="box"></div>
                        <div className="box"></div>
                      </span>

                      <div className="iconCont" style={{width: "100%", height: "100%", overflow: "hidden",  display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "50%", background: "rgb(225, 225, 225, .3)", zIndex: "9999"}}>

                        <div className="iconImg" style={{width: "85%", height: "85%", overflow: "hidden", zIndex: "999"}}>

                          <img src={userData.avatar} alt="" style={{width: "100%", height: "100%", borderRadius: "50%", zIndex: "99"}} />

                        </div>

                      </div>

                    </div>
                  </div>
                </NavLink>

              }

            </li>}
        </ul>
    </div>
  )
}

export default XSNav