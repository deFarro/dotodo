import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  startSession,
  dropSession,
  uploadTodo,
  flushTodo,
  modifyTodo
} from './actions';

const mapStateToProps = state => ({
  user: state.user,
  todos: state.todos,
  errorObj: state.errorObj,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    startSession,
    dropSession,
    uploadTodo,
    flushTodo,
    modifyTodo,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
);
