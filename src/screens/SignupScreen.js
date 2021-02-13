import React, { useEffect, useRef } from 'react';
import { auth } from '../firebase';
import './SignupScreen.css';

const SignupScreen = () => {

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    useEffect(() => {
        if (window.localStorage.getItem("user_info")) {
            emailRef.current.setAttribute("value", window.localStorage.getItem("user_info"));
        }
    }, []);

    const register = (e) => {
        e.preventDefault();

        auth.createUserWithEmailAndPassword(
            emailRef?.current.value,
            passwordRef?.current.value
        ).then((authUser) => {
            return true;
        }).catch((error) => alert(error));

        return false;
    };

    const SignIn = (e) => {
        e.preventDefault();

        auth.signInWithEmailAndPassword(
            emailRef?.current.value,
            passwordRef?.current.value
        ).then((authUser) => {
            return true;
        }).catch((error) => alert(error));

        return false;
    };

    return (
        <div className="signupScreen">
            <form>
                <h1>Sign In</h1>
                <input ref={emailRef} placeholder="Email" type="email" aria-label="email" />
                <input ref={passwordRef} placeholder="Password" type="password" />
                <button type="submit" onClick={SignIn}>Sign In</button>
                <h4>
                    <span className="signupScreen__gray">New to Netflix? </span>
                    <span className="signupScreen__link" role="button" aria-label="signup button" onClick={register}>Sign up now.</span>
                </h4>
            </form>
        </div>
    );
};

export default SignupScreen;
