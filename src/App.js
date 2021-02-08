import React, { useEffect } from 'react';
import HomeScreen from './screens/HomeScreen';
import Login from './screens/LoginScreen';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.css';
import { auth } from './firebase';
import { login, logout, selectUser } from './features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import ProfileScreen from './screens/ProfileScreen';

function App() {

  const user = useSelector(selectUser);
  console.log(user);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        // login
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email
        }));
      } else {
        // logout
        dispatch(logout());
      }
    });
    return unsubscribe;
  }, [dispatch]);

  return (
    <div className="app">
      <Router>
        {
          !user ? (
            <Login />
          ) : (
              <Switch>
                <Route path="/login">

                </Route>

                <Route path="/profile">
                  <ProfileScreen />
                </Route>

                <Route path="/" exact>
                  <HomeScreen />
                </Route>

              </Switch>
            )
        }
      </Router>
    </div>
  );
}

export default App;
