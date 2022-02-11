import { useEffect, useState, useRef } from 'react';
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


    const setVoteClass = (vote) => {
        if (vote >= 8) {
            return "green";
        } else if (vote >= 6) {
            return "orange";
        } else {
            return "red"
        }
    }
    return (<div className='homerow'>
        <div className='homecol-1'>
            <section >
                <h4 className='linetag '>
                    <Link to={`/popular`}>
                        Popular Movies
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
                            </Link>
                            <div className='desc'>
                                <span className='descTitle'>{movie.title}</span>
                                <span className={`tag ${setVoteClass(movie.vote_average)}`}>
                                    {movie.vote_average}
                                </span>
                            </div>
                            <span className='viewcount' style={{
                                position: 'absolute',
                                top: '7px', right: '7px'
                            }}>
                                <i class='bx bx-show' ></i> {movie.vote_count}
                            </span>
                        </article>
                    ))}
                </div>
            </section>

            <section >
                <h4 className='linetag '>
                    <Link to={`/toprated`}>
                        TopRated Movies
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
                            </Link>
                            <div className='desc'>
                                <span className='descTitle'>{movie.title}</span>
                                <span className={`tag ${setVoteClass(movie.vote_average)}`}>
                                    {movie.vote_average}
                                </span>
                            </div>
                            <span className='viewcount' style={{
                                position: 'absolute',
                                top: '7px', right: '7px'
                            }}>
                                <i class='bx bx-show' ></i> {movie.vote_count}
                            </span>
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
                    <div
                        style={{
                            backgroundImage: `url(${IMAGE_BASE_URL}w300${movie.backdrop_path})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            width: '80%', height: "130px",
                            borderRadius: '5px',
                            marginBottom: '2rem',
                            position: 'relative'
                        }}
                    >
                        <span className='viewcount' style={{
                            position: 'absolute',
                            top: '7px', right: '7px'
                        }}>
                            <i class='bx bx-show' ></i> {movie.vote_count}
                        </span>
                        <Link to={`/movie=${movie.id}`}
                            style={{
                                position: 'absolute',
                                bottom: '25px', left: '0',
                                padding: '0 6px 0 13px'
                            }}>
                            {movie.title}
                        </Link>

                    </div>
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
                                    style={{ width: '90px', height: '135px' }} />
                            </Link>
                        </div>
                        <div style={{
                            padding: '1rem 1.25rem'
                        }}>
                            <p className='descTitle'>
                                <Link to={`/movie=${movie.id}`}>
                                    {movie.title}</Link>
                            </p>
                            <p className='gray'>{movie.release_date}</p>
                        </div>
                    </div>
                ))}
            </section>
        </div>

    </div>);
}
