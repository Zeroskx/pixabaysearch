import React, {useState} from 'react';
import Error from './Error'
import PropTypes from 'prop-types'; 

const Formulario = ({guardarBusqueda}) => {

    // State para la busqueda
    const [termino, guardarTermino] = useState('');
    const [error, guardarError] = useState(false);
    

    const buscarImagenes = (e) => {
        e.preventDefault();

        // Validar

        if (termino.trim() === '') {
            guardarError(true);
            return;
        }
        guardarError(false);
        // Enviar el termino de busqueda hacia el compinente principal

        guardarBusqueda(termino);

    }

    return ( 
        <form
            onSubmit={buscarImagenes}
        >
            <div className='row'>
            <div className='form-group col-md-8'>
                    <input
                        type='text'
                        className='form-control form-control-lg'
                        placeholder='Busca una imagen, ejemplo: futbol o cine'
                        onChange={ e => guardarTermino(e.target.value)}
                    />
                </div>
                <div className='form-group col-md-4'>
                    <input
                        type='submit'
                        className='btn btn-lg btn-danger btn-block'
                        value='Buscar'
                    />
                </div>
            </div>
            {error ? <Error mensaje='Introduce un término de busqueda' /> : null}
        </form>
     );
}


Formulario.propTypes = {
    guardarBusqueda: PropTypes.func.isRequired
}
 
export default Formulario;