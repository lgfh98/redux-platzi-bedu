import { connect } from "react-redux";
import * as TaskActions from "../../actions/TaskActions";
import { Fatal } from "../general/Fatal";
import { Spinner } from "../general/Spinner";
import { Redirect } from "react-router";

const { changeSaveTaskUserId, changeSaveTaskTitle, saveTask } = TaskActions;

const SaveTaskComponent = (props) => {
  const { userId, taskTitle, loading, error, successfulMessage, redirect } =
    props;
  const { changeSaveTaskUserId, changeSaveTaskTitle, saveTask } = props;

  const handleSaveTask = (e) => {
    e.preventDefault();

    const newTask = {
      userId,
      title: taskTitle,
      completed: false,
    };

    saveTask(newTask);
  };

  const handleDisabled = () => {
    if (loading || !userId || !taskTitle) {
      return true;
    }
    return false;
  };

  const handleRedirect = () => {
    setTimeout(() => props.history.push("/tasks"), 2000);
  };

  return (
    <>
      {/* {redirect && handleRedirect()} */}
      {redirect && <Redirect to="/tasks" />}
      <form onSubmit={handleSaveTask}>
        <h1>Guardar Tarea</h1>
        Usuario id:
        <input
          type="number"
          value={userId}
          onChange={(e) => changeSaveTaskUserId(e.target.value)}
          required
        />
        <br />
        <br />
        Título:
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => changeSaveTaskTitle(e.target.value)}
          required
        />
        <br />
        <br />
        <button disabled={handleDisabled()} type="submit">
          Guardar
        </button>
      </form>
      {loading && (
        <div>
          <Spinner />
        </div>
      )}
      {error && <Fatal message={error} />}
      {successfulMessage && <h2>{successfulMessage}</h2>}
    </>
  );
};

const mapStateToProps = ({
  taskReducer: {
    saveTask: { userId, taskTitle, successfulMessage, redirect },
    loading,
    error,
  },
}) => ({ userId, taskTitle, loading, error, successfulMessage, redirect });

const mapDispatchToProps = {
  changeSaveTaskUserId,
  changeSaveTaskTitle,
  saveTask,
};

export const SaveTask = connect(
  mapStateToProps,
  mapDispatchToProps
)(SaveTaskComponent);
