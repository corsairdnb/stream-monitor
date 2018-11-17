import * as React from 'react';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <nav className="navbar navbar-light navbar-expand bg-light">
      <span className="navbar-brand">Chat Monitor</span>
      <div className="navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/chat">Chat</Link>
          </li>
        </ul>
      </div>
    </nav>

  );
}
