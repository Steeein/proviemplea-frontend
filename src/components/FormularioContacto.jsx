import { useState } from 'react';
import './FormularioContacto.css';

function FormularioContacto() {
    // Estado que guarda todos los campos del formulario.
    const [datosFormulario, setDatosFormulario] = useState({
        nombre: '',
        correo: '',
        servicio: '',
        mensaje: '',
        apellidoOculto: ''
    });

    // Mensaje de alerta para mostrar errores o confirmaciones.
    const [mensajeAlerta, setMensajeAlerta] = useState('');

    // Actualiza el estado en cada cambio de input.
    const manejarCambio = (evento) => {
        const { name, value } = evento.target;
        setDatosFormulario({
            ...datosFormulario,
            [name]: value
        });
    };

    // Controla el envío del formulario y valida los datos.
    const manejarEnvio = (evento) => {
        evento.preventDefault(); // Evita la recarga de la página.
        // Honeypot: campo invisible para detectar envíos automáticos.
        if (datosFormulario.apellidoOculto !== '') {
            console.warn(" Bot de spam detectado y bloqueado");
            return; // Corta la ejecución de la función aquí mismo
        }
        // Validación básica del lado del cliente
        if (!datosFormulario.nombre || !datosFormulario.correo || !datosFormulario.mensaje) {
            setMensajeAlerta('❌ Por favor, completa todos los campos obligatorios.');
            return;
        }

        if (!datosFormulario.correo.includes('@')) {
            setMensajeAlerta('❌ Ingresa un correo electrónico válido.');
            return;
        }

        // Si pasa las validaciones, simulamos el envío
        console.log("Datos listos para enviar a la base de datos:", datosFormulario);
        setMensajeAlerta('✅ ¡Mensaje enviado con éxito! Nos contactaremos pronto.');
        
        // Limpiamos el formulario (apellidoOculto se resetea para mantener el input controlado)
        setDatosFormulario({ nombre: '', correo: '', servicio: '', mensaje: '', apellidoOculto: '' });
    };

    return (
        <div className="contenedor-formulario" id="contacto">
            <h2>Contáctanos</h2>
            <p>¿Buscas talento o quieres ser parte de la plataforma?</p>
            
            <form onSubmit={manejarEnvio} className="formulario">
                <div className="grupo-input">
                    <label>Nombre Completo *</label>
                    <input 
                        type="text" 
                        name="nombre" 
                        value={datosFormulario.nombre} 
                        onChange={manejarCambio} 
                        placeholder="Ej. Juan Pérez"
                    />
                </div>

                <div className="grupo-input">
                    <label>Correo Electrónico *</label>
                    <input 
                        type="email" 
                        name="correo" 
                        value={datosFormulario.correo} 
                        onChange={manejarCambio} 
                        placeholder="tucorreo@empresa.com"
                    />
                </div>

                <div className="grupo-input">
                    <label>Perfil de Interés (Opcional)</label>
                    <select name="servicio" value={datosFormulario.servicio} onChange={manejarCambio}>
                        <option value="">Selecciona un perfil...</option>
                        <option value="desarrollo">Desarrolladores</option>
                        <option value="diseno">Diseñadores UI/UX</option>
                        <option value="soporte">Soporte TI</option>
                    </select>
                </div>

                <div className="grupo-input">
                    <label>Mensaje *</label>
                    <textarea 
                        name="mensaje" 
                        value={datosFormulario.mensaje} 
                        onChange={manejarCambio} 
                        rows="4" 
                        placeholder="Cuéntanos qué necesitas..."
                    ></textarea>
                </div>

                {/* Muestra el mensaje de alerta cuando hay texto disponible. */}
                {mensajeAlerta && <div className="alerta-formulario">{mensajeAlerta}</div>}
                {/* Campo oculto para los bots; los humanos no lo verán ni lo llenarán. */}
                <input 
                    type="text" 
                    name="apellidoOculto" 
                    value={datosFormulario.apellidoOculto} 
                    onChange={manejarCambio} 
                    style={{ display: 'none' }} 
                    tabIndex="-1" 
                    autoComplete="off"
                />

                <button type="submit" className="btn-enviar">Enviar Mensaje</button>
            </form>
        </div>
    );
}

export default FormularioContacto;