import './TarjetaCandidato.css'; // <-- Esta es la línea mágica que conecta el diseño

// Agregamos { nombre, profesion } como parámetros
function TarjetaCandidato({ nombre, profesion }) {
    return (
        <div className="tarjeta-perfil">
            <img src="https://via.placeholder.com/150" alt="Foto del candidato" />
            {/* Reemplazamos el texto fijo por las variables */}
            <h3>{nombre}</h3>
            <p>{profesion}</p>
            <button>Contactar Perfil</button>
        </div>
    );
}

export default TarjetaCandidato;