export const Table = ({ title, renderRows, headers }) => {
  return (
    <>
      <h2>{title}</h2>
      <table className="tabla">
        <thead>
          <tr>
            {headers.map((name, key) => (
              <th key={key}>{name}</th>
            ))}
          </tr>
        </thead>
        <tbody>{renderRows()}</tbody>
      </table>
    </>
  );
};
