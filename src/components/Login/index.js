import React, { useState } from 'react';
import {
  Redirect,
} from "react-router-dom";

import { saveAny } from '../../data/localStorage';

let { clientId, domain, root } =
  process.env.NODE_ENV === 'production' ?
    require('../../config.prod.json') : require('../../config.dev.json');

function Login(props) {
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  const loginURL = `https://gitlab.com/oauth/authorize?client_id=${clientId}&redirect_uri=${domain}${root}` +
    `&response_type=token&state=${props.hash}`;

  const loginRedirect = (hash, url) => () => {
    saveAny('stateHash', hash);
    setRedirectToReferrer(true);
    window.location.href = url;
  }

  let { from } = props.location.state || { from: { pathname: "/" } };

  if (redirectToReferrer) return <Redirect to={from} />;
    
  return (
    <nav>
      <ul>
        <li>
          {/* <a href={loginURL}>Login</a> */}
          <button onClick={loginRedirect(props.hash, loginURL)}>Login</button>
        </li>
      </ul>
    </nav>
  )
}

export default Login;