import { useEffect } from "react";
import { connect } from "react-redux";
import { Spinner } from "../general/Spinner";
import { Fatal } from "../general/Fatal";
import { Table } from "../Table";
import * as userActions from "../../actions/userActions";

const { getAll: getAllUsers } = userActions;

const App = (props) => {
  const { userReducer } = props;
  const { getAllUsers } = props;

  const { users, loading: loadingUsers, error: errorUsers } = userReducer;

  useEffect(() => {
    if (!users.length) {
      getAllUsers();
    }
  }, [getAllUsers, users.length]);

  if (loadingUsers) {
    return <Spinner />;
  }

  if (errorUsers) {
    return <Fatal message={errorUsers} />;
  }

  return (
    <Table
      data={users}
      title="Usuarios"
      rowNames={["name", "email", "website"]}
    />
  );
};

const mapStateToProps = ({ userReducer }) => ({ userReducer });

const mapDispatchToProps = {
  getAllUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
