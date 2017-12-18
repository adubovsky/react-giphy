import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';

import * as actions from './actions';

export const loadRandomEpic = (action$, store, { giphyAPI }) => {
  return action$.ofType(actions.LOAD_RANDOM)
    .concatMap(action => {
      return giphyAPI.getRandom()
        .map(item => actions.loadSuccess(item))
        .catch(err => Observable.of(actions.loadError(err.message)))
        .takeUntil(action$.ofType(actions.LOAD_CANCEL));
    });
};

export const changeIntervalEpic = (action$, store, { giphyAPI }) => {
  return action$.ofType(actions.CHANGE_INTERVAL)
    .switchMap(action => {
      let nextAction = { type: 'unknown' };

      if (store.getState().random.timerStarted) {
        nextAction = actions.startTimer();
      }

      return Observable.of(nextAction);
    });
};

export const timerEpic = (action$, store, { giphyAPI }) => {
  return action$.ofType(actions.START_TIMER)
    .switchMap(action => {
      const interval = store.getState().random.interval * 1000;

      return Observable.timer(0, interval)
        .mapTo(actions.loadRandom())
        .takeUntil(action$.ofType(actions.STOP_TIMER));
    });
};

export default combineEpics(
  loadRandomEpic,
  timerEpic,
  changeIntervalEpic
);
