import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from "react-redux";
import { fetchPipelines } from '../../actions/pipelines';

function Pipelines({ pipelines, actions }) {
  useEffect(() => {
    actions.fetchPipelines();
  }, []);
  return (
    <>
      <h2>Pipelines</h2>
      {pipelines.map(item => (
        <h3 key={item.id}>{item.name_with_namespace}</h3>
      ))}
    </>
  );
}

function mapStateToProps(state) {
  console.log(state);
	return {
    pipelines: state.pipelines,
	};
};

function mapDispatchToProps(dispatch) {
  return { 
    actions: bindActionCreators({ fetchPipelines }, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Pipelines);