import './TableStyle.css';

function Table({queryResults}){
  return (//builds the table results
    <table className="styled-table">
      <thead>
        <tr>
          {queryResults.length > 0 && Object.keys(queryResults[0]).map((key, index) => (
            <th key={index}>{key}</th>
          ))}
        </tr>
        </thead>
        <tbody>
          {Array.isArray(queryResults) ? (
            queryResults.map((result, rowIndex) => (
              <tr key={rowIndex}>
                {Object.values(result).map((value, colIndex) => (
                  <td key={colIndex}>{JSON.stringify(value)}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10">No hay resultados.</td>
            </tr>
          )}
        </tbody>
    </table>
  )
}

export { Table };