import { Link } from "react-router-dom";

export const Table = ({ data, title, rowNames }) => {
  const renderRows = () =>
    data.map((item, key) => (
      <tr key={item.id}>
        {rowNames.map((rowName) => (
          <td>{item[rowName]}</td>
        ))}
        <td>
          <Link to={`/publications/${key}`}>
            <div class="eye-solid icon"></div>
          </Link>
        </td>
      </tr>
    ));

  return (
    <>
      <h2>{title}</h2>
      <table className="tabla">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Enlace</th>
          </tr>
        </thead>
        <tbody>{renderRows()}</tbody>
      </table>
    </>
  );
};
