import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./Home.css"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Link } from "react-router-dom";
import MovieList from "../components/movieList/MovieList";

const Home = () => {
    
    const [ popularMovies, setPopularMovie ] = useState([]);

    useEffect(() => {
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=727d4be56cbb5ba696d271608baef3f9&language=en-US")
        .then(res => res.json())
        .then(data => setPopularMovie(data.results))

    }, []);

    return (
        <div>
            <div className="poster">
                <Carousel
                    autoPlay={true}
                    transitionTime={3}
                    infiniteLoop={true}
                    showStatus={false}
                    showThumbs={false}
                >
                    {
                        popularMovies.map(movie => (
                            <Link style={{textDecoration: "none", color:"white"}} to={`/movie${movie.id}`}>
                                <div className="posterImg">
                                    <img src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`} alt=""/>
                                </div>
                                <div className="posterImg__overlay">
                                    <div className="posterImg__title">{movie ? movie.original_title:"Title Unknown"}</div>
                                    <div className="posterImg__runtime">
                                        {movie ? movie.release_date: ""}
                                        <span className="posterImg__rating">
                                            {movie ? movie.vote_average : ""}
                                            <i className="fas fa-star"/>{" "}
                                        </span>
                                    </div>
                                    <div className="posterImg__des">
                                        {movie ? movie.overview : ""}
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </Carousel>
                <MovieList />
            </div>
        </div>
    );
}

export default Home;