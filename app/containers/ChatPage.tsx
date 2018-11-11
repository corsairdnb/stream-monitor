import { connect} from 'react-redux';
import { Chat } from '../components/Chat';
import { withRouter } from 'react-router';
import { Dispatch, IRootState } from '../store/configureStore.development';

function mapState(state: IRootState) {
  return {
    messages: state.chat.messages,
    chatStatus: state.chat.chatStatus
  };
}

function mapDispatch(dispatch: Dispatch) {
  dispatch.chat.start();
  return {
    start: dispatch.chat.start,
    stop: dispatch.chat.stop,
  };
}

export type IProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>

export default withRouter(connect(mapState, mapDispatch)(Chat) as any);
