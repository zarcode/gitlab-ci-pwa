import { normalize } from 'normalizr';
import * as schema from './schema';

export const fetchPipelines = (projectId) => ({
  type: 'FETCH_PIPELINES',
  projectId,
});

export const pipelinesSuccess = (response) => { 
  return ({
    type: 'FETCH_PIPELINES_SUCCESS',
    response: normalize(response, schema.pipelines),
  });
}
export const pipelinesFail = (error) => ({
  type: 'FETCH_PIPELINES_FAIL',
  error,
});

export const fetchPipeline = (pipelineId) => ({
  type: 'FETCH_PIPELINE',
  pipelineId,
});

export const pipelineSuccess = (response) => { 
  return ({
    type: 'FETCH_PIPELINE_SUCCESS',
    response
  });
}
export const pipelineFail = (error) => ({
  type: 'FETCH_PIPELINE_FAIL',
  error,
});