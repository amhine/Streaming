import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash, FaPlay, FaBookmark, FaStar } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Watchlist = () => {
    const { watchlist, toggleWatchlist } = useAuth();

    return (
        <div className="container" style={{ paddingTop: '90px', paddingBottom: '5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
                <FaBookmark style={{ color: 'var(--primary)', fontSize: '2rem' }} />
                <h1 style={{ fontSize: '2.5rem' }}>Ma Liste</h1>
                <span style={{ backgroundColor: 'var(--surface)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    {watchlist.length} {watchlist.length > 1 ? 'contenus' : 'contenu'}
                </span>
            </div>

            {watchlist.length > 0 ? (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '2rem'
                }}>
                    <AnimatePresence>
                        {watchlist.map(video => (
                            <motion.div
                                key={video.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="glass"
                                style={{ borderRadius: '12px', overflow: 'hidden', position: 'relative' }}
                            >
                                <Link to={`/video/${video.id}`}>
                                    <img src={video.thumbnailUrl} alt={video.title} style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover' }} />
                                    <div style={{ padding: '1rem' }}>
                                        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{video.title}</h3>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                            <span style={{ color: '#46d369' }}>{video.rating} <FaStar style={{ fontSize: '0.7rem' }} /></span>
                                            <span>{video.type}</span>
                                        </div>
                                    </div>
                                </Link>

                                <button
                                    onClick={() => toggleWatchlist(video)}
                                    style={{
                                        position: 'absolute',
                                        top: '10px',
                                        right: '10px',
                                        backgroundColor: 'rgba(229, 9, 20, 0.8)',
                                        color: 'white',
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backdropFilter: 'blur(4px)'
                                    }}
                                    title="Retirer de ma liste"
                                >
                                    <FaTrash size={14} />
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            ) : (
                <div style={{ textAlign: 'center', padding: '10rem 0', background: 'rgba(255,255,255,0.02)', borderRadius: '20px' }}>
                    <FaBookmark size={50} style={{ color: 'var(--glass-border)', marginBottom: '1.5rem' }} />
                    <h3>Votre liste est vide</h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Ajoutez des contenus pour les retrouver plus tard.</p>
                    <Link to="/" style={{ padding: '0.8rem 2rem', backgroundColor: 'var(--primary)', color: 'white', fontWeight: 'bold', borderRadius: '8px' }}>
                        Parcourir le catalogue
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Watchlist;
