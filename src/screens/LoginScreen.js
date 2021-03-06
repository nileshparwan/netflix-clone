import React, { useState } from 'react';
import './LoginScreen.css';
import SignupScreen from './SignupScreen';

const LoginScreen = () => {

    const [signIn, setSignIn] = useState(false);
    const signInHandler = () => setSignIn(true);

    const signInHandlerWithLocalStorage = (event) => {
        event.preventDefault();
        const parent = event?.currentTarget.parentElement; 
        const input = parent?.querySelector("input"); 
        window.localStorage.setItem("user_info", input?.value)
        input.value && setSignIn(true);
    };

    return (
        <div className="loginScreen">
            <div className="loginScreen__background">
                <img className="loginScreen__logo" src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png" alt="" />
                <button className="loginScreen__button" onClick={signInHandler}>Sign In</button>
                {/* <div className="loginScreen__gradient"/> */}
            </div>

            <div className="loginScreen__body">
                {
                    signIn ? (
                        <SignupScreen />
                    ) : (
                            <>
                                <h1>Unlimited films, TV programmes and more.</h1>
                                <h2>Watch anywhere, Cancel at any time</h2>
                                <h3>Ready to watch? Enter your email to create or restart your membership</h3>
                                <div className="loginScreen__input">
                                    <form>
                                        <input
                                            type="email"
                                            placeholder="Email Address"
                                            aria-label="email"
                                        />
                                        <button
                                            className="loginScreen__getStarted"
                                            onClick={signInHandlerWithLocalStorage}
                                        >
                                            GET STARTED
                                        </button>
                                    </form>
                                </div>
                            </>
                        )
                }
            </div>
        </div>
    );
};

export default LoginScreen;
