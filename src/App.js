import React, { Component, Fragment } from 'react';
import { BrowserRouter, Link, Route, IndexRoute } from 'react-router-dom';

import './App.css';

import ExplorePage from './pages/Explore';
import RandomPage from './pages/Random';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Fragment>
            <header className="App-header">
              <h1>Giphy Explorer</h1>
              <ul>
                <li><Link to="/">I'm feeling lucky</Link></li>
                <li><Link to="/explore">Explore</Link></li>
              </ul>
            </header>
            <section className="App-page">
              <Route exact path="/" component={RandomPage} />
              <Route path="/explore" component={ExplorePage}/>
            </section>
          </Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
