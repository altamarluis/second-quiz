import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
  const [queryResults, setQueryResults] = useState([]);
  const [parametro1, setParametro1] = useState(''); // Define los estados para tus parámetros
  const [parametro2, setParametro2] = useState('');
  /*useEffect(()=>{
    axios.get('http://localhost:8000/api/myApp/')
      .then(({ data }) => {
        console.log('¿data',data)
      })
  },[]) */

  const handleConsultarClick = () => {
    const numeroParametro2 = parseInt(parametro2, 10);
    console.log('Número de parámetro 2:', numeroParametro2);
    if (!isNaN(numeroParametro2)) {
      // Construir la consulta dinámicamente con los parámetros
      //const query = `SELECT * FROM bigquery-public-data.world_bank_intl_education.international_education WHERE indicator_code = '${parametro1}' AND year = '${numeroParametro2}' LIMIT 10`;
      const query = `
      SELECT *
      FROM bigquery-public-data.world_bank_intl_education.international_education
      WHERE country_name = '${parametro1}'
      AND year > ${numeroParametro2}
    `;
    axios.get(`http://localhost:8000/api/test/?query=${encodeURIComponent(query)}`)
        .then(response => setQueryResults(response.data))
        .catch(error => console.error('Error:', error));
    } else {
      console.error('Los parámetros deben ser números válidos.');
    }
  };

 /*async function buttonTest() {
  axios.get('http://localhost:8000/api/myApp/')
      .then(({ data }) => {
        console.log('¿data',data)
      })
 }*/

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Resultados de la consulta</h1>
      <div>
        <label>Parámetro 1:</label>
        <input type="text" value={parametro1} onChange={(e) => setParametro1(e.target.value)} />
      </div>
      <div>
        <label>Parámetro 2:</label>
        <input type="text" value={parametro2} onChange={(e) => setParametro2(e.target.value)} />
      </div>
      <button onClick={handleConsultarClick}>Consultar BigQuery</button>
      <table className="styled-table">
        <thead>
          <tr>
            {queryResults.length > 0 && Object.keys(queryResults[0]).map((key, index) => (
              <th key={index}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {queryResults.map((result, rowIndex) => (
            <tr key={rowIndex}>
              {Object.values(result).map((value, colIndex) => (
                <td key={colIndex}>{JSON.stringify(value)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      
    </>
  )
}

export default App
