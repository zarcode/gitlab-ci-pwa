import React from 'react';
import { saveAny } from '../../localStorage';

let { clientId, domain, root } =
  process.env.NODE_ENV === 'production' ?
    require('../../config.prod.json') : require('../../config.dev.json');

const loginRedirect = (hash, url) => () => {
  saveAny('stateHash', hash);
  window.location.href = url;
}

function Login({ hash }) {
  const loginURL = `https://gitlab.com/oauth/authorize?client_id=${clientId}&redirect_uri=${domain}${root}` +
    `&response_type=token&state=${hash}`;
    
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