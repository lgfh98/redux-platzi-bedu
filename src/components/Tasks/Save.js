import { connect } from "react-redux";
import * as TaskActions from "../../actions/TaskActions";

const { changeSaveTaskUserId, changeSaveTaskTitle } = TaskActions;

const SaveTaskComponent = (props) => {
  const {
    saveTask: { userId, taskTitle },
  } = props;

  return (
    <div>
      <h1>Guardar Tarea</h1>
      Usuario id:
      <input
        type="number"
        value={userId}
        onChange={(e) => changeSaveTaskUserId(e.target.value)}
      />
      <br />
      <br />
      Título:
      <input
        type="text"
        value={taskTitle}
        onChange={(e) => changeSaveTaskTitle(e.target.value)}
      />
      <br />
      <br />
      <button>Guardar</button>
    </div>
  );
};

const mapStateToProps = ({ taskReducer: { saveTask } }) => ({ saveTask });
const mapDispatchToProps = { changeSaveTaskUserId, changeSaveTaskTitle };

export const SaveTask = connect(
  mapStateToProps,
  mapDispatchToProps
)(SaveTaskComponent);
