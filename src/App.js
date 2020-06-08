import React, {useState,useEffect} from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';


function App() {

  // State de la App

  const [busqueda,guardarBusqueda] = useState('');

  // State de las imagenes que vienen de Pixa

  const [imagenes, guardarImagenes] = useState([]);

  // States para los paginadores
  const [paginaactual,guardarPaginaActual] = useState(1);
  const [totalpaginas,guardarTotalPaginas] = useState(1);
  /* Para usar los paginadores, la api nos tiene que proveer de informacion sobre el numero de resultados encontrados. Eso lo dividimos por el numero de resultados por paginas
  Y nos daria el total de paginas que estan disponibles para ser consultadas con el resultado de la busqueda del usuario*/


  useEffect(() => {
    if (busqueda==='') return;

    const consultarAPI = async () => {
      const imagenesPorPagina = 30;
      const key = '16062504-602d42c4b311e0ac1ed27b8ae';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaactual}`;
  
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      guardarImagenes(resultado.hits);

      // Calcular el total de paginas
      const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina)
      guardarTotalPaginas(calcularTotalPaginas);

      // Mover la pagina hacia arriba
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({behavior:'smooth'});
    }
    consultarAPI();
  }, [busqueda, paginaactual])

  // Definir la pagina anterior

  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaactual -1;
    // Evitar bajar de 0 en pagina actual
    if(nuevaPaginaActual === 0) return;
    guardarPaginaActual(nuevaPaginaActual)
  }

  // Definir la siguiente pagina
  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaactual +1;
    
    if (nuevaPaginaActual > totalpaginas) return;

    guardarPaginaActual(nuevaPaginaActual)
  }
  return (
      <div className='container'>
        <div className='jumbotron'>
          <p className='lead text-center'>Buscador de Imagenes</p>
          <Formulario 
            guardarBusqueda={guardarBusqueda}
          />
        </div>
        <div className='row justify-content-center'>
          <ListadoImagenes
            imagenes={imagenes}
          />
          {(paginaactual === 1) ? null : (
            <button 
              type='button'
              className='bbtn btn-info mr-1'
              onClick={paginaAnterior}
            >&laquo; Anterior</button>
          )}
          {(paginaactual === totalpaginas ) ? null : (
            <button 
              type='button'
              className='bbtn btn-info'
              onClick={paginaSiguiente}
            >Siguiente &raquo;</button>
          )}
        </div>
      </div>
  );
}

export default App;
