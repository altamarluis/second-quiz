function HistorySet({ queryHistoryResults, handleHistoryConsult } ){


    return (
        <div className="mx-3">
            <h3>Historial de consultas</h3>
            <table className="table">
            <thead>
              <tr>
                {queryHistoryResults.length > 0 && Object.keys(queryHistoryResults[0]).map((key, index) => (
                  <th key={index}>{key}</th>
                ))}
              </tr>
              </thead>
              <tbody>
                {queryHistoryResults.map((result, rowIndex) => (
                  <tr key={rowIndex} > {Object.values(result).map((value, colIndex) => (
                    <td key={colIndex}>{JSON.stringify(value)}</td>
                    ))}
                    <td>
                      <button className='btn btn-primary btn-sm' onClick={() => handleHistoryConsult(result)}>Consultar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
          </table>
        </div>
    )
}

export { HistorySet }