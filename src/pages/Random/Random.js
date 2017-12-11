import React, { Component } from 'react';
import axios from 'axios';

import './Random.css';

const URL = 'http://api.giphy.com/v1/gifs/random';
const API_KEY = 'JokfEsQ6phaio2LlwNgGHhpBr47QE89e';

class RandomPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      gifPath: '',
    };
  }

  componentWillMount() {
    this.getRandom();
  }

  componentWillUnmount() {
    if (this.timer) {
      console.info('cleared timer');
      clearTimeout(this.timer);
      delete this.timer;
    }
  }

  render() {
    return (
      <div className="Random">
        {this.state.loading ? <h3>Loading...</h3> : ''}
        {this.state.gifPath ? <img src={this.state.gifPath}/> : ''}
      </div>
    )
  }

  getRandom() {
    this.setState({loading: true});
    axios
      .get(URL, {
        params: {api_key: API_KEY, q: this.state.query}
      })
      .then(resp => {
        console.info('response:', resp);
        let gif = resp.data.data;
        this.setState({
          loading: false,
          gifPath: gif.image_url
        });
      })
      .catch(err => {
        console.error(err);
        this.setState({loading: false});
      })
      .then(() => {
        this.timer = setTimeout(() => this.getRandom(), 5000);
      });
  }
}

export default RandomPage;
