import React from 'react';
import { withRouter } from 'react-router-dom'

// const logoutRedirect = (logout) => () => {
//     logout()
//   }

function Logout({ logout, history }) {
  return (
    <button onClick={() => { logout(); history.push('/') }}>Logout</button>
  )
}

export default withRouter(Logout);