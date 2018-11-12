import React, { useEffect } from 'react';
import {
  Link,
} from "react-router-dom";
import { bindActionCreators } from 'redux';
import {connect} from "react-redux";
import { fetchProjects } from '../../actions/projects';

function Projects({ projects, actions }) {
  useEffect(() => {
    // actions.fetchProjects();
  }, []);
  return (
    <>
      <h2>Projects</h2>
      {projects.map(item => (
        <h3 key={item.id}>
          <Link to="/pipelines">
            {item.name_with_namespace}
          </Link>
        </h3>
      ))}
    </>
  );
}

function mapStateToProps(state) {
  console.log(state);
	return {
    projects: state.projects,
	};
};

function mapDispatchToProps(dispatch) {
  return { 
    actions: bindActionCreators({ fetchProjects }, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Projects);