import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { selecSubcription } from './features/userSlice';
import './Nav.css';

const Nav = () => {
    const userSubcription = useSelector(selecSubcription);
    const [show, handleShow] = useState(false);
    const history = useHistory();

    const transitionNavBar = () => {
        if (window.scrollY > 100) {
            handleShow(true);
        } else {
            handleShow(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', transitionNavBar);
        return () => {
            window.removeEventListener('scroll', transitionNavBar);
        };
    }, []);


    return (
        <div className={`nav ${show && 'nav__black'}`}>
            <div className="nav__contents">
                <img className="nav__logo" src="netflix_logo.png" alt="netflix" onClick={() => !userSubcription ? history.push("/profile") : history.push("/")} />
                <img className="nav__avatar" src="user_logo.png" alt="avatar" onClick={() => history.push("/profile")} />
            </div>
        </div>
    );
};

export default Nav;
