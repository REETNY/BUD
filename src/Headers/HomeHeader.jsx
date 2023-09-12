import React from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { FaSearch, FaUserAlt } from "react-icons/fa";
import { FaArrowLeft } from 'react-icons/fa';

const HomeHeader = ({isHamActiveFunc, isOpenBool, func, userLogged}) => {

  const [searchInput, setSearchInput] = useState("");  // for search inputs

  const [smallSearch, setSmallSearch] = useState(false); // for making search container active in small device

  const activeStyles = {
    borderBottom: "2px solid #ecb318"
  }

  const userData = JSON.parse(localStorage.getItem("signedUser")) || [];

  const openSmall = () => {
    setSmallSearch(() => true);
  }

  const closeSmall = () => {
    setSmallSearch(() => false);
  }

  let navigate = useNavigate();

  let locate = useLocation();
  let path = locate.pathname;

  return (
    <div className="homeHeadStyle">
      <header className="headStyles">

        <div onClick={(e) => isHamActiveFunc(e)} className={isOpenBool ? `hamButton active` : `hamButton`}>
          <div className="hamLine"></div>
        </div>

        <div className="homeLogo">
          <span className="logo">BUD</span>
        </div>
        
        {/* search button and input for small device */}
        <div className="searchIconBtn">
          <FaSearch style={{color: `#ecb318`}} onClick={() => openSmall()} role='button' tabIndex="0" />
        </div>

        <div className={smallSearch ? `searchBoxForSmallDev` : `searchBoxForSmallDev remove`}>
          <div className="inputForSmallDev">
            <span className="closeSearch">
              <FaArrowLeft onClick={() => closeSmall()} role='button' className='closeArrow' tabIndex="0" />
            </span>
            <span className="searchBoxDev">
              <input type="text" id='smallDevInp' placeholder='type something in here' value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
              <FaSearch onClick={() => {
                if(searchInput == "")return;
                if(isOpenBool){
                  func()
                }
                navigate(`/q?search=${searchInput}`);
                setSmallSearch(() => false)
              }} role='button' tabIndex="0" className='callSearch' />
            </span>
          </div>
        </div>
        {/* end of search button and input for small device */}

        {/* search button and input for large device */}
        <div className="homeLinkNavs ForPC">
          <ul className="navLinks ForPC">
            <li className="links">
              <NavLink end style={({isActive}) => isActive ? activeStyles : {}} to="/" >Home</NavLink>
            </li>
            <li className="links">
              <NavLink style={({isActive}) => isActive ? activeStyles : {}} to="anime" >Anime</NavLink>
            </li>
            <li className="links">
              <NavLink style={({isActive}) => isActive ? activeStyles : {}} to="manga" >Manga</NavLink>
            </li>
            <li className="links">
              <NavLink style={({isActive}) => isActive ? activeStyles : {}} to="movies_tv" >Movies/TV</NavLink>
            </li>
            {!userLogged && <li className="links">
              <NavLink style={({isActive}) => isActive ? activeStyles : {}} to="signin" >Signin</NavLink>
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

          <div className="searchInputCont ForPC">
            <input type="text" 
              name="searchInputted"
              value={searchInput} id="searchBox" 
              onChange={(e) => {
                let searchBox = e.target.value;
                setSearchInput(searchBox)
              }}
              placeholder='search'
            />
            <span className="searchBtn">
              <FaSearch 
                role='button'
                tabIndex="0"
                onClick={() => {
                  if(searchInput == "")return;
                  navigate(`/q?search=${searchInput}`)
                }}
              />
            </span>
          </div>
        </div>
        {/* end of search button and input for large device */}

      </header>
    </div>
  )
}

export default HomeHeader