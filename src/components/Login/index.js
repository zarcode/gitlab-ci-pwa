import React from 'react';

let { clientId, siteUrl } = 
  process.env.NODE_ENV === 'production' ? 
  require('../../config.prod.json') : require('../../config.dev.json');

function Login({ hash }) {
    const loginURL = `https://gitlab.com/oauth/authorize?client_id=${clientId}&redirect_uri=${siteUrl}` + 
    `&response_type=token&state=${hash}`;
    return (
        <div>
            <ul>
                <li>
                <a href={loginURL}>Login</a>
                </li>
            </ul>
        </div>
    )
}

export default Login;