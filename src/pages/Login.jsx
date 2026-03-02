import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Veuillez remplir tous les champs');
            return;
        }

        const { success, message } = login(email, password);
        if (success) {
            navigate('/');
        } else {
            setError(message);
        }
    };

    return (
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 160px)' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass"
                style={{ padding: '3rem', borderRadius: '16px', width: '100%', maxWidth: '450px' }}
            >
                <h1 style={{ marginBottom: '2rem', textAlign: 'center', fontSize: '2rem' }}>Connexion</h1>

                {error && (
                    <div style={{ backgroundColor: 'rgba(229, 9, 20, 0.2)', color: '#e50914', padding: '10px', borderRadius: '4px', marginBottom: '1rem', textAlign: 'center' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="votre@email.com"
                            style={{
                                width: '100%',
                                padding: '0.8rem',
                                borderRadius: '4px',
                                border: '1px solid var(--glass-border)',
                                background: 'rgba(0,0,0,0.3)',
                                color: 'white'
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Mot de passe</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            style={{
                                width: '100%',
                                padding: '0.8rem',
                                borderRadius: '4px',
                                border: '1px solid var(--glass-border)',
                                background: 'rgba(0,0,0,0.3)',
                                color: 'white'
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '1rem',
                            backgroundColor: 'var(--primary)',
                            color: 'white',
                            borderRadius: '4px',
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            marginBottom: '1.5rem'
                        }}
                    >
                        Se connecter
                    </button>
                </form>

                <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                    Nouveau sur la plateforme ? <Link to="/register" style={{ color: 'white', fontWeight: 'bold' }}>S'inscrire</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
