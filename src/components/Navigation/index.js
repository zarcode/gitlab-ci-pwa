import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";

import { logout } from '../../data/reducers/auth';

function Navigation({ actions }) {
  return (
    <nav>
      <button onClick={actions.logout}>Logout</button>
    </nav>
  );
}

function mapDispatchToProps(dispatch) {
  return { 
    actions: bindActionCreators({ logout }, dispatch),
  }
};

export default connect(null, mapDispatchToProps)(Navigation);