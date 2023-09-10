import './App.css';

import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route, redirect } from 'react-router-dom';

// layouts
import HomeLayOut from './Layouts/HomeLayOut';
import DataViewerLayOut from './Layouts/DataViewerLayOut';
import Movie_TVLayOut from './Layouts/Movie_TVLayOut';
import DataViewer2 from './Layouts/DataViewer2';
import UserViewLayOut from './Layouts/UserViewLayOut';

// pages
import HomePage from './Pages/HomePage';
import Others from './Pages/Others';
import Details from './Pages/Details';
import Trailer from './Pages/Trailer';
import Anime from './Pages/Anime';
import Manga from './Pages/Manga';
import Movies from './Pages/Movies';
import TV_Show from './Pages/TV_Show';
import Search from './Pages/Search';
import Liked from './Pages/Liked';
import WatchLater from './Pages/WatchLater';
import UserIndex from './Pages/UserIndex';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';

import NotFound from './Pages/NotFound';

import Details2 from './Pages/Details2';
import Trailer2 from './Pages/Trailer2';
import Extras from './Pages/Extras';
import More from './Pages/More';

//  check user last activity if it exist

let checkUser = JSON.parse(localStorage.getItem("isLogged")) || {};

if(checkUser != {}){
  let timeExpiry = new Date(checkUser.timeDate).getTime();
  let currentTime = new Date().getTime();
  let maxHour = (24*60*60*1000);
  let minus  = currentTime - timeExpiry;
  
  minus > maxHour ? localStorage.removeItem("isLogged"): console.log("logged");
}



function App() {

  const checkUser = () => {
    let LS = JSON.parse(localStorage.getItem("isLogged")) || {};
    return LS.isLogged != undefined ? LS.isLogged : false
  }

  const routesCreated = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<HomeLayOut />} >
      <Route index element={<HomePage />} />
      <Route path='anime' element={<Anime />} />
      <Route path='manga' element={<Manga />} />
      <Route path='q' element={<Search />} />

      <Route path=':type/:id' element={<DataViewerLayOut />} >
        <Route index element={<Details />} />
        <Route path='others' element={<Others />} />
        <Route path='trailer' element={<Trailer />} />
      </Route>

      <Route path='movies_tv' element={<Movie_TVLayOut />} >
        <Route index element={<Movies />} />
        <Route path='tv' element={<TV_Show />} />
      </Route>

      <Route path='movies_tv/:type/:id' element={<DataViewer2 />} >
        <Route index element={<Details2 />} />
        <Route path='other' element={<More />} />
        <Route path='extras' element={<Extras />} />
        <Route path='trailer' element={<Trailer2 />} />
      </Route>

      <Route path='user' element={<UserViewLayOut />} >
        <Route loader={() => {
          if(!checkUser()){
            return redirect('/signin?navTo=user&message=You need to login to access this page');
          }
          return null
        }} index element={<UserIndex />} />
        <Route loader={() => {
          if(!checkUser()){
            return redirect('/signin?navTo=user/watch&message=You need to login to access this page');
          }
          return null
        }} path='watch' element={<WatchLater />} />
        <Route loader={() => {
          if(!checkUser()){
            return redirect('/signin?navTo=user/liked&message=You need to login to access this page');
          }
          return null
        }} path='liked' element={<Liked />} />
      </Route>

      <Route path='*' element={<NotFound />} />

      <Route path='signin' element={<Login />} />

      <Route path='signup' element={<SignUp />} />

    </Route>
  ))

  return (
    <RouterProvider router={routesCreated} />
  )
}

export default App
