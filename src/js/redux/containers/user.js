import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { startSession, dropSession } from '../actions';

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    startSession,
    dropSession,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
);
