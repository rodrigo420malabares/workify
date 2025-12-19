import React, { useState, useContext } from 'react';
import { Modal, Button, Form, Alert, Spinner } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AuthModal = ({ show, handleClose }) => {
    const { login } = useContext(AuthContext);

    const navigate = useNavigate();

    // true = Login, false = Registro
    const [isLogin, setIsLogin] = useState(true);

    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        correo: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setError(null);
        setFormData({ nombre: '', apellido: '', correo: '', password: '', confirmPassword: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            if (isLogin) {
                // --- LOGIN ---
                const resultado = await login({
                    correo: formData.correo, password: formData.password
                });

                if (resultado.ok) {
                    handleClose();
                    // Opcional: navigate('/cliente'); 
                } else {
                    setError(resultado.msg || "Error al iniciar sesión");
                }

            } else {
                // --- REGISTRO ---
                if (formData.password !== formData.confirmPassword) {
                    throw new Error("Las contraseñas no coinciden");
                }

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

                const data = await resp.json();

                if (resp.ok) {
                    alert("Cuenta creada con éxito. Ahora iniciá sesión.");
                    setIsLogin(true); // Lo mandamos al login
                } else {
                    if (data.errors) {
                        setError(data.errors[0].msg);
                    } else {
                        setError(data.msg || "Error al registrarse");
                    }
                }
            }
        } catch (err) {
            setError(err.message || "Error de conexión");
        } finally {
            setLoading(false);
        }
    };

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
                            <Button variant="link" className="text-muted p-0 small" onClick={() => { handleClose(); navigate('/reset-password-request') }}>Olvidé mi contraseña</Button>
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