import { Table } from '../components/Table.jsx';
import { Graphic } from './Graphic.jsx';
import { NoQuery } from './NoQuery.jsx';
import LineChart from './LineChart.jsx';

function Results({ queryResults }) {

  if (queryResults.length === 0) {
    return (
      <div className='row text-center h-100 align-content-center'>
        <NoQuery />
      </div>
    )
  }

  else {
    return(
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