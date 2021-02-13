import React, { useEffect } from 'react';
import HomeScreen from './screens/HomeScreen';
import Login from './screens/LoginScreen';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.css';
import db, { auth } from './firebase';
import { login, logout, subcription, selectUser } from './features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import ProfileScreen from './screens/ProfileScreen';

function App() {

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {

      if (userAuth) {
        // login
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email
        }));
        // user role
        db.collection("customers")
          .doc(userAuth.uid)
          .collection("subscriptions")
          .get()
          .then(
            (querySnapshot) => {
              querySnapshot.forEach(async (subcriptionValue) => {
                dispatch(subcription(subcriptionValue.data().role));
              });
            }
          );

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

                <Route path="/profile">
                  <ProfileScreen />
                </Route>

                <Route path="/login">
                  <Login />
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
