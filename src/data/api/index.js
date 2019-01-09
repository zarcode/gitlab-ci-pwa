import and from 'crocks/logic/and'
import compose from 'crocks/helpers/compose'
import isArray from 'crocks/predicates/isArray'
import isObject from 'crocks/predicates/isObject'

const isElementObject = (a) =>
    a.reduce((acc, curr) => acc && isObject(curr), true)

const isArrayOfObjects = and(isArray, isElementObject)

const handleResponse = (raw) =>
  raw
  .then(function(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  })
  .then(r => r.json())

const validation = pred => promise =>
  promise.then(data => {
    if(!pred(data)) {
      throw Error("invalid data");
    } 
    return data;
  })

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
    validation(isObject),
    handleResponse,
    getRequest,
    (props) => ({ 
      url: `https://gitlab.com/api/v4/user`, 
      ...props
    })
  )

export const fetchProjects = compose(
    validation(isArrayOfObjects),
    handleResponse,
    getRequest,
    ({ userId, ...rest }) => ({ 
      url: `https://gitlab.com/api/v4/users/${userId}/projects`, 
      ...rest
    })
  )

export const fetchPipelines = compose(
    validation(isArrayOfObjects),
    handleResponse,
    getRequest,
    ({ projectId, ...rest }) => ({ 
      url: `https://gitlab.com/api/v4/projects/${projectId}/pipelines`, 
      ...rest
    })
  )

export const fetchPipeline = compose(
    validation(isObject),
    handleResponse,
    getRequest,
    ({ projectId, pipelineId, ...rest }) => ({ 
      url: `https://gitlab.com/api/v4/projects/${projectId}/pipelines/${pipelineId}`, 
      ...rest
    })
  )

export const fetchPipelineJobs = compose(
    validation(isArrayOfObjects),
    handleResponse,
    getRequest,
    ({ projectId, ...rest }) => ({ 
      url: `https://gitlab.com/api/v4/projects/:id/pipelines/:pipeline_id/jobs`, 
      ...rest
    })
  )