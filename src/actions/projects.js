export const fetchProjects = () => ({
  type: 'FETCH_PROJECTS',
});

export const projectsSuccess = (response) => { 
  return ({
    type: 'FETCH_PROJECTS_SUCCESS',
    response,
  });
}
export const projectsFail = (error) => ({
  type: 'FETCH_PROJECTS_FAIL',
  error,
});