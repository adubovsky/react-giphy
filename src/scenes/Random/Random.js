import React, { Component } from 'react';
import { connect } from 'react-redux';

import Countdown from '../../components/countdown';
import * as actions from './services/actions';

import './Random.css';

export class RandomPage extends Component {

  componentWillMount() {
    this.props.startTimer();
  }

  componentWillUnmount() {
    this.props.cancelLoad();
    this.props.stopTimer();
  }

  toggleTimer() {
    if (this.props.timerStarted) {
      this.props.stopTimer();
    } else {
      this.props.startTimer();
    }
  }

  render() {
    return (
      <div className="Random">
        <p>
          <Countdown time={this.props.timerStarted ? this.props.interval : 0}/> {this.props.loading ? <span>(Loading...)</span> : ''}
        </p>
        <p>
          <button type="button"
                  onClick={() => this.props.changeInterval(this.props.interval + 1)}>
            + 1s
          </button>
          <button type="button"
                  onClick={() => this.toggleTimer()}>
            {this.props.timerStarted ? 'Stop' : 'Start'}
          </button>
          <button type="button"
                  onClick={() => this.props.changeInterval(this.props.interval - 1)}
                  disabled={this.props.interval < 2}>
            - 1s
          </button>
        </p>
        {this.props.item ? <img alt="" src={this.props.item.image_url}/> : ''}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    item: state.random.item,
    interval: state.random.interval,
    loading: state.random.loading,
    timerStarted: state.random.timerStarted,
    error: state.random.error
  }
};

const mapDispatchToProps = dispatch => {
  return {
    loadRandom: () => dispatch(actions.loadRandom()),
    cancelLoad: () => dispatch(actions.loadCancel()),
    startTimer: () => dispatch(actions.startTimer()),
    stopTimer: () => dispatch(actions.stopTimer()),
    changeInterval: (interval) => dispatch(actions.changeInterval(interval))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RandomPage);
