import React, { useEffect, useRef, useState } from 'react';
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import axios from './axios';
import './Row.css';

const Row = ({ title, fetchUrl, isLargeRow = false }) => {
    const videoTrailerRef = useRef();
    const [movies, setMovies] = useState([]);
    const base_url = "https://image.tmdb.org/t/p/original/";
    const [trailerUrl, setTrailerUrl] = useState('');

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request?.data.results);
            return request;
        }
        fetchData();

        return () => fetchData();
    }, [fetchUrl]);

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
            autoplay: 1
        },
    };

    const handleClick = (movie) => {
        movieTrailer(movie?.title || movie?.name || movie?.original_name || ' ')
            .then((url) => {
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get('v'));
            })
            .catch((error) => {
                console.log(error)
                setTrailerUrl("");
            });
    };

    return (
        <div ref={videoTrailerRef} className="row">
            <h2>{title}</h2>
            <div className="row__posters">
                {
                    movies.map((movie) => (
                        (
                            (isLargeRow && movie.poster_path) ||
                            (!isLargeRow && movie.backdrop_path)
                        ) && (
                            <img
                                key={movie.id}
                                alt={movie.name}
                                onClick={() => handleClick(movie)}
                                className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
                                src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                            />
                        )
                    ))
                }
            </div>
            {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
        </div>
    );
};

export default Row;
