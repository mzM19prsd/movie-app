import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from "react-router-dom";

function App() {
  const [search, setsearch] = useState('');
  const [Menu, setMenu] = useState(true);
  let navigate = useNavigate();
  const searchOnsubmit = (e) => {

    navigate(`/search=${search}`);
  }
  const clickMenu = () => {
    setMenu(!Menu)
  }

  return (
    <div className="App wrapper" >
      <header id='header'>
        <nav className='navwrap'>
          <div className='navtop'>
            <Link to={`/`} className='logo'>
              Movie DB
            </Link>
            <button id='menuBtn'
              onClick={clickMenu}>
              <i className='bx bx-menu'></i>
            </button>
          </div>

          <ul className={`navlist ${Menu ? "hideMenu" : "menu"}`}>
            <li>  <Link to={`/popular`}>Popular</Link></li>
            <li>  <Link to={`/toprated`}>Top Rated</Link></li>
            <li>  <Link to={`/upcoming`}>Upcoming</Link></li>
          </ul>

          <div id='formdiv'
            className={Menu && "hideMenu"}>
            <form onSubmit={searchOnsubmit}>

              <input type='search' id='searchquery'
                className='searchinput' placeholder='Search movie...'
                value={search}
                onChange={(e) => { setsearch(e.target.value) }}>
              </input>
            </form>
          </div>
        </nav>
      </header>

      <main className='contain'>
        <Outlet />
      </main>

      <footer>
        <div className='footer'>

          <p className='gray' style={{
            textAlign: 'center', margin: '7px 0'
          }}>
            bj805225@gmail.com  ｜
            <a href='#header'> Top</a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
