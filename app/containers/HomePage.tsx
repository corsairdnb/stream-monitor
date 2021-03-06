import { connect} from 'react-redux';
import { Home } from '../components/Home';
import { withRouter } from 'react-router';
import { Dispatch, IRootState } from '../store/configureStore.development';

function mapState(state: IRootState) {
  return {
    settings: state.settings,
  };
}

function mapDispatch(dispatch: Dispatch) {
  return {
    onSave: dispatch.settings.onSave,
  };
}

export type IProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>

export default withRouter(connect(mapState, mapDispatch)(Home) as any);
