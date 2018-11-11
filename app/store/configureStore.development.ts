import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import { init, RematchRootState } from '@rematch/core';
import * as models from '../models';

// declare const module: NodeModule & {
//   hot?: {
//     accept(...args: any[]): any;
//   }
// };
const logger = (createLogger as any)({
  collapsed: true,
  level: 'info'
});

export const history = createHashHistory();
const router = routerMiddleware(history);

export const store = init({
  models,
  redux: {
    // initialState: {},
    // reducers: { state },
    middlewares: [thunk, router, logger],
  }
});

// if (module.hot) {
//   module.hot.accept('../reducers', () =>
//     store.replaceReducer(require('../reducers')) // eslint-disable-line global-require
//   );
// }

export type Store = typeof store
export type Dispatch = typeof store.dispatch
export type IRootState = RematchRootState<typeof models>
