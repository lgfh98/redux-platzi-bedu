import { useEffect } from "react";
import { connect } from "react-redux";
import { Spinner } from "../general/Spinner";
import { Fatal } from "../general/Fatal";
import { Table } from "../Table";
import { Link } from "react-router-dom";
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

  const renderRows = () =>
    users.map((item) => (
      <tr key={item.id}>
        {["name", "email", "website"].map((rowName, subKey) => (
          <td key={subKey}>{item[rowName]}</td>
        ))}
        <td>
          <Link to={`/publications/${item.id}`}>
            <div className="eye-solid icon"></div>
          </Link>
        </td>
      </tr>
    ));

  if (loadingUsers) {
    return <Spinner />;
  }

  if (errorUsers) {
    return <Fatal message={errorUsers} />;
  }

  return (
    <Table
      title="Usuarios"
      headers={["Nombre", "Correo", "Enlace"]}
      renderRows={renderRows}
    />
  );
};

const mapStateToProps = ({ userReducer }) => ({ userReducer });

const mapDispatchToProps = {
  getAllUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
