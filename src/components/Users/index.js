import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { connect } from "react-redux";
import * as userActions from "../../actions/userActions";

const useData = (URL, action) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    console.log(action);
    action();
    // setLoading(true);
    // setError(undefined);
    // axios
    //   .get(URL)
    //   .then(({ data }) => {
    //     ReactDOM.unstable_batchedUpdates(() => {
    //       setData(data);
    //       setLoading(false);
    //     });
    //   })
    //   .catch((error) => {
    //     ReactDOM.unstable_batchedUpdates(() => {
    //       setError(error);
    //       setLoading(false);
    //     });
    //   });
  }, [URL]);

  return { data, loading, error };
};

const App = (props) => {
  const {
    data: users,
    loading,
    error,
  } = useData("https://jsonplaceholder.typicode.com/users", props.getAllUsers);

  console.log("render");

  const ponerFilas = () =>
    users.map(({ id, name, email, website }) => (
      <tr key={id}>
        <td>{name}</td>
        <td>{email}</td>
        <td>{website}</td>
      </tr>
    ));

  if (loading) {
    return "Cargando...";
  }

  if (error) {
    return "Error ❌";
  }

  console.log(props);

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
