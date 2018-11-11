let store: any;

if (process.env.NODE_ENV === 'production') {
  store = require('./configureStore.production');
} else {
  store = require('./configureStore.development');
}

export = store;
