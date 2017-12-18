import React, { Component } from 'react';
import { connect } from 'react-redux';

export class ExplorePage extends Component {
  render() {
    return (
      <h1>EXPLORE!</h1>
    )
  }
}

export default connect(
  // mapStateToProps,
  // mapDispatchToProps
)(ExplorePage);
