import React, { Component, Fragment } from 'react';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { Link, Route } from 'react-router-dom';
import { ConnectedRouter, routerMiddleware, routerReducer } from 'react-router-redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import ExplorePage from './scenes/Explore';
import RandomPage, { randomEpic, randomReducer } from './scenes/Random';

import giphyAPI from './services/GiphyAPI';

import './App.css';

// configuring router and router middleware
const history = createHistory();
const routerHistoryMiddleware = routerMiddleware(history);

// configuring epics (side effects and middleware)
const rootEpic = combineEpics(
  randomEpic
);
const epicMiddleware = createEpicMiddleware(rootEpic, {
  dependencies: {
    giphyAPI
  }
});

// needed to setup redux dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// creating the store
const store = createStore(
  combineReducers({
    router: routerReducer,
    random: randomReducer
  }),
  composeEnhancers(
    applyMiddleware(
      routerHistoryMiddleware,
      epicMiddleware
    )
  )
);

export class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <Fragment>
              <header className="App-header">
                <h1>Giphy Explorer</h1>
                <ul>
                  <li><Link to="/">Explore</Link></li>
                  <li><Link to="/random">Lucky page</Link></li>
                </ul>
              </header>
              <section className="App-page">
                <Route exact path="/" component={ExplorePage}/>
                <Route exact path="/random" component={RandomPage}/>
              </section>
            </Fragment>
          </ConnectedRouter>
        </Provider>
      </div>
    );
  }
}

export default App;
