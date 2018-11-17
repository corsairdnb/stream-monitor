import * as React from 'react';
import { Route } from 'react-router';
import App from './containers/App';
import { HashRouter } from 'react-router-dom';
import HomePage from './containers/HomePage';
import ChatPage from './containers/ChatPage';
import { connect } from 'react-redux';
import { Dispatch, IRootState } from './store/configureStore.development';
import { Header } from './components/Header';
import { StatusBar } from './components/StatusBar';
import { Col, Row } from 'reactstrap';

function mapCommonState(state: IRootState) {
  return {
    chatStatus: state.chat.chatStatus
  };
}
function mapCommonDispatch(dispatch: Dispatch) {
  // dispatch.chat.start();
  return {
    start: dispatch.chat.start,
    stop: dispatch.chat.stop,
  };
}
const CommonHeader = connect(mapCommonState)(Header);
const CommonStatusBar = connect(mapCommonState, mapCommonDispatch)(StatusBar);
export type ICommonProps = ReturnType<typeof mapCommonState> & ReturnType<typeof mapCommonDispatch>

export default () => (
  <App>
    <HashRouter>
      <div id="grid">
        <Row id="grid-header">
          <Col>
            <CommonHeader />
          </Col>
        </Row>
        <Row id="grid-main">
          <Col>
            <Route path="/" component={HomePage} exact={true} />
            <Route path="/chat" component={ChatPage} />
          </Col>
        </Row>
        <Row id="grid-footer">
          <Col>
            <CommonStatusBar />
          </Col>
        </Row>
      </div>
    </HashRouter>
  </App>
);
