import { connect} from 'react-redux';
import { Chat } from '../components/Chat';
import { withRouter } from 'react-router';
import { IRootState } from '../store/configureStore.development';

function mapState(state: IRootState) {
  return {
    messages: state.chat.messages,
    chatStatus: state.chat.chatStatus
  };
}

export type IProps = ReturnType<typeof mapState>

export default withRouter(connect(mapState)(Chat) as any);
