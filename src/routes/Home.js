import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../config';

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
                setPopular([...response.results])
            })
        fetch(toprate)
            .then(response => response.json())
            .then(response => {
                setTopRated([...response.results])
            })
        fetch(upcoming)
            .then(response => response.json())
            .then(response => {
                setUpcoming([...response.results])
            })
        fetch(trending)
            .then(response => response.json())
            .then(response => {
                setTrending([...response.results])
            })
    }, [])

    return (<div className='homerow'>
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
                    {Popular && Popular.slice(0, 4).map(movie => (
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
                    {TopRated && TopRated.slice(0, 4).map(movie => (
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

            <section>
                <h4 className='linetag '>Trailer</h4>
                <div className='video'>
                    <iframe width="90%" height="100%"
                        src="https://www.youtube.com/embed/FKAbTcss1ow"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen
                    >
                    </iframe>
                </div>
            </section>
        </div>
        <div className='homecol-2'>
            <section>
                <h4 className='linetag'>
                    Trending Movies
                </h4>
                {Trending && Trending.slice(0, 4).map(movie => (
                    <Link to={`/movie=${movie.id}`} key={movie.id}>
                    <div className='asideMovie'
                    style={{
                            backgroundImage: `url(${IMAGE_BASE_URL}w300${movie.backdrop_path})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center center',
                            backgroundSize: 'cover',
                            width: '80%', height: "140px",
                            borderRadius: '5px',
                            marginBottom: '2rem',
                            position: 'relative'
                        }}
                    >
                        <span className='viewcount' style={{
                            position: 'absolute',
                            top: '7px', right: '7px'
                        }}>
                            <i className='bx bx-show' ></i> {movie.vote_count}
                        </span>
                                <h4  style={{
                                position: 'absolute',
                                bottom: '25px', left: '0',
                                padding: '0 6px 0 13px'
                            }}>
                                {movie.title}
                            </h4>
                    </div>
                    </Link>
                ))}
            </section>
            <section>
                <h4 className='linetag'>
                    <Link to={`/upcoming`}>
                        Upcoming Movies
                    </Link>
                </h4>
                {Upcoming && Upcoming.slice(0, 4).map(movie => (
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

    </div>);
}
