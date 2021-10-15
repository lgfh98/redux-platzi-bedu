import { useEffect } from "react";
import { connect } from "react-redux";
import * as userActions from "../../actions/userActions";
import { Spinner } from "../general/Spinner";
import { Fatal } from "../general/Fatal";
import { Table } from "../Table";

const App = ({ users, loading, error, getAllUsers }) => {
  useEffect(() => {
    if (!users.length) {
      getAllUsers();
    }
  }, [getAllUsers, users.length]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <Fatal message={error} />;
  }

  return (
    <Table
      data={users}
      title="Usuarios"
      rowNames={["name", "email", "website"]}
    />
  );
};

const mapStateToProps = (state) => state.userReducer;

export default connect(mapStateToProps, userActions)(App);
