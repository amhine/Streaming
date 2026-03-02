import React, { useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPlay, FaPlus, FaCheck, FaStar, FaArrowLeft, FaHistory } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { videos } from '../data/videos';
import VideoCard from '../components/VideoCard';

const VideoDetails = () => {
    const { id } = useParams();
    const { watchlist, toggleWatchlist, addToHistory } = useAuth();

    const video = useMemo(() => videos.find(v => v.id === parseInt(id)), [id]);
    const isInWatchlist = watchlist.some(v => v.id === video?.id);

    const similarVideos = useMemo(() => {
        if (!video) return [];
        return videos
            .filter(v => v.id !== video.id && (v.category === video.category || v.type === video.type))
            .slice(0, 4);
    }, [video]);

    useEffect(() => {
        if (video) {
            // Add to history when viewing details
            addToHistory(video, 0, false);
            window.scrollTo(0, 0);
        }
    }, [video, addToHistory]);

    if (!video) return <div className="container">Vidéo non trouvée</div>;

    return (
        <div className="container" style={{ paddingTop: '90px', paddingBottom: '5rem' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--text-muted)' }}>
                <FaArrowLeft /> Retour à l'accueil
            </Link>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '3rem', alignItems: 'start' }}>
                {/* Left Column: Player & Meta */}
                <div>
                    {/* YouTube Embed */}
                    <div style={{
                        position: 'relative',
                        paddingBottom: '56.25%',
                        height: 0,
                        overflow: 'hidden',
                        borderRadius: '16px',
                        backgroundColor: 'black',
                        marginBottom: '2rem',
                        boxShadow: 'var(--shadow)'
                    }}>
                        <iframe
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                            src={`${video.trailerUrl}?autoplay=0&rel=0&modestbranding=1`}
                            title={video.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                        <div>
                            <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{video.title}</h1>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', color: 'var(--text-muted)' }}>
                                <span style={{ color: '#46d369', fontWeight: 'bold' }}>{video.rating} ⭐</span>
                                <span>{video.releaseYear}</span>
                                <span>{video.duration}</span>
                                <span style={{ border: '1px solid var(--text-muted)', padding: '0 8px', borderRadius: '4px', fontSize: '0.8rem' }}>{video.type}</span>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button
                                onClick={() => toggleWatchlist(video)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    padding: '0.8rem 1.5rem',
                                    borderRadius: '8px',
                                    backgroundColor: isInWatchlist ? 'white' : 'var(--primary)',
                                    color: isInWatchlist ? 'black' : 'white',
                                    fontWeight: 'bold'
                                }}
                            >
                                {isInWatchlist ? <><FaCheck /> Dans ma liste</> : <><FaPlus /> Ma Liste</>}
                            </button>
                        </div>
                    </div>

                    <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'rgba(255,255,255,0.8)', marginBottom: '2rem' }}>
                        {video.description}
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                        <div>
                            <h4 style={{ color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Réalisateur</h4>
                            <p>{video.director}</p>
                        </div>
                        <div>
                            <h4 style={{ color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Distribution</h4>
                            <p>{video.cast.join(', ')}</p>
                        </div>
                    </div>
                </div>

                {/* Right Column: Similar Content */}
                <div>
                    <h3 style={{ marginBottom: '1.5rem', borderBottom: '2px solid var(--primary)', display: 'inline-block', paddingBottom: '0.5rem' }}>
                        Contenus similaires
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {similarVideos.map(v => (
                            <VideoCard key={v.id} video={v} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoDetails;
