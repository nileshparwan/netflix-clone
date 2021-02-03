import React from 'react';
import Nav from './Nav';
import Banner from './Banner';
import Rows from './Row'; 
import requests from './Requests';

import './HomeScreen.css';

const HomeScreen = () => {
    return (
        <div className="homeScreen">
            <Nav />

            <Banner />

            <Rows title="Netflix Original" fetchUrl={requests.fetNetflixOriginals} isLargeRow />
            <Rows title="Top Rated" fetchUrl={requests.fetchTopRated} />
            <Rows title="Action Movies" fetchUrl={requests.fetchActionMovies} />
            <Rows title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
            <Rows title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
            <Rows title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
            <Rows title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
        </div>
    );
};

export default HomeScreen; 