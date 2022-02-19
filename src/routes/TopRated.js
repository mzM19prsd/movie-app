import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../config';

export default function TopRated() {
    const [Movies, setMovies] = useState([]);
    const [page, setpage] = useState(1);

    const getMovies = () => {
        const EndPoint = `${API_URL}movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`;
        fetch(EndPoint)
            .then(response => response.json())
            .then(response => {
                setMovies([...Movies, ...response.results])
                setpage(page + 1)
            })
    }
    const load = () => {
        getMovies()
    }
    useEffect(() => {
        getMovies()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (<div>
        <div className='roww'>
            {Movies && Movies.map(movie => (
                <div key={movie.id} className='Thumbnail'>
                    <Link to={`/movie=${movie.id}`}>
                        <img src={`${IMAGE_BASE_URL}w200${movie.poster_path}`} alt={movie.original_title}
                            className='ThumbnailImg'>
                        </img>
                    </Link>

                </div>
            ))}
        </div>
        <div className='loadbox'>
            <button className='loadbtn' onClick={load}>Load More</button>
        </div>
    </div>);
}
