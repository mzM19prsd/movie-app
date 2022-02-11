import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { API_KEY, API_URL, IMAGE_BASE_URL } from "../config"

function Movie() {
    const [Movie, setMovie] = useState([]);
    const [MovieCrew, setMovieCrew] = useState([]);
    let params = useParams();
    useEffect(() => {
        fetch(`${API_URL}movie/${params.movieId}?api_key=${API_KEY}&language=en-US`)
            .then(response => response.json())
            .then(response => { setMovie(response) })
        fetch(`${API_URL}movie/${params.movieId}/credits?api_key=${API_KEY}&language=en-US`)
            .then(response => response.json())
            .then(response => { setMovieCrew([...response.cast]) })
    }, [])
    console.log(MovieCrew)
    const setVoteClass = (vote) => {
        if (vote >= 8) {
            return "green";
        } else if (vote >= 6) {
            return "orange";
        } else {
            return "red"
        }
    }

    return (<div>

        <div>
            {Movie &&
                <div className='moviewrap'>
                    <div>
                        <img className='movieposter'
                            src={`${IMAGE_BASE_URL}w300${Movie.poster_path}`}></img>
                    </div>
                    <div className='movieResults'>
                        <h3>{Movie.title}
                            <span style={{ marginLeft: '2rem', fontSize: '1.5rem' }}
                                className={`tag ${setVoteClass(Movie.vote_average)}`}>{Movie.vote_average}</span>
                        </h3>
                        <p className='gray'>
                            {Movie.release_date}, <strong>{`${Math.floor(Movie.runtime / 60)}h ${Movie.runtime % 60}m`}</strong>
                        </p>
                        <div style={{ display: 'flex', listStyle: 'none', flexWrap: 'wrap', gap: '1rem', fontSize: '1rem' }}> {Movie.genres &&
                            Movie.genres.map(genre => <li className='genrestag'>{genre.name}</li>)
                        }</div>

                        <h4 style={{ paddingBottom: '0.5rem', borderBottom: '1px solid white' }}>
                            Over view
                        </h4>
                        <p>{Movie.overview}</p>
                    </div>
                </div>
            }

        </div>
        <div>
            <h3>Cast</h3>
            <div className='scroll'
                style={{ display: 'flex', gap: '2rem', overflowX: 'scroll' }}>
                {MovieCrew && MovieCrew.map(cast => (<div style={{ marginBottom: '1rem' }}>
                    <div key={cast.id}>
                        <img src={cast.profile_path ? `${IMAGE_BASE_URL}w200${cast.profile_path}` :
                            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfhHjGKnmhhOHQJnokGExLJjmKiCxLrfzHow&usqp=CAU'}
                            alt={cast.name} style={{
                                width: '160px', height: '240px'
                            }}></img>
                    </div>
                    <div >
                        <p style={{ paddingTop: '0.5rem' }}>{cast.name}</p>
                        <p className='gray'>{cast.character}</p>
                    </div>
                </div>))}
            </div>
        </div>

    </div >);
}


export default Movie;
