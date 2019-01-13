import React, { useEffect } from 'react';
import injectSheet from 'react-jss'
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from 'redux';

import assign from 'crocks/helpers/assign'
import compose from 'crocks/helpers/compose';
import converge from 'crocks/combinators/converge';
import flip from 'crocks/combinators/flip'
import isObject from 'crocks/predicates/isObject'
import objOf from 'crocks/helpers/objOf';
import propPath from 'crocks/Maybe/propPath';
import prop from 'crocks/Maybe/prop'
import safe from 'crocks/Maybe/safe';
import chain from 'crocks/pointfree/chain';
import map from 'crocks/pointfree/map';
import option from 'crocks/pointfree/option';
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

const styles = {
  button: {
    color: 'red'
  }
}

// defProps :: Object -> { status: String, ref: String }
const defProps = flip(assign, {
  status: 'unknown',
  ref: 'unknown'
})

// defaultUserProp :: a -> { user: Object }
const defUserProp = compose(
  objOf('user'),
  option({ username: '', avatar_url: '' }),
  chain(safe(isObject)),
  prop('user')
)

// toViewModel :: Object -> ViewModel
const toViewModel =
  converge(assign, defUserProp, defProps)


function Project({ 
  classes,
  pipelines, 
  loading, 
  lastLoadedPage, 
  error, 
  actions, 
  match, 
  history,
}) {

  const fetchByRouteParam = 
    compose(
      map(actions.fetchPipelines),
      chain(safe(isNumber)),
      map(parseInt),
      propPath(['params', 'projectId'])
    )

  useEffect(() =>
    !loading && lastLoadedPage === 0 && fetchByRouteParam(match)
  , []);

  useEffect(() => {
    if(error) {
      alert('Error:' + error);
    }
  }, [error]);

  return (
    <>
      <Link to={`${root}/`}>Projects</Link>
      <h2>Project</h2>
      {loading && (<div>Loading...</div>)}
      {pipelines
        .map(toViewModel)
        .map(item => (
          <div key={item.id}>
            
            {/* <h3>{`#${item.id}`}</h3> */}
            {/* <div className={classes.button}>{`#${item.id} by`}</div> */}
            <div className={classes.none}>{item.status}</div>
            <div className={classes.none}>{item.ref}</div>
            <div className={classes.none}>{item.user.username}</div>
            <img alt={item.user.username} src={item.user.avatar_url}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(
  injectSheet(styles)(Project)
);