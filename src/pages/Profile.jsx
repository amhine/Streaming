import React from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaHistory, FaTv, FaFilm, FaCalendarAlt, FaEnvelope } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Profile = () => {
    const { currentUser, history, logout } = useAuth();

    const stats = {
        totalWatched: history.length,
        films: history.filter(v => v.type === 'FILM').length,
        series: history.filter(v => v.type === 'SERIE').length,
        docs: history.filter(v => v.type === 'DOCUMENTAIRE').length
    };

    if (!currentUser) return null;

    return (
        <div className="container" style={{ paddingTop: '90px', paddingBottom: '5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 400px) 1fr', gap: '4rem', alignItems: 'start' }}>
                {/* Left: User Info */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass"
                    style={{ padding: '3rem', borderRadius: '16px' }}
                >
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <div style={{
                            width: '100px',
                            height: '100px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--primary)',
                            margin: '0 auto 1.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '3rem',
                            color: 'white',
                            boxShadow: '0 0 20px rgba(229, 9, 20, 0.4)'
                        }}>
                            <FaUser />
                        </div>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{currentUser.username}</h2>
                        <p style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                            <FaEnvelope /> {currentUser.email}
                        </p>
                    </div>

                    <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '2rem' }}>
                        <h4 style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>Statistiques</h4>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div className="glass" style={{ padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
                                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', display: 'block' }}>{stats.totalWatched}</span>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Vues</span>
                            </div>
                            <div className="glass" style={{ padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
                                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', display: 'block' }}>{stats.films}</span>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Films</span>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={logout}
                        style={{
                            width: '100%',
                            marginTop: '3rem',
                            padding: '1rem',
                            borderRadius: '8px',
                            border: '1px solid var(--primary)',
                            color: 'var(--primary)',
                            fontWeight: 'bold'
                        }}
                    >
                        Se déconnecter
                    </button>
                </motion.div>

                {/* Right: History */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
                        <FaHistory style={{ color: 'var(--primary)', fontSize: '1.8rem' }} />
                        <h2 style={{ fontSize: '2rem' }}>Historique de visionnage</h2>
                    </div>

                    {history.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {history.sort((a, b) => new Date(b.watchedAt) - new Date(a.watchedAt)).map(video => (
                                <Link to={`/video/${video.id}`} key={`${video.id}-${video.watchedAt}`}>
                                    <motion.div
                                        whileHover={{ scale: 1.01, backgroundColor: 'rgba(255,255,255,0.05)' }}
                                        className="glass"
                                        style={{
                                            display: 'grid',
                                            gridTemplateColumns: '120px 1fr 150px',
                                            gap: '1.5rem',
                                            alignItems: 'center',
                                            padding: '1rem',
                                            borderRadius: '12px'
                                        }}
                                    >
                                        <img src={video.thumbnailUrl} alt={video.title} style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', borderRadius: '8px' }} />
                                        <div>
                                            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.3rem' }}>{video.title}</h4>
                                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                {video.type === 'FILM' ? <FaFilm /> : <FaTv />} {video.category}
                                            </span>
                                        </div>
                                        <div style={{ textAlign: 'right', fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem' }}>
                                            <FaCalendarAlt /> {new Date(video.watchedAt).toLocaleDateString('fr-FR')}
                                        </div>
                                    </motion.div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '5rem 0', background: 'rgba(255,255,255,0.02)', borderRadius: '20px' }}>
                            <h3>Aucune vidéo visionnée</h3>
                            <p style={{ color: 'var(--text-muted)' }}>Commencez à regarder pour voir votre historique.</p>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default Profile;
