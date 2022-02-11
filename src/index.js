import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import App from "./App";
import Home from './routes/Home';
import Movie from './routes/Movie';
import Popular from './routes/Popular';
import Search from './routes/Search';
import TopRated from './routes/TopRated';
import Upcoming from './routes/Upcoming';


const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>

      <Route path="/" element={<App />} >
        <Route index element={<Home />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/toprated" element={<TopRated />} />
        <Route path="/upcoming" element={<Upcoming />} />
        <Route path="/search=:query" element={<Search />} />
        <Route path="/movie=:movieId" element={<Movie />} />
      </Route>


    </Routes>
  </BrowserRouter>,
  rootElement
);