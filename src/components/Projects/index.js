import React, { useEffect } from 'react';
import {
  Link,
} from "react-router-dom";
import { bindActionCreators } from 'redux';
import {connect} from "react-redux";
import { fetchProjects } from '../../data/reducers/projects';

function Projects({ 
  projects: { loading, lastLoadedPage, list, error }, 
  auth, 
  actions 
}) {
  useEffect(() => {
    if(
      auth.isAuthenticated && 
      !loading &&
      lastLoadedPage === 0
    ) {
      actions.fetchProjects();
    }
  }, []);

  useEffect(() => {
    if(error) {
      alert('Error:' + error);
    }
  }, [error]);

  return (
    <>
      <h2>Projects</h2>
      {list.map(item => (
        <h3 key={item.id}>
          <Link to={`/project/${item.id}`}>
            {item.name_with_namespace}
          </Link>
        </h3>
      ))}
    </>
  );
}

function mapStateToProps(state) {
	return {
    projects: state.projects,
    auth: state.auth,
	};
};

function mapDispatchToProps(dispatch) {
  return { 
    actions: bindActionCreators({ fetchProjects }, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Projects);