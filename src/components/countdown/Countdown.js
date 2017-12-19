import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Observable } from 'rxjs';

const propTypes = {
  time: PropTypes.number.isRequired
};

export class Countdown extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      time: props.time
    };
    this.subscription = null;
  }

  componentDidMount() {
    this.setupTimer();
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.time !== nextProps.time) {
      console.info('> props');

      this.setState({ time: nextProps.time }, () => this.setupTimer());
    } else {
      // console.info('> filtered');
    }
  }

  componentWillUnmount() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  setupTimer() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.state.time > 0) {
      this.subscription = Observable.interval(1000).take(this.state.time)
        .subscribe(() => {
          console.info('> tick');
          this.setState({ time: this.state.time - 1 });
        });
    }
  }

  render() {
    return (
      <span className="Countdown">{this.state.time || '(N/A)'}s</span>
    )
  }
}

Countdown.propTypes = propTypes;

export default Countdown;
