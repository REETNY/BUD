import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUserAlt } from "react-icons/fa";
import { useNavigate, useLocation } from 'react-router-dom';



const XSNav = ({isOpenBool, func, userLogged, userOut}) => {

    let navigate =  useNavigate();
    let locate = useLocation();

    let path = locate.pathname;

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
            {userLogged && <li className="links" id='isUser' style={{position: "relative"}} >
              <NavLink style={({isActive}) => isActive ? activeStyles : {}} to="user" >
                <FaUserAlt onClick={() => func()} style={{fontSize: "19px"}} />
              </NavLink>

                <div className="userSettz" >

                    <span className="userLog" style={{border: "2px solid white", fontSize: "14px", fontWeight: "700", padding: "3px 8px", borderRadius: "13.5px"}} onClick={() => {
                        userOut();
                        func();
                        localStorage.removeItem("isLogged");
                        if(path.includes("/user")){
                            navigate("/");
                        }

                    }}>Log Out</span>
                </div>
            </li>}
        </ul>
    </div>
  )
}

export default XSNav