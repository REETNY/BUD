import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { FaArrowLeft } from 'react-icons/fa';

const HomeHeader = ({isHamActiveFunc, isOpenBool}) => {

  const [searchInput, setSearchInput] = useState("");  // for search inputs

  const [smallSearch, setSmallSearch] = useState(false); // for making search container active in small device

  const activeStyles = {
    borderBottom: "2px solid #ecb318"
  }

  const openSmall = () => {
    setSmallSearch(() => true);
  }

  const closeSmall = () => {
    setSmallSearch(() => false);
  }

  let navigate = useNavigate();



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