export const Table = ({ data, title, rowNames }) => {
  const renderRows = () =>
    data.map((item) => (
      <tr key={item.id}>
        {rowNames.map((rowName) => (
          <td>{item[rowName]}</td>
        ))}
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
