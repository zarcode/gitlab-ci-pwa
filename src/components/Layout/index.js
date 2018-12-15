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
import Logout from '../Logout';
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
  }, [isAuthenticated]);
  
  return (
    <>
      {!isAuthenticated ? (
        <Login hash={stateHash}/>
      ) : (
        <Router>
          <>
            <nav>
              <Logout logout={actions.logout} />
            </nav>
            <main>
                <Suspense fallback={<div>Loading...</div>}>
                  <Switch>
                    <Route exact path={`${root}/`} component={Projects} />
                    <Route path={`/project/:projectId`} component={Project} />
                    <Route component={NoMatch} />
                  </Switch>
                </Suspense>
            </main>
          </>
        </Router>
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
