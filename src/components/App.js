import { useState } from "react";

const App = () => {
  const usersData = [
    {
      name: "Rodolfo",
      email: "Rodolfo@platzi.com",
      personalSite: "Rodolfo.com",
    },
    {
      name: "Rodolfo",
      email: "Rodolfo@platzi.com",
      personalSite: "Rodolfo.com",
    },
  ];
  const [users, setUsers] = useState(usersData);

  const ponerFilas = () =>
    users.map(({ name, email, personalSite }) => (
      <tr>
        <td>{name}</td>
        <td>{email}</td>
        <td>{personalSite}</td>
      </tr>
    ));

  return (
    <div className="margen">
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
    </div>
  );
};

export default App;
