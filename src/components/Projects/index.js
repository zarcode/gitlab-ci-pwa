import React, { useEffect } from 'react';
import {
  Link,
} from "react-router-dom";
import { bindActionCreators } from 'redux';
import {connect} from "react-redux";
import { fetchProjects } from '../../data/actions/projects';

function Projects({ projects, auth, actions }) {
  useEffect(() => {
    // if(auth.isAuthenticated && !projects.loading) {
      actions.fetchProjects();
    // }
  }, []);
  return (
    <>
      <h2>Projects</h2>
      {/* {projects.list.map(item => (
        <h3 key={item.id}>
          <Link to={`/project/${item.id}`}>
            {item.name_with_namespace}
          </Link>
        </h3>
      ))} */}
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