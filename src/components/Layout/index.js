import React, { useEffect, useState, Component, lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
  withRouter
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

function Layout({ state, actions }) {
  const { auth: { isAuthenticated } } = state;
  const urlParams = new URLSearchParams(window.location.hash);
  const accessToken = urlParams.get("#access_token");
  const stateHashParam = urlParams.get("state");

  const [stateHash, setStateHash] = useState();
  const [offline, setOffline] = useState(!navigator.onLine);

  const LoginScreen = (props) => 
    <Login hash={stateHash} isAuthenticated={isAuthenticated} {...props}/>

  const setOfflineStatus = (e) => {
    console.log(e)
    setOffline(!navigator.onLine);
  }
  
  useEffect(() => {
    if(!isAuthenticated && accessToken && stateHashParam === loadAny('stateHash')) {
      actions.login(accessToken);
    }

    if(!isAuthenticated && !stateHashParam) {
      setStateHash(hashFunction(state));
    }
  }, [isAuthenticated]);


  useEffect(() => {
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

function mapStateToProps(state) {
	return {
    state,
	};
};

function mapDispatchToProps(dispatch) {
  return { 
    actions: bindActionCreators({ login }, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
