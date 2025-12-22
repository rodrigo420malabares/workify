import React, { useState, useContext } from 'react';
import { Modal, Button, Form, Alert, Spinner } from 'react-bootstrap';
// Importamos el contexto para usar la función LOGIN global
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// 🚨 CORRECCIÓN: Importamos una función helper para el registro (para no tener el fetch acá)
// Tarea: Creá este archivo en helpers/registerApi.js si no lo tenés.
import { registroUsuario } from '../helpers/registerApi';

const AuthModal = ({ show, handleClose }) => {
    // 1. HOOKS Y CONTEXTO
    // Traemos la función 'login' del AuthContext. No traemos 'usuario' porque no lo necesitamos acá.
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();


    // 2. ESTADOS (La memoria del modal)
    // Switch: true muestra Login, false muestra Registro.
    const [isLogin, setIsLogin] = useState(true);

    // Un solo estado tipo objeto para manejar TODOS los inputs.
    // Esto es "Inputs Controlados".
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        correo: '',
        password: '',
        confirmPassword: ''
    });
    // Para mostrar errores rojos arriba
    const [error, setError] = useState(null);

    // Para bloquear el botón y mostrar el spinner mientras carga
    const [loading, setLoading] = useState(false);


    // 3. HANDLERS (Las funciones que reaccionan)

    // Esta función mágica actualiza cualquier input.
    // Usa [e.target.name] para saber qué campo se está escribiendo (nombre, correo, etc).
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Cambia entre modo Login y Registro y LIMPIA los campos.
    // Es buena práctica limpiar los errores al cambiar de pestaña.

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setError(null);
        setFormData({ nombre: '', apellido: '', correo: '', password: '', confirmPassword: '' });
    };
    // 4. EL CEREBRO (El envío del formulario)
    const handleSubmit = async (e) => {
        e.preventDefault();// Evita que la página se recargue (básico de SPA)
        setError(null);
        setLoading(true);// Prende el spinner

        try {
            if (isLogin) {
                // ================= LÓGICA DE LOGIN =================
                // Llamamos a la función del Contexto. 
                // Si falla, el catch de abajo agarra el error.
                const resultado = await login({
                    correo: formData.correo, password: formData.password
                });

                if (resultado.ok) {
                    handleClose();// Cerramos el modal si todo salió bien

                    // No hace falta navegar, el AuthContext actualiza el Header solo.
                } else {

                    setError(resultado.msg || "Error al iniciar sesión");
                }

            } else {
                // ================= LÓGICA DE REGISTRO =================

                // Validación manual de contraseñas
                if (formData.password !== formData.confirmPassword) {
                    throw new Error("Las contraseñas no coinciden");
                }
                // 🚨 CORRECCIÓN: Usamos un helper en vez del fetch directo
                // Enviamos los datos limpios al backend
                const resp = await fetch('https://ecommercew14backend.vercel.app/api/usuarios', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        nombre: formData.nombre,
                        apellido: formData.apellido,
                        correo: formData.correo,
                        password: formData.password,
                        rol: 'Usuario'
                    })
                });

                // 🚨 CORRECCIÓN: Usamos un helper en vez del fetch directo
                // Enviamos los datos limpios al backend
                await registroUsuario({
                    nombre: formData.nombre,
                    apellido: formData.apellido,
                    correo: formData.correo,
                    password: formData.password,
                    rol: 'Usuario' // Forzamos que sea usuario común
                });

                // Si llega acá es porque no hubo error en el registro
                setSuccessMsg("Cuenta creada con éxito. Por favor iniciá sesión.");
                setIsLogin(true); // Lo mandamos a la pantalla de login automáticamente
            }
        } catch (err) {
            // Manejo unificado de errores (tanto de login como registro)
            setError(err.message || "Ocurrió un error inesperado");

        } finally {
            setLoading(false);// Apaga el spinner pase lo que pase
        }
    };
    // 5. RENDERIZADO (Lo que se ve)
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton className="bg-primary text-white">
                <Modal.Title>{isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleSubmit}>

                    {!isLogin && (
                        <>
                            <Form.Group className="mb-3">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    type="text" placeholder="Tu nombre" name="nombre"
                                    value={formData.nombre} onChange={handleChange} required={!isLogin}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Apellido</Form.Label>
                                <Form.Control
                                    type="text" placeholder="Tu apellido" name="apellido"
                                    value={formData.apellido} onChange={handleChange} required={!isLogin}
                                />
                            </Form.Group>
                        </>
                    )}


                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email" placeholder="email@ejemplo.com" name="correo"
                            value={formData.correo} onChange={handleChange} required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control
                            type="password" placeholder="******" name="password"
                            value={formData.password} onChange={handleChange} required
                        />
                    </Form.Group>

                    {!isLogin && (
                        <Form.Group className="mb-3">
                            <Form.Label>Confirmar Contraseña</Form.Label>
                            <Form.Control
                                type="password" placeholder="******" name="confirmPassword"
                                value={formData.confirmPassword} onChange={handleChange} required={!isLogin}
                            />
                        </Form.Group>
                    )}

                    <div className="d-grid gap-2">
                        <Button variant="primary" type="submit" disabled={loading}>
                            {loading ? <Spinner as="span" animation="border" size="sm" /> : (isLogin ? 'Ingresar' : 'Registrarse')}
                        </Button>
                    </div>
                </Form>
            </Modal.Body>

            <Modal.Footer className="justify-content-center">
                <div className="text-center">
                    {isLogin ? (
                        <>
                            <p className="mb-1">¿No tenés cuenta? <Button variant="link" className="p-0" onClick={toggleMode}>Registrate</Button></p>
                            <Button variant="link" className="text-muted p-0 small" onClick={() => { handleClose(); navigate('/forgot-password') }}>Olvidé mi contraseña</Button>
                        </>
                    ) : (
                        <p className="mb-0">¿Ya tenés cuenta? <Button variant="link" className="p-0" onClick={toggleMode}>Ingresá</Button></p>
                    )}
                </div>
            </Modal.Footer>
        </Modal>
    );
};

export default AuthModal;