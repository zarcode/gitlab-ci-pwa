import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from 'redux';

import compose from 'crocks/helpers/compose';
import propPath from 'crocks/Maybe/propPath';
import safe from 'crocks/Maybe/safe';
import chain from 'crocks/pointfree/chain';
import map from 'crocks/pointfree/map';
import isNumber from 'crocks/predicates/isNumber';

import { 
  getLastLoadedPage, 
  getLoadingState, 
  getPipelines,
  getError,
  fetchPipelines,
} from '../../data/reducers/pipelines';

let { root } = 
  process.env.NODE_ENV === 'production' ? 
  require('../../config.prod.json') : require('../../config.dev.json');

// const goBack = history => history.goBack;

function Project({ 
  pipelines, 
  loading, 
  lastLoadedPage, 
  error, 
  actions, 
  match, 
  history 
}) {
  useEffect(() => {
    if(
      !loading &&
      lastLoadedPage === 0
    ) {
      compose(
        map(actions.fetchPipelines),
        chain(safe(isNumber)),
        map(parseInt),
        propPath(['params', 'projectId'])
      )(match)
    }
  }, []);

  useEffect(() => {
    if(error) {
      alert('Error:' + error);
    }
  }, [error]);

  return (
    <>
      <Link to={`${root}/`}>Projects</Link>
      <h2>Project</h2>
      {pipelines.map(item => (
        <div key={item.id}>
          <h3>{`#${item.id}`}</h3>
          <div></div>
        </div>
      ))}
    </>
  );
}

function mapStateToProps(state) {
	return {
    pipelines: getPipelines(state),
    loading: getLoadingState(state),
    lastLoadedPage: getLastLoadedPage(state),
    error: getError(state),
	};
};

function mapDispatchToProps(dispatch) {
  return { 
    actions: bindActionCreators({ fetchPipelines }, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);