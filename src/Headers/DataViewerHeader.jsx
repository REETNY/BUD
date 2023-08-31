import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import BackLink from '../Components/BackLink';

const DataViewerHeader = ({headData, currType, prevLink}) => {

    let {url, images, title, type, volumes, episodes} = headData;

    const activeStyles = {
        borderBottom: "2px solid #ecb318"
    }

  return (
    <header id='dataViewerHead'>

        <BackLink prevUrl={prevLink}/>

        <section className="demonstrate">

            <div className="dataImg">
                <img src={images.webp.image_url} alt={title} />
            </div>

            <div className="someInfos">
                <div className="dets">
                    <span className="detHead">Title:</span>
                    <span className="detData">{title}</span>
                </div>
                <div className="dets">
                    <span className="detHead">Type:</span>
                    <span className="detData">{type}</span>
                </div>
                {currType == "manga" && <div className="dets">
                    <span className="detHead">Volume:</span>
                    <span className="detData">{volumes}</span>
                </div>}
                {currType == "anime" && <div className="dets">
                    <span className="detHead">Episodes:</span>
                    <span className="detData">{episodes}</span>
                </div>}
                <div className="dets">
                    <span className="detHead">Link:</span>
                    <span className="detData">{<Link to={url}>See More Here</Link>}</span>
                </div>
            </div>
        </section>

        <nav className="dataViewerNavigate">
            <ul>
                <li id='viewerLink'>
                    <NavLink end style={({isActive}) => isActive ? activeStyles : {}} to=".">Details</NavLink>
                </li>
                <li id='viewerLink'>
                    <NavLink style={({isActive}) => isActive ? activeStyles : {}} to="others">Others</NavLink>
                </li>
                {currType == "anime" ? <li id='viewerLink'>
                    <NavLink style={({isActive}) => isActive ? activeStyles : {}} to="trailer">Trailer</NavLink>
                </li> : ""}
            </ul>
        </nav>
    </header>
  )
}

export default DataViewerHeader