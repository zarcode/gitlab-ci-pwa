import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom"

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

function Protected() {
  return <h3>Protected</h3>;
}

function Layout() {
  const accessToken = new URLSearchParams(window.location.search).get("access_token");
  if(accessToken) {
    fakeAuth.authenticate(() => {})
  }
  
  return (
    <>
      {!fakeAuth.isAuthenticated ? (
        <div>
          <ul>
            <li>
              <a href="https://gitlab.com/oauth/authorize?client_id=e5a8792a796b220afd35e3ee7ef88674ea11c20070ec72ca3d160606faabab07&redirect_uri=https://zarcode.github.io/gitlab-ci-pwa&response_type=token&state=YOUR_UNIQUE_STATE_HASH">Login</a>
              {/* <Link to="/protected">Login</Link> */}
            </li>
          </ul>
        </div>
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

export default Layout;
