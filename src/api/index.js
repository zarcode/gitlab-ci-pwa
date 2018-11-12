import compose from 'crocks/helpers/compose';

const handleResponse = (raw) =>
  raw.then(function(response) {
    if(response.status < 300 && response.status >= 200) {
      return response.json();
    }
    throw new Error(response.json());
  })
  .then(function(json) {
    return json
  });

// const splitParams = ({ token, ...rest}) => 

const getRequest = ({ url, token, ...rest}) => 
  fetch( 
    url, 
    {
        headers: {
          'Authorization': `Bearer ${token}`,
          // "Content-Type": "application/json; charset=utf-8",
        },
        // body: JSON.stringify(rest),
    }
  )

export const fetchUser = compose(
    handleResponse,
    getRequest,
    (props) => ({ url: `https://gitlab.com/api/v4/user`, ...props})
  )

export const fetchProjects = compose(
    handleResponse,
    getRequest,
    ({ userId, ...rest }) => ({ url: `https://gitlab.com/api/v4/users/${userId}/projects`, ...rest})
  )

export const fetchPipelines = compose(
    handleResponse,
    getRequest,
  )