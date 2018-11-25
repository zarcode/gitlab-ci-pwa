import React from 'react';

let { clientId, domain, root } =
  process.env.NODE_ENV === 'production' ?
    require('../../config.prod.json') : require('../../config.dev.json');

function Login({ hash }) {
  const loginURL = `https://gitlab.com/oauth/authorize?client_id=${clientId}&redirect_uri=${domain}${root}` +
    `&response_type=token&state=${hash}`;
  return (
    <nav>
      <ul>
        <li>
          <a href={loginURL}>Login</a>
        </li>
      </ul>
    </nav>
  )
}

export default Login;