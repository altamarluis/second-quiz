import { useState } from 'react';
import { Form } from '../../components/Form';
import { Results } from '../../components/Results';
import axios from 'axios'
import './Table1Styles.css';

function Table1(){

  // State to manage query results
  const [queryResults, setQueryResults] = useState([]);

  // Query parameters state
  const [countryName, setCountryName] = useState('');
  const [educationLevel, setEducationLevel] = useState('');
  const [experience, setExperience] = useState('');
  const [yearMin, setYearMin] = useState(0);
  const [yearMax, setYearMax] = useState(0);
  const [user, setUser] = useState('');
  const [coment, setComent] = useState('');
  const [indicator, setIndicator] = useState('');
  const [nombreConsulta, setNombreConsulta] = useState('');
  const [queryMessage, setQueryMessage] = useState('Realiza la consulta')

  // State for query historys
  const [historialActive, setHistorialActive] = useState(false);
  const [queryHistoryResults, setQueryHistoryResults] = useState([]);

  // Function to handle form submission and execute the query
  const handleSubmit = () => {
    setQueryMessage('Cargando Consulta');
    setHistorialActive(false);

    // Construct dynamic query based on user inputs
    var indicatorName = 'Annual statutory teacher salaries in public institutions in USD';
    if (educationLevel != '' && experience != '') {
      indicatorName = indicatorName + '. ' + educationLevel + '. ' + experience;
    } else if (educationLevel != '') {
      indicatorName = indicatorName + '. ' + educationLevel;
    } else if (experience != '') {
      indicatorName = indicatorName + '. ' + experience;
    }
    setIndicator(indicatorName.valueOf());
  
    // Construct BigQuery SQL-like query
    const query = `
    SELECT country_name AS country, country_code AS code, indicator_name AS indicator, year AS year, value AS value
    FROM bigquery-public-data.world_bank_intl_education.international_education
    WHERE country_name = '${countryName}'
    AND indicator_name = '${indicator}'
    AND year BETWEEN ${yearMin} AND ${yearMax}
    ORDER BY year
    `;

    // Send query to the backend API
    axios.get(`http://localhost:8000/api/test/?query=${encodeURIComponent(query)}`)
        .then(response => {
          setQueryResults(response.data);
          if(queryResults.length <=0 ){setQueryMessage('Sin Resultados')}
        })
        .catch(error => console.error('Error:', error));
  }

  // Function to save the current query
  const handleSave = () => {
    axios.post(`http://localhost:8000/api/myApp/`, {
       title: nombreConsulta,
       user: user,
       comments: coment,
       country: countryName,
       indicator: indicator,
       yearmin: yearMin,
       yearmax: yearMax,
     })
     .then(function (response) {
       console.log(response);
       alert('Consulta guardada'); // Display alert on successful query save
     })
     .catch(function (error) {
       console.log(error);
     });
  }

  // Function to handle the click event on the "Historial" button
  const historialButtonAction = () => {
    axios.get(`http://localhost:8000/api/myApp/`)
        .then(response => setQueryHistoryResults(response.data))
        .catch(error => console.error('Error:', error));
    setHistorialActive(true); // Enable query history display
    console.log('presionar');
}

  // Function to handle historical query
  const handleHistoryConsult = (rowData) => {
    setQueryMessage('Cargando Consulta'); // Display loading message
    setQueryResults([]);
    setHistorialActive(false); // Disable query history

    // Construct historical query based on selected row data
    const query2 = `
    SELECT country_name AS country, country_code AS code, indicator_name AS indicator, year AS year, value AS value
    FROM bigquery-public-data.world_bank_intl_education.international_education
    WHERE country_name = '${rowData.country}'
    AND indicator_name = '${rowData.indicator}'
    AND year BETWEEN ${rowData.yearmin} AND ${rowData.yearmax}
    ORDER BY year
    `;

    // Send historical query to the backend API
    axios.get(`http://localhost:8000/api/test/?query=${encodeURIComponent(query2)}`)
        .then(response => {
          setQueryResults(response.data);
          if(queryResults.length <=0 ){setQueryMessage('Sin Resultados')} // Display message if no results
        })
        .catch(error => console.error('Error:', error));
    
  }

  // Render the UI components
  return(
    <div className='row'>
      <div className='row col-4 left-section overflow-scroll position-fixed'>
        <div className='row border-section align-items-center justify-content-center mx-2'>

          <Form 
            setCountryName={setCountryName} 
            setEducationLevel={setEducationLevel} 
            setExperience={setExperience} 
            setYearMin={setYearMin} 
            setYearMax={setYearMax} 
            countryName={countryName} 
            educationLevel={educationLevel} 
            experience={experience} 
            yearMin={yearMin} 
            yearMax={yearMax} 
            handleSubmit={handleSubmit}
            user={user}
            setUser={setUser}
            coment={coment}
            setComent={setComent}
            handleSave={handleSave}
            setHistorialActive={setHistorialActive}
            nombreConsulta={nombreConsulta}
            setNombreConsulta={setNombreConsulta}
            historialButtonAction={historialButtonAction}
          />

        </div>
      </div>
      <div className='col-8 margen mt-4'>
          <Results
            queryResults={queryResults}
            historialActive={historialActive}
            queryHistoryResults={queryHistoryResults}
            handleHistoryConsult={handleHistoryConsult}
            queryMessage={queryMessage}
          />
        </div>
    </div>
    )
}

export {Table1};