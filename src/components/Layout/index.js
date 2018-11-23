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
// import Project from '../Project';
const Projects = lazy(() => import('../Projects'));
const Project = lazy(() => import('../Project'));

function Layout({ stateHash, auth, actions }) {
  const urlParams = new URLSearchParams(window.location.hash);
  const accessToken = urlParams.get("#access_token");
  const stateHashParam = urlParams.get("state");

  useEffect(() => {
    if(!auth.isAuthenticated && accessToken && stateHashParam === stateHash) {
      actions.login(accessToken);
    }
  }, []);

  // console.log(Projects);
  
  return (
    <>
      {!auth.isAuthenticated ? (
        <Login hash={stateHash}/>
      ) : (
        <Router>
          <div>
            <button onClick={actions.logout}>Logout</button>
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                <Route exact path="/" component={Projects} />
                <Route path="/project/:projectId" component={Project} />
              </Switch>
            </Suspense>
          </div>
        </Router>
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
