import React, { useEffect, useState } from 'react';
import OnLoadAnimation from './OnLoadAnimation';
import Nav from './Nav';
import Banner from './Banner';
import Rows from './Row';
import requests from './Requests';
import './HomeScreen.css';

const HomeScreen = () => {
    const [loadAnimation, setLoadAnimation] = useState(true);
    const onLoadAnimationCookie = "showStartAnimation";

    const setCookie = (name) => {
        let now = new Date();
        let time = now.getTime();
        let expireTime = time + 1000 * 36000;
        now.setTime(expireTime);
        document.cookie = `${name}=true;expires=` + now.toUTCString() + ';path=/';
    };

    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    useEffect(() => {
        // get cookie. 
        const showAnimation = getCookie(onLoadAnimationCookie) || undefined;

        //!exist
        if (!showAnimation) { 
            setLoadAnimation(true);
            setCookie(onLoadAnimationCookie);
        } else {
            setLoadAnimation(false);
        }
        
        //exist
        if (loadAnimation) {
            setTimeout(() => {
                setLoadAnimation(false);
            }, 5000);
        }

    }, [loadAnimation]);

    return (
        loadAnimation ? (
            <OnLoadAnimation />
        ) : (
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
            )

    );
};

export default HomeScreen; 