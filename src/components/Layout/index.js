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
import Login from '../Login';
import { hashFunction } from '../../utils';
import { login, logout } from '../../data/reducers/auth';
import { loadAny } from '../../data/localStorage';
let { root } = 
  process.env.NODE_ENV === 'production' ? 
  require('../../config.prod.json') : require('../../config.dev.json');
// import Project from '../Project';
const Projects = lazy(() => import('../Projects'));
const Project = lazy(() => import('../Project'));
const NoMatch = lazy(() => import('../NoMatch'));

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
  
  // const stateHash = hashFunction(state);
  
  useEffect(() => {
    if(!isAuthenticated && accessToken && stateHashParam === loadAny('stateHash')) {
      actions.login(accessToken);
    }

    if(!isAuthenticated && !stateHashParam) {
      setStateHash(hashFunction(state));
    }
  }, []);

  // if(!isAuthenticated) {
  //   return <Redirect
  //     to={{
  //       pathname: "/login",
  //       // state: { from: props.location }
  //     }}
  //   />
  // }
  
  return (

 
        <>
          <nav>
            <button onClick={actions.logout}>Logout</button>
          </nav>
          <main>
            <Router>
              <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                  <Route path={`/login`} component={(props) => <Login hash={stateHash} {...props}/>} />
                  <PrivateRoute exact path={`${root}/`} isAuthenticated={isAuthenticated} component={Projects} />
                  <PrivateRoute path={`/project/:projectId`} isAuthenticated={isAuthenticated} component={Project} />
                  <Route component={NoMatch} />
                </Switch>
              </Suspense>
            </Router>
          </main>
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
    actions: bindActionCreators({ login, logout }, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
