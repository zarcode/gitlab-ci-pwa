import and from 'crocks/logic/and'
import compose from 'crocks/helpers/compose'
import isArray from 'crocks/predicates/isArray'
import isObject from 'crocks/predicates/isObject'
import isSame from 'crocks/predicates/isSame'
import ifElse from 'crocks/logic/ifElse'
import propOr from 'crocks/helpers/propOr'
import identity from 'crocks/combinators/identity'

// isElementObject :: Array -> Boolean
const isElementObject = a =>
    a.reduce((acc, curr) => acc && isObject(curr), true)

// isArrayOfObjects :: a -> Boolean
const isArrayOfObjects = and(isArray, isElementObject)

// isOk :: Object -> Boolean
const isOk = compose(
  isSame(true),
  propOr(false, 'ok'),
);

// throwError :: String -> ()
const throwError = x => { throw Error(x) }

// toJson :: a -> b
const toJson = x => x.json()

// getStatusMessage :: Object -> String
const throwStatusMessage = compose(
  throwError,
  propOr('Server error', 'statusText'),
);

// handleResponse :: Promise -> Promise
const handleResponse = raw =>
  raw
  .then(
    ifElse(
      isOk,
      toJson,
      throwStatusMessage,
    )
  )

// validation :: Pred -> Promise -> Promise
const validation = pred => promise =>
  promise
  .then(
    ifElse(
      pred,
      identity,
      x => throwError("Invalid data")
    )
  )

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

// const getRequest = fromPromise(getRequest1)

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