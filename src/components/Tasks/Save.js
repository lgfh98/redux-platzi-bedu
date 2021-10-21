import { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as TaskActions from "../../actions/TaskActions";
import { Fatal } from "../general/Fatal";
import { Spinner } from "../general/Spinner";

const {
  changeSaveTaskUserId,
  changeSaveTaskTitle,
  saveTask,
  editTask,
  changeCompletedTask,
  cleanState,
} = TaskActions;

const SaveTaskComponent = (props) => {
  const {
    userId,
    taskTitle,
    loading,
    error,
    successfulMessage,
    redirect,
    completed,
    tasks,
  } = props;
  const {
    changeSaveTaskUserId,
    changeSaveTaskTitle,
    saveTask,
    editTask,
    changeCompletedTask,
    cleanState,
  } = props;
  const {
    match: { params },
  } = props;

  const [editing] = useState(() => {
    if (params.userId && params.taskId && Object.keys(tasks).length) {
      return true;
    }
    return false;
  });

  const handleSaveTask = (e) => {
    e.preventDefault();

    if (editing) {
      const updatedTask = {
        ...tasks[params.userId][params.taskId],
        title: taskTitle,
        completed,
      };

      editTask(updatedTask);
    } else {
      const newTask = {
        userId,
        title: taskTitle,
        completed: false,
      };

      saveTask(newTask);
    }
  };

  const handleDisabled = () => {
    if (loading || !userId || !taskTitle) {
      return true;
    }
    return false;
  };

  const handleRedirect = () => {
    setTimeout(
      () =>
        props.history.push({
          pathname: "/tasks",
        }),
      2000
    );
  };

  useEffect(() => {
    if (editing) {
      const {
        match: {
          params: { userId, taskId },
        },
        changeSaveTaskUserId,
        changeSaveTaskTitle,
      } = props;

      if (userId && taskId) {
        const task = tasks[userId][taskId];
        changeSaveTaskUserId(task.userId);
        changeSaveTaskTitle(task.title);
      }
    }
    return () => {
      cleanState();
    };
  }, []);

  return (
    <>
      {redirect && handleRedirect()}
      <form onSubmit={handleSaveTask}>
        <h1>{editing ? "Editar tarea" : "Guardar Tarea"}</h1>
        {!editing && (
          <>
            Usuario id:
            <input
              type="number"
              value={userId}
              onChange={(e) => changeSaveTaskUserId(e.target.value)}
              required
            />
            <br />
            <br />
          </>
        )}
        Título:
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => changeSaveTaskTitle(e.target.value)}
          required
        />
        {editing && (
          <>
            <br />
            <br />
            <label
              htmlFor="completed"
              style={{ display: "flex", alignItems: "center" }}
            >
              ¿ Esta completada la tarea ? :
              <input
                id="completed"
                type="checkbox"
                value={completed}
                onChange={(e) => changeCompletedTask(e.target.checked)}
                defaultChecked={tasks[params.userId]?.[params.taskId].completed}
              />
            </label>
          </>
        )}
        <br />
        <br />
        {!successfulMessage && (
          <button disabled={handleDisabled()} type="submit">
            {editing ? "Editar" : "Guardar"}
          </button>
        )}
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
    saveTask: { userId, taskTitle, successfulMessage, redirect, completed },
    loading,
    error,
    tasks,
  },
}) => ({
  userId,
  taskTitle,
  loading,
  error,
  successfulMessage,
  redirect,
  completed,
  tasks,
});

const mapDispatchToProps = {
  changeSaveTaskUserId,
  changeSaveTaskTitle,
  saveTask,
  editTask,
  changeCompletedTask,
  cleanState,
};

export const SaveTask = connect(
  mapStateToProps,
  mapDispatchToProps
)(SaveTaskComponent);
