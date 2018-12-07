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
import { login, logout } from '../../data/actions/auth';
import { loadAny } from '../../data/localStorage';
let { root } = 
  process.env.NODE_ENV === 'production' ? 
  require('../../config.prod.json') : require('../../config.dev.json');
// import Project from '../Project';
const Projects = lazy(() => import('../Projects'));
const Project = lazy(() => import('../Project'));
const NoMatch = lazy(() => import('../NoMatch'));

function Layout({ state, actions }) {
  const { auth } = state;
  const urlParams = new URLSearchParams(window.location.hash);
  const accessToken = urlParams.get("#access_token");
  const stateHashParam = urlParams.get("state");
  const [stateHash, setStateHash] = useState();
  
  
  // const stateHash = hashFunction(state);
  

  useEffect(() => {
    if(!auth.isAuthenticated && accessToken && stateHashParam === loadAny('stateHash')) {
      actions.login(accessToken);
    }

    if(!auth.isAuthenticated && !stateHashParam) {
      setStateHash(hashFunction(state));
    }
  }, []);
  
  return (
    <>
      {!auth.isAuthenticated ? (
        <Login hash={stateHash}/>
      ) : (
        <>
          <nav>
            <button onClick={actions.logout}>Logout</button>
          </nav>
          <main>
            <Router>
              <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                  <Route exact path={`${root}/`} component={Projects} />
                  <Route path={`${root}/project/:projectId`} component={Project} />
                  <Route component={NoMatch} />
                </Switch>
              </Suspense>
            </Router>
          </main>
        </>
      )}
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
