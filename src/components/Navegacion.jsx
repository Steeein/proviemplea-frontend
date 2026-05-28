// src/components/Navegacion.jsx
import './Navegacion.css';

function Navegacion() {
    return (
        <header className="barra-navegacion">
            <div className="nav-logo">
                <h2>ProviEmplea</h2>
            </div>
            <nav className="nav-enlaces">
                <a href="#inicio">Inicio</a>
                <a href="#candidatos">Talentos</a>
                <a href="#nosotros">Nosotros</a>
                <a href="#contacto" className="btn-contacto-nav">Contacto</a>
            </nav>
        </header>
    );
}

export default Navegacion;