import { useEffect } from "react";
import { connect } from "react-redux";
import * as taskActions from "../../actions/TaskActions";

const { getAll: getAllTasks } = taskActions;

const mapStateToProps = ({ taskReducer }) => ({ taskReducer });

const mapDispatchToProps = {
  getAllTasks,
};

const TasksComponent = (props) => {
  const { taskReducer } = props;
  const { getAllTasks } = props;

  console.log(taskReducer);

  useEffect(() => {
    getAllTasks();
  }, []);

  return <div>Tareas</div>;
};

export const Tasks = connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksComponent);
