import React, { useEffect, Component, lazy, Suspense } from 'react';
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
import { login, logout } from '../../actions/auth';
let { root } = 
  process.env.NODE_ENV === 'production' ? 
  require('../../config.prod.json') : require('../../config.dev.json');
// import Project from '../Project';
const Projects = lazy(() => import('../Projects'));
const Project = lazy(() => import('../Project'));
const NoMatch = lazy(() => import('../NoMatch'));

function Layout({ stateHash, auth, actions }) {
  const urlParams = new URLSearchParams(window.location.hash);
  const accessToken = urlParams.get("#access_token");
  const stateHashParam = urlParams.get("state");

  useEffect(() => {
    if(!auth.isAuthenticated && accessToken && stateHashParam === stateHash) {
      actions.login(accessToken);
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
    // stateHash: hashFunction(state),
    stateHash: "hello",
    auth: state.auth,
	};
};

function mapDispatchToProps(dispatch) {
  return { 
    actions: bindActionCreators({ login, logout }, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
