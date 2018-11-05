import React, { useEffect, Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import { bindActionCreators } from 'redux';
import {connect} from "react-redux";
import Login from '../Login';
import { hashFunction } from '../../utils';
import { login, logout } from '../../actions/auth';

function Protected() {
  return <h3>Protected</h3>;
}

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
        <Router>
          <div>
            <Route path="/" component={Protected} />
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
