import { useEffect } from "react";
import { connect } from "react-redux";
import * as userActions from "../../actions/userActions";

const App = ({ users, loading, error, getAllUsers }) => {
  console.log("render");

  const ponerFilas = () =>
    users.map(({ id, name, email, website }) => (
      <tr key={id}>
        <td>{name}</td>
        <td>{email}</td>
        <td>{website}</td>
      </tr>
    ));

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  if (loading) {
    return "Cargando...";
  }

  if (error) {
    return `Error ❌ - ${error}`;
  }

  return (
    <table className="tabla">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Correo</th>
          <th>Enlace</th>
        </tr>
      </thead>
      <tbody>{ponerFilas()}</tbody>
    </table>
  );
};

const mapStateToProps = (state) => state.userReducer;

export default connect(mapStateToProps, userActions)(App);
