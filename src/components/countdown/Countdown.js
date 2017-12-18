import React, { PureComponent } from 'react';
import { Observable } from 'rxjs';

export class Countdown extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      time: props.time
    };
    this.subscription = null;

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
    this.subscription = Observable.interval(1000).take(this.state.time)
      .subscribe(() => {
        console.info('> tick');
        this.setState({ time: this.state.time - 1 });
      });
  }

  render() {
    return (
      <span className="Countdown">{this.state.time}s</span>
    )
  }
}

export default Countdown;
