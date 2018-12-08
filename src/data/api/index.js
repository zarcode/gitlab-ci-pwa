import compose from 'crocks/helpers/compose';

const handleResponse = (raw) =>
  raw
  .then(function(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  })
  .then(r => r.json())

const log = (props) => {
  console.log(props);
  return props;
}

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
    (props) => ({ 
      url: `https://gitlab.com/api/v4/user`, 
      ...props
    })
  )

export const fetchProjects = compose(
    // log,
    handleResponse,
    getRequest,
    ({ userId, ...rest }) => ({ 
      url: `https://gitlab.com/api/v4/users/${userId}/projects`, 
      ...rest
    })
  )

export const fetchPipelines = compose(
    handleResponse,
    getRequest,
    ({ projectId, ...rest }) => ({ 
      url: `https://gitlab.com/api/v4/projects/${projectId}/pipelines`, 
      ...rest
    })
  )

export const fetchPipeline = compose(
    handleResponse,
    getRequest,
    ({ projectId, pipelineId, ...rest }) => ({ 
      url: `https://gitlab.com/api/v4/projects/${projectId}/pipelines/${pipelineId}`, 
      ...rest
    })
  )

export const fetchPipelineJobs = compose(
    handleResponse,
    getRequest,
    ({ projectId, ...rest }) => ({ 
      url: `https://gitlab.com/api/v4/projects/:id/pipelines/:pipeline_id/jobs`, 
      ...rest
    })
  )