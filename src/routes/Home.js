import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../config';
import Slide from './Slide';

export default function Home() {
    const [Popular, setPopular] = useState([]);
    const [TopRated, setTopRated] = useState([]);
    const [Upcoming, setUpcoming] = useState([]);
     const [Trending, setTrending] = useState([]);

    useEffect(() => {
        const popular = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        const toprate = `${API_URL}movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;
        const upcoming = `${API_URL}movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=US`;
        const trending = `${API_URL}trending/movie/week?api_key=${API_KEY}&language=en-US&page=1`;

        fetch(popular)
            .then(response => response.json())
            .then(response => {
                setPopular([...response.results.slice(0, 4)])
            })
        fetch(toprate)
            .then(response => response.json())
            .then(response => {
                setTopRated([...response.results.slice(0, 4)])
            })
        fetch(upcoming)
            .then(response => response.json())
            .then(response => {
                setUpcoming([...response.results.slice(0, 4)])
            })
        fetch(trending)
            .then(response => response.json())
            .then(response => {
                setTrending([...response.results.slice(0,4)])
            })   
    }, [])
    return (
        <div>
            <div className='carousel'>
               <Slide trending={Trending} />
            </div>
            <div className='homerow'>
        <div className='homecol-1'>
            <section >
                <h4 className='linetag '>
                    <Link to={`/popular`}>
                        Popular Movies
                    </Link>
                    <Link to={`/popular`} className='viewMore'>
                        view more ≫
                    </Link>
                </h4>
                <div className='imgbox'>
                    {Popular && Popular.map(movie => (
                        <article key={movie.id}>
                            <Link to={`/movie=${movie.id}`} >
                                <img src={`${IMAGE_BASE_URL}w200${movie.poster_path}`}
                                    alt={movie.original_title}
                                    className='poster'>
                                </img>
                                <div className='infoContainer scroll'>
                                    <div style={{padding:'0 1rem'}}>
                                        <h4>{movie.title}</h4>
                                        <p>
                                            {movie.overview}
                                        </p>
                                    </div>
                                </div>
                            </Link>                         
                        </article>
                    ))}
                </div>
            </section>

            <section >
                <h4 className='linetag '>
                    <Link to={`/toprated`}>
                    TopRated Movies
                    </Link>
                    <Link to={`/toprated`} className='viewMore'>
                        view more ≫
                    </Link>
                </h4>
                <div className='imgbox'>
                    {TopRated && TopRated.map(movie => (
                        <article key={movie.id}>
                            <Link to={`/movie=${movie.id}`} >
                                <img src={`${IMAGE_BASE_URL}w200${movie.poster_path}`}
                                    alt={movie.original_title}
                                    className='poster'>
                                </img>
                                <div className='infoContainer scroll'>
                                    <div style={{padding:'0 1rem'}}>
                                        <h4>{movie.title}</h4>
                                        <p>
                                            {movie.overview}
                                        </p>
                                    </div>
                                </div>
                            </Link>                         
                        </article>
                    ))}
                </div>
            </section>

           
        </div>
        <div className='homecol-2'>
           
            <section>
                <h4 className='linetag'>
                    <Link to={`/upcoming`}>
                        Upcoming Movies
                    </Link>
                </h4>
                {Upcoming && Upcoming.map(movie => (
                    <div key={movie.id}
                        style={{ display: 'flex', marginBottom: '1.25rem' }}>
                        <div>
                            <Link to={`/movie=${movie.id}`}>
                                <img src={`${IMAGE_BASE_URL}w200${movie.poster_path}`}
                                    style={{ width: '100px', height: '150px' }}
                                    alt={movie.original_title} />
                            </Link>
                        </div>
                        <div style={{
                            padding: '0 1.25rem'
                        }}>
                            <h4 className='descTitle'>
                                <Link to={`/movie=${movie.id}`}>
                                    {movie.title}</Link>
                            </h4>
                            <p className='gray'>{movie.release_date}</p>
                        </div>
                    </div>
                ))}
            </section>
        </div>

    </div>
        </div>
    );
}
