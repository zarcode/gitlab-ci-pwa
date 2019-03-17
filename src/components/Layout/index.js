import React, { useEffect, useReducer, useState, lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { bindActionCreators } from 'redux';
import {connect} from "react-redux";
import { hashFunction } from '../../utils';
import { login } from '../../data/reducers/auth';
import { loadAny } from '../../data/localStorage';

import Login from '../Login';
import Navigation from '../Navigation';

const Projects = lazy(() => import('../Projects'));
const Project = lazy(() => import('../Project'));
const NoMatch = lazy(() => import('../NoMatch'));

const { root } = 
  process.env.NODE_ENV === 'production' ? 
  require('../../config.prod.json') : require('../../config.dev.json');

function PrivateRoute({ component: Component, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

function Layout({ store, actions: { login } }) {
  const { auth: { isAuthenticated } } = store;
  const urlParams = new URLSearchParams(window.location.hash);
  const accessToken = urlParams.get("#access_token");
  const storeHashParam = urlParams.get("state");

  const [storeHash, dispatch] = useReducer(reducer, 0);
  function reducer(state, action) {
    if (action.type === 'SET_HASH') {
      return hashFunction(store);
    }

    return state;
  }

  const [offline, setOffline] = useState(!navigator.onLine);

  const LoginScreen = (props) => 
    <Login hash={storeHash} isAuthenticated={isAuthenticated} {...props}/>
  
  useEffect(() => {
    if(!isAuthenticated && accessToken && storeHashParam === loadAny('storeHash')) {
      login(accessToken);
    }

    if(!isAuthenticated && !storeHashParam) {
      dispatch({ type: 'SET_HASH' })
    }
  }, [isAuthenticated, accessToken, storeHashParam, login]);


  useEffect(() => {
    function setOfflineStatus(e) {
      setOffline(!navigator.onLine);
    }
    window.addEventListener('online',  setOfflineStatus)
    window.addEventListener('offline',  setOfflineStatus)
    return () => {
      window.removeEventListener('online', setOfflineStatus)
      window.removeEventListener('offline', setOfflineStatus)
    }
  }, []);
 
  return (
    <>
      {offline && <span>Offline</span>}
      {isAuthenticated && (
      <Navigation />)}
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route 
              path={`/login`} 
              component={LoginScreen} 
              />
            <PrivateRoute 
              exact path={`${root}/`} 
              isAuthenticated={isAuthenticated} 
              component={Projects} 
              />
            <PrivateRoute 
              path={`/project/:projectId`} 
              isAuthenticated={isAuthenticated} 
              component={Project} 
              />
            <Route component={NoMatch} />
          </Switch>
        </Suspense>
      </Router>
    </>
  );
}

function mapStateToProps(store) {
	return {
    store,
	};
};

function mapDispatchToProps(dispatch) {
  return { 
    actions: bindActionCreators({ login }, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
