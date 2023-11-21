import { useState } from 'react';

function Form({ setCountryName, setEducationLevel, setExperience, setYearMin, setYearMax, countryName, educationLevel, experience, yearMin, yearMax, handleSubmit, user, setUser, coment, setComent, handleSave, setHistorialActive, nombreNonsulta, setNombreConsulta, historialButtonAction}){

    // Save button state variables
    const [habilitado, setHabilitado] = useState(false);

    const saveButtonAction = (e) => {
      // To avoid loading the page when submitting the form
      e.preventDefault();

      //handleSave function
      handleSave();

      //disable save button
      setHabilitado(false);

      //clean the fields
      setUser('');
      setComent('');
      setNombreConsulta('');
    }

    const histButtonAction = (e) => {
      // To avoid loading the page when submitting the form
      e.preventDefault();
      
      // handles historial button action
      historialButtonAction();

      //disable save button
      setHabilitado(false);
  }

    const consultButtonAction = (e) => {
        // To avoid loading the page when submitting the form
        e.preventDefault();

        //handle submit query button
        handleSubmit();
        
        //disable save button
        setHabilitado(true);
    }


    return(
        <div>
          <form onSubmit={ consultButtonAction } className='row'>
            
            <h4 className='text-center'>Valores de la consulta</h4>

            <div className='my-1'>
              <label className='form-label'>Country Name:</label>
              <input type="text" value={countryName} onChange={(e) => setCountryName(e.target.value)} className='form-control' required/>
            </div>
            
            <div className='my-1'>
              <label className='form-label'>Nivel Escolar de enseñanza:</label>
              <select value={educationLevel} onChange={(e) => setEducationLevel(e.target.value)} className='form-control' required>
                <option value=''>Selecciona una opción...</option>
                <option value='Pre-Primary'>Pre-Primary</option>
                <option value='Primary'>Primary</option>
                <option value='Lower Secondary'>Lower Secondary</option>
                <option value='Upper Secondary'>Upper Secondary</option>
              </select>
            </div>

            <div className='my-1'>
              <label className='form-label'>Experiencia:</label>
              <select value={experience} onChange={(e) => setExperience(e.target.value)} className='form-control' required>
                <option value=''>Selecciona una opción...</option>
                <option value='10 years of experience'>10 years of experience</option>
                <option value='15 years of experience'>15 years of experience</option>
                <option value='Starting salary'>Starting salary</option>
                <option value='Top of scale'>Top of scale</option>
              </select>
            </div>
            
            <div className='col-md-6 my-1'>
              <label className='form-label'>Desde el año:</label>
              <input type="number" max={3000} min={0} value={yearMin} onChange={(e) => setYearMin(e.target.value)} className='form-control' required/>
            </div>
            
            <div className='col-md-6 my-1'>
              <label className='form-label'>Hasta:</label>
              <input type="number" max={3000} min={0} value={yearMax} onChange={(e) => setYearMax(e.target.value)} className='form-control' required/>
            </div>

            <input type="submit" className='btn btn-success btn-md my-3' value="Consultar" />

            <div className='my-1'>
              <label className='form-label'>Usuario:</label>
              <input type="text" value={user} onChange={(e) => setUser(e.target.value)} className='form-control' disabled={!habilitado} />
            </div>

            <div className='my-1'>
              <label className='form-label'>Nombre de la consulta:</label>
              <input type="text" value={nombreNonsulta} onChange={(e) => setNombreConsulta(e.target.value)} className='form-control' disabled={!habilitado} />
            </div>

            <div className='mt-1'>
              <label className='form-label'>Comentario:</label>
              <textarea value={coment} onChange={(e) => setComent(e.target.value)} className='form-control' disabled={!habilitado} rows={2} />
            </div>

          </form>

          <div className='row align justify-content-around my-3'>
            <button className="col-5 btn btn-primary btn-md" disabled={!habilitado} onClick={saveButtonAction}>Guardar</button>
            <button className='col-5 btn btn-outline-primary btn-md' onClick={histButtonAction}>Historial</button>
          </div>
        </div>
    )
}

export { Form };