import { useState } from 'react';
import { Form } from '../../components/Form';
import { Results } from '../../components/Results';
import axios from 'axios'
import './Table1Styles.css';

function Table1(){

  const [queryResults, setQueryResults] = useState([]);

  // Parametros de consulta
  const [countryName, setCountryName] = useState(''); // Define los estados para tus parámetros
  const [educationLevel, setEducationLevel] = useState('');
  const [experience, setExperience] = useState('');
  const [yearMin, setYearMin] = useState(0);
  const [yearMax, setYearMax] = useState(0);
  const [user, setUser] = useState('');
  const [coment, setComent] = useState('');
  const [indicator, setIndicator] = useState('');

  const handleSubmit = (e) => {

    // Para evitar cargar la página al enviar el formulario
    //e.preventDefault();

    // Construir la consulta dinámicamente con los parámetros
    //const query = `SELECT * FROM bigquery-public-data.world_bank_intl_education.international_education WHERE indicator_code = '${parametro1}'AND year = '${numeroParametro2}' LIMIT 10`;

    // Se usa el símbolo % para indicar que se debe buscar el texto en cualquier parte del campo en la consulta, quitar de requerirse
    // Si la forma de consulta no funciona cambiarla de alguna manera
    var indicatorName = 'Annual statutory teacher salaries in public institutions in USD';

    if (educationLevel != '' && experience != '') {
      indicatorName = indicatorName + '. ' + educationLevel + '. ' + experience;
    } else if (educationLevel != '') {
      indicatorName = indicatorName + '. ' + educationLevel;
    } else if (experience != '') {
      indicatorName = indicatorName + '. ' + experience;
    }

    setIndicator(indicatorName.valueOf());

    const query = `
    SELECT country_name AS country, country_code AS code, indicator_name AS indicator, year AS year, value AS value
    FROM bigquery-public-data.world_bank_intl_education.international_education
    WHERE country_name = '${countryName}'
    AND indicator_name = '${indicatorName}'
    AND year BETWEEN ${yearMin} AND ${yearMax}
    ORDER BY year
    `;
    axios.get(`http://localhost:8000/api/test/?query=${encodeURIComponent(query)}`)
        .then(response => setQueryResults(response.data))
        .catch(error => console.error('Error:', error));
    console.log("resultado", queryResults);
  }

  const handleSave = () => {

    axios.post(`http://localhost:8000/api/myApp/`, {
       title: 'no title',
       user: user,
       comments: coment,
       country: countryName,
       indicator: indicator,
       yearmin: yearMin,
       yearmax: yearMax,
     })
     .then(function (response) {
       console.log(response);
       alert('Consulta guardada');
     })
     .catch(function (error) {
       console.log(error);
     });
  }

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
          />

        </div>
      </div>
      <div className='col-8 margen mt-4'>
          <Results 
            queryResults={queryResults}
          />
        </div>
    </div>
    )
}

export {Table1};