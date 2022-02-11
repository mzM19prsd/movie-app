import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../config';

export default function Search() {
    const [SearchedMovie, setSearchedMovie] = useState([]);
    const [page, setpage] = useState(1);
    let params = useParams();

    const req = () => {
        const get = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&page=${page}&query=${params.query}`;
        fetch(get)
            .then(response => response.json())
            .then(response => {
                setSearchedMovie([...SearchedMovie, ...response.results])
                setpage(page + 1)
            })
    }
    const load = () => {
        req()
    }
    useEffect(() => {
        req()
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
    console.log(SearchedMovie)
    return (<div>

        <div>
            {SearchedMovie &&
                SearchedMovie.length === 0 ? `No results found for "${params.query}"`
                : SearchedMovie.map(movie => (
                    <div className='media'>
                        <Link to={`/movie=${movie.id}`}>
                            <img src={movie.poster_path ?
                                `http://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfhHjGKnmhhOHQJnokGExLJjmKiCxLrfzHow&usqp=CAU'}
                                alt={movie.original_title}
                                style={{
                                    width: '150px', height: '225px',
                                    objectFit: 'cover',
                                    objectPosition: 'center',
                                    borderRadius: '10px 0 0 10px'
                                }}
                            />
                        </Link>
                        <div style={{ padding: '0 1.75rem' }}>
                            <h4>
                                <Link to={`/movie=${movie.id}`}>{movie.title}</Link>
                                <span style={{ marginLeft: '2rem', fontSize: '1.5rem' }}
                                    className={`tag ${setVoteClass(movie.vote_average)}`}>{movie.vote_average}
                                </span>
                            </h4>
                            <p className='gray'>{movie.release_date}</p>
                            <p className='descOverview'>{movie.overview}</p>
                        </div>
                    </div>
                ))
            }

        </div>
        <div className='loadbox'>
            {SearchedMovie.length > 19 &&
                <button className='loadbtn' onClick={load}>Load More</button>}
        </div>

    </div >);
}
