// src/components/CarruselTestimonios.jsx
import { useState, useEffect } from 'react';
import './CarruselTestimonios.css';

function CarruselTestimonios() {
    const [testimonios, setTestimonios] = useState([]);
    const [indiceActual, setIndiceActual] = useState(0);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    // Carga los datos desde public/data/testimonios.json de forma asíncrona.
    // Al usar un archivo externo + fetch, este patrón es idéntico al que usarías
    // con una API real: solo cambiarías la URL.
    useEffect(() => {
        fetch('/data/testimonios.json')
            .then((respuesta) => {
                if (!respuesta.ok) {
                    throw new Error('No se pudieron cargar los testimonios.');
                }
                return respuesta.json();
            })
            .then((datos) => {
                setTestimonios(datos);
                setCargando(false);
            })
            .catch((err) => {
                setError(err.message);
                setCargando(false);
            });
    }, []);

    const siguienteTestimonio = () => {
        setIndiceActual((prev) => (prev === testimonios.length - 1 ? 0 : prev + 1));
    };

    const anteriorTestimonio = () => {
        setIndiceActual((prev) => (prev === 0 ? testimonios.length - 1 : prev - 1));
    };

    if (cargando) {
        return (
            <div className="carrusel-contenedor">
                <p className="carrusel-estado">Cargando testimonios...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="carrusel-contenedor">
                <p className="carrusel-estado carrusel-error">Error: {error}</p>
            </div>
        );
    }

    return (
        <div className="carrusel-contenedor">
            <h2 className="carrusel-titulo">Casos de Éxito</h2>

            <div className="carrusel-tarjeta">
                <p className="carrusel-texto">"{testimonios[indiceActual].texto}"</p>
                <h4 className="carrusel-autor">— {testimonios[indiceActual].autor}</h4>

                <div className="carrusel-controles">
                    <button onClick={anteriorTestimonio} className="btn-carrusel">Anterior</button>
                    <span className="carrusel-indicador">
                        {indiceActual + 1} / {testimonios.length}
                    </span>
                    <button onClick={siguienteTestimonio} className="btn-carrusel">Siguiente</button>
                </div>
            </div>
        </div>
    );
}

export default CarruselTestimonios;
