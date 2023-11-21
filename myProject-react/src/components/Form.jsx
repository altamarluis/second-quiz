import { useState } from 'react';

function Form({ setCountryName, setEducationLevel, setExperience, setYearMin, setYearMax, countryName, educationLevel, experience, yearMin, yearMax, handleSubmit, user, setUser, coment, setComent, handleSave}){

    // Variables de estado del boton de guardar
    const [habilitado, setHabilitado] = useState(false);

    const saveButtonAction = () => {
        handleSave();
        setHabilitado(false);
        setUser('');
        setComent('');
    }

    const consultButtonAction = (e) => {
        // Para evitar cargar la página al enviar el formulario
        e.preventDefault();

        handleSubmit();
        setHabilitado(true);
    }

    return(
        <>
          <form onSubmit={ consultButtonAction } className='row'>
            
            <h3 className='text-center nowrap'>Valores de la consulta</h3>

            <div className='my-1'>
              <label className='form-label'>Country Name:</label>
              <input type="text" value={countryName} onChange={(e) => setCountryName(e.target.value)} className='form-control' />
            </div>
            
            <div className='my-1'>
              <label className='form-label'>Nivel Escolar de enseñanza:</label>
              <select value={educationLevel} onChange={(e) => setEducationLevel(e.target.value)} className='form-control' >
                <option value=''>Selecciona una opción...</option>
                <option value='Pre-Primary'>Pre-Primary</option>
                <option value='Primary'>Primary</option>
                <option value='Lower Secondary'>Lower Secondary</option>
                <option value='Upper Secondary'>Upper Secondary</option>
              </select>
            </div>

            <div className='my-1'>
              <label className='form-label'>Experiencia:</label>
              <select value={experience} onChange={(e) => setExperience(e.target.value)} className='form-control' >
                <option value=''>Selecciona una opción...</option>
                <option value='10 years of experience'>10 years of experience</option>
                <option value='15 years of experience'>15 years of experience</option>
                <option value='Starting salary'>Starting salary</option>
                <option value='Top of scale'>Top of scale</option>
              </select>
            </div>
            
            <div className='col-md-6 my-1'>
              <label className='form-label'>Desde el año:</label>
              <input type="number" value={yearMin} onChange={(e) => setYearMin(e.target.value)} className='form-control' />
            </div>
            
            <div className='col-md-6 my-1'>
              <label className='form-label'>Hasta:</label>
              <input type="number" value={yearMax} onChange={(e) => setYearMax(e.target.value)} className='form-control' />
            </div>

            <input type="submit" className='btn btn-success btn-md my-1' value="Consultar" />

            <div className='my-1'>
              <label className='form-label'>Usuario:</label>
              <input type="text" value={user} onChange={(e) => setUser(e.target.value)} className='form-control' disabled={!habilitado} />
            </div>

            <div className='my-1'>
              <label className='form-label'>Comentario:</label>
              <textarea value={coment} onChange={(e) => setComent(e.target.value)} className='form-control' disabled={!habilitado} />
            </div>

            <div className='row align justify-content-around my-1'>
              <button className="col-5 btn btn-primary btn-md" disabled={!habilitado} onClick={saveButtonAction}>Guardar</button>
              <button className='col-5 btn btn-outline-primary btn-md'>Historial</button>
            </div>
          </form>
        </>
    )
}

export { Form };