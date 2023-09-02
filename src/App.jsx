import './App.css';

import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom';

// layouts
import HomeLayOut from './Layouts/HomeLayOut';
import DataViewerLayOut from './Layouts/DataViewerLayOut';
import Movie_TVLayOut from './Layouts/Movie_TVLayOut';
import DataViewer2 from './Layouts/DataViewer2';

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

import NotFound from './Pages/NotFound';

import Details2 from './Pages/Details2';
import Trailer2 from './Pages/Trailer2';
import Extras from './Pages/Extras';
import More from './Pages/More';



function App() {

  console.log("data");

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

      <Route path='*' element={<NotFound />} />

    </Route>
  ))

  return (
    <RouterProvider router={routesCreated} />
  )
}

export default App
