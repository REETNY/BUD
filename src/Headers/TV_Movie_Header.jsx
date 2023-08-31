import React from 'react'
import { NavLink } from 'react-router-dom'

const TV_Movie_Header = () => {
  return (
    <header className="tv_movieHead">
        <ul className="links">
            <li>
                <NavLink end style={({isActive}) => isActive ? {borderColor: `#ecb318`, color: "#ecb318"} : {}} to=".">Movies</NavLink>
            </li>
            <li>
                <NavLink style={({isActive}) => isActive ? {borderColor: `#ecb318`, color: "#ecb318"} : {}} to="tv">TV Shows</NavLink>
            </li>
        </ul>
    </header>
  )
}

export default TV_Movie_Header