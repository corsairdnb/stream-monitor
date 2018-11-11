import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { init, RematchRootState } from '@rematch/core';
import * as models from '../models';
import { createHashHistory } from 'history';

export const history = createHashHistory();
const router = routerMiddleware(history);

export const store = init({
  models,
  redux: {
    middlewares: [thunk, router],
  }
});

export type Store = typeof store
export type Dispatch = typeof store.dispatch
export type IRootState = RematchRootState<typeof models>
