import { Table } from '../components/Table.jsx';
import { NoQuery } from './NoQuery.jsx';
import LineChart from './LineChart.jsx';
import { HistorySet } from './HistorySet.jsx';

//handles the results shown
function Results({ queryResults, historialActive, queryHistoryResults, handleHistoryConsult, queryMessage }) {

  if (historialActive && queryHistoryResults.length > 0) {
    return ( //show the history of saved querys
      <div>
        <HistorySet
          queryHistoryResults={queryHistoryResults}
          handleHistoryConsult={handleHistoryConsult}
        />
      </div>
    )
  }
  else if(historialActive && queryHistoryResults.length === 0) {
    return ( //if there is no query saved yet
      <div className='row text-center h-100 align-content-center'>
        <h3>No hay consultas guardadas</h3>
      </div>
    )
  }
  else if (queryResults.length === 0) {
    return ( //shows a message if there is no query consult avaiable
      <div className='row text-center h-100 align-content-center'>
        <NoQuery 
         queryMessage={queryMessage}
        />
      </div>
    )
  }

  else {
    return(//shows th graph and the table of results from the query
      <>
        <div className="bg-light mx-auto px-2 border border-2 border-primary">
          <LineChart
            queryResults = {queryResults}
          />
        </div>
  
        <div>
          {queryResults.length <= 0 && <h3 className='text-center'>No hay resultados</h3>}
          <Table
            queryResults = {queryResults}
          />
        </div>
      </>
    )
  }

}

export { Results }