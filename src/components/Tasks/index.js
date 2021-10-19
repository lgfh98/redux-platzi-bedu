import { useEffect } from "react";
import { connect } from "react-redux";
import { Spinner } from "../general/Spinner";
import { Fatal } from "../general/Fatal";
import * as taskActions from "../../actions/TaskActions";

const { getAll: getAllTasks } = taskActions;

const mapStateToProps = ({ taskReducer }) => ({ taskReducer });

const mapDispatchToProps = {
  getAllTasks,
};

const TasksComponent = (props) => {
  const {
    taskReducer: { tasks, loading, error },
  } = props;
  const { getAllTasks } = props;

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

    console.log({ userTasks });

    return Object.keys(userTasks).map((taskId) => (
      <div key={taskId}>
        <input type="checkbox" defaultChecked={userTasks[taskId].completed} />
        {userTasks[taskId].title}
      </div>
    ));
  };

  useEffect(() => {
    if (!Object.keys(tasks).length) {
      getAllTasks();
    }
  }, [getAllTasks, tasks]);

  if (error) {
    return <Fatal message={error} />;
  }

  return (
    <>
      {loading && <Spinner />}
      {renderUserTaskSections()}
    </>
  );
};

export const Tasks = connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksComponent);
