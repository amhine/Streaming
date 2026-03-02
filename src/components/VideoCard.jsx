import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPlay, FaPlus, FaCheck, FaStar } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const VideoCard = ({ video }) => {
    const { watchlist, toggleWatchlist } = useAuth();
    const isInWatchlist = watchlist.some(v => v.id === video.id);

    return (
        <motion.div
            whileHover={{ scale: 1.05, zIndex: 10 }}
            layout
            style={{
                position: 'relative',
                borderRadius: 'var(--radius)',
                overflow: 'hidden',
                backgroundColor: 'var(--surface)',
                boxShadow: 'var(--shadow)',
                aspectRatio: '16/9',
                cursor: 'pointer'
            }}
        >
            <Link to={`/video/${video.id}`}>
                <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />

                {/* Hover Overlay */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 60%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '1rem',
                    opacity: 1, // Visible enough on hover
                }}>
                    <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{video.title}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '0.8rem' }}>
                        <span style={{ color: '#46d369', fontWeight: 'bold' }}>{video.rating} <FaStar style={{ fontSize: '0.7rem' }} /></span>
                        <span style={{ border: '1px solid var(--text-muted)', padding: '0 4px', fontSize: '0.7rem' }}>{video.type}</span>
                        <span>{video.releaseYear}</span>
                    </div>
                </div>
            </Link>

            {/* Quick Action Buttons */}
            <button
                onClick={(e) => {
                    e.preventDefault();
                    toggleWatchlist(video);
                }}
                style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    color: 'white',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backdropFilter: 'blur(4px)',
                    border: '1px solid var(--glass-border)'
                }}
            >
                {isInWatchlist ? <FaCheck style={{ color: '#46d369' }} /> : <FaPlus />}
            </button>
        </motion.div>
    );
};

export default VideoCard;
