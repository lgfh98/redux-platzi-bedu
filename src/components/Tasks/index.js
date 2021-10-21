// import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Spinner } from "../general/Spinner";
import { Fatal } from "../general/Fatal";
import * as TaskActions from "../../actions/TaskActions";

const { getAll: getAllTasks, setTaskCheck, deleteTask } = TaskActions;

const TasksComponent = (props) => {
  const {
    taskReducer: { tasks, loading, error },
  } = props;
  const { getAllTasks, setTaskCheck, deleteTask } = props;

  const renderUserTaskSections = () =>
    Object.keys(tasks).map((userId) => (
      <div key={userId}>
        <h2>Usuario {userId}</h2>
        <div className="tasksContainer">{renderUserTasks(userId)}</div>
      </div>
    ));

  const renderUserTasks = (userId) => {
    const userTasks = {
      ...tasks[userId],
    };

    return Object.keys(userTasks).map((taskId) => (
      <div
        key={taskId}
        style={{ display: "flex", alignItems: "center", gap: "10px" }}
      >
        <input
          type="checkbox"
          defaultChecked={userTasks[taskId].completed}
          onChange={() => setTaskCheck({ userId, taskId })}
        />
        {userTasks[taskId].title}
        <button type="button">
          <Link
            to={`/tasks/save/${userTasks[taskId].userId}/${userTasks[taskId].id}`}
          >
            Editar
          </Link>
        </button>
        <button type="button" onClick={() => deleteTask(taskId)}>
          Eliminar
        </button>
      </div>
    ));
  };

  useEffect(() => {
    if (!Object.keys(tasks).length) {
      getAllTasks();
    }
  }, [tasks]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <Fatal message={error} />;
  }

  return (
    <>
      <button style={{ alignSelf: "flex-start" }}>
        <Link to="/tasks/save">Agregar</Link>
      </button>
      {renderUserTaskSections()}
    </>
  );
};

const mapStateToProps = ({ taskReducer }) => ({ taskReducer });

const mapDispatchToProps = {
  getAllTasks,
  setTaskCheck,
  deleteTask,
};

export const Tasks = connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksComponent);

// export const Tasks = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(React.memo(TasksComponent));
