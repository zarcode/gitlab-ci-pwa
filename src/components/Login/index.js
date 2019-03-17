import React, { useEffect } from 'react';
import {
  Redirect,
} from "react-router-dom";

import curry from 'crocks/helpers/curry'
import propPath from 'crocks/Maybe/propPath'

import { saveAny, loadAny } from '../../data/localStorage';

let { clientId, root } =
  process.env.NODE_ENV === 'production' ?
    require('../../config.prod.json') : require('../../config.dev.json');

function Login({ isAuthenticated, hash, location}) {
  useEffect(() => {
    propPath([ 'state', 'from' ])(location)
    .map(curry(saveAny)('loginFrom'))
  }, []);

  const loginURL = `https://gitlab.com/oauth/authorize?client_id=${clientId}&redirect_uri=${window.location.origin}${root}/login` +
    `&response_type=token&state=${hash}`;

  const loginRedirect = (hash, url) => () => {
    saveAny('storeHash', hash);
    window.location.href = url;
  }

  const loadFrom = loadAny('loginFrom') || { pathname: '/' };

  if (isAuthenticated) return <Redirect to={loadFrom} />;
    
  return (
    <nav>
      <ul>
        <li>
          {/* <a href={loginURL}>Login</a> */}
          <button onClick={loginRedirect(hash, loginURL)}>Login</button>
        </li>
      </ul>
    </nav>
  )
}

export default Login;