// src/App.jsx
import './App.css';
import Navegacion from './components/Navegacion';
import TarjetaCandidato from './components/TarjetaCandidato';
import CarruselTestimonios from './components/CarruselTestimonios';
import FormularioContacto from './components/FormularioContacto';

function App() {
  return (
    <div>
      <Navegacion />

      <section id="inicio">
        <h1>Plataforma ProviEmplea</h1>
        <p>Búsqueda inversa de talento local</p>
      </section>

      <section id="candidatos">
        <div className="contenedor-grilla">
          <TarjetaCandidato nombre="Diego Abaroa" profesion="Soporte Nivel 1.5" />
          <TarjetaCandidato nombre="Ana Silva" profesion="Desarrolladora Frontend" />
          <TarjetaCandidato nombre="Carlos Gómez" profesion="Analista de Datos" />
          <TarjetaCandidato nombre="Luisa Pérez" profesion="Diseñadora UX/UI" />
        </div>
      </section>

      <section id="nosotros">
        <CarruselTestimonios />
      </section>

      <FormularioContacto />
    </div>
  )
}

export default App;