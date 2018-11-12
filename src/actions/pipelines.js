export const fetchPipelines = () => ({
  type: 'FETCH_PIPELINES',
});

export const pipelinesSuccess = (response) => { 
  console.log(response)
  return ({
    type: 'FETCH_PIPELINES_SUCCESS',
    response,
  });
}
export const pipelinesFail = (error) => ({
  type: 'FETCH_PIPELINES_FAIL',
  error,
});