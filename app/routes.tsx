import * as React from 'react';
import { Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import { HashRouter, Link } from 'react-router-dom';
import ChatPage from './containers/ChatPage';

export default () => (
  <App>
    <HashRouter>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
          <a className="navbar-brand" href="#">Chat Monitor</a>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/chat">Chat</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" component={HomePage} exact={true} />
        <Route path="/chat" component={ChatPage} />
      </div>
    </HashRouter>
  </App>
);
