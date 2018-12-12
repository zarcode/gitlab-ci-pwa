import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import {
  Link,
} from "react-router-dom";
import {connect} from "react-redux";
import propPath from 'crocks/Maybe/propPath';
import safe from 'crocks/Maybe/safe';
import isNumber from 'crocks/predicates/isNumber';
import isString from 'crocks/predicates/isString';
import propPathOr from 'crocks/helpers/propPathOr';
import compose from 'crocks/helpers/compose';
import map from 'crocks/pointfree/map';
import chain from 'crocks/pointfree/chain';
import safeLift from 'crocks/Maybe/safeLift';
import liftA2 from 'crocks/helpers/liftA2';

import { fetchPipelines } from '../../data/actions/pipelines';
import { 
  getPipelines, 
  getLoadingState, 
  getLastLoadedPage 
} from '../../data/reducers/pipelines';

// const goBack = history => history.goBack;

function Project({ pipelines, loading, lastLoadedPage, actions, match, history }) {
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
  return (
    <>
      <Link to={'/'}>Projects</Link>
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
	};
};

function mapDispatchToProps(dispatch) {
  return { 
    actions: bindActionCreators({ fetchPipelines }, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);