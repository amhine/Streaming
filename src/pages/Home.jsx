import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaFilter, FaSortAmountDown } from 'react-icons/fa';
import { videos } from '../data/videos';
import { categories } from '../data/categories';
import VideoCard from '../components/VideoCard';

const Home = () => {
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Tous');
    const [selectedType, setSelectedType] = useState('Tous');
    const [sortBy, setSortBy] = useState('recent');

    const filteredVideos = useMemo(() => {
        return videos
            .filter(video => {
                const matchesSearch = video.title.toLowerCase().includes(search.toLowerCase()) ||
                    video.description.toLowerCase().includes(search.toLowerCase());
                const matchesCategory = selectedCategory === 'Tous' || video.category === selectedCategory;
                const matchesType = selectedType === 'Tous' || video.type === selectedType;
                return matchesSearch && matchesCategory && matchesType;
            })
            .sort((a, b) => {
                if (sortBy === 'recent') return b.releaseYear - a.releaseYear;
                if (sortBy === 'rating') return b.rating - a.rating;
                if (sortBy === 'popular') return b.id - a.id; // Simple mock popular
                return 0;
            });
    }, [search, selectedCategory, selectedType, sortBy]);

    return (
        <div className="container" style={{ paddingTop: '90px', paddingBottom: '5rem' }}>
            {/* Search & Filters Bar */}
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1.5rem',
                marginBottom: '3rem',
                alignItems: 'center',
                padding: '1.5rem',
                borderRadius: '12px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--glass-border)'
            }}>
                {/* Search Input */}
                <div style={{ position: 'relative', flex: '1', minWidth: '250px' }}>
                    <FaSearch style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                        type="text"
                        placeholder="Rechercher un film, une série..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.8rem 0.8rem 0.8rem 45px',
                            borderRadius: '30px',
                            border: '1px solid var(--glass-border)',
                            backgroundColor: 'rgba(10,10,10,0.5)',
                            color: 'white',
                            fontSize: '1rem'
                        }}
                    />
                </div>

                {/* Filters */}
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        style={{ padding: '0.6rem 1rem', borderRadius: '8px', background: 'var(--surface)', color: 'white', border: '1px solid var(--glass-border)' }}
                    >
                        <option value="Tous">Tous les types</option>
                        <option value="FILM">Films</option>
                        <option value="SERIE">Séries</option>
                        <option value="DOCUMENTAIRE">Documentaires</option>
                    </select>

                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        style={{ padding: '0.6rem 1rem', borderRadius: '8px', background: 'var(--surface)', color: 'white', border: '1px solid var(--glass-border)' }}
                    >
                        <option value="Tous">Toutes les catégories</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.name}>{cat.name}</option>
                        ))}
                    </select>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <FaSortAmountDown style={{ color: 'var(--text-muted)' }} />
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            style={{ padding: '0.6rem 1rem', borderRadius: '8px', background: 'var(--surface)', color: 'white', border: '1px solid var(--glass-border)' }}
                        >
                            <option value="recent">Plus récents</option>
                            <option value="rating">Mieux notés</option>
                            <option value="popular">Populaires</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Hero Header */}
            <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
                    {search ? `Résultats pour "${search}"` : selectedCategory !== 'Tous' ? `${selectedCategory}` : 'Découvrir'}
                </h2>
            </div>

            {/* Video Grid */}
            {filteredVideos.length > 0 ? (
                <motion.div
                    layout
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '2rem'
                    }}
                >
                    <AnimatePresence>
                        {filteredVideos.map(video => (
                            <VideoCard key={video.id} video={video} />
                        ))}
                    </AnimatePresence>
                </motion.div>
            ) : (
                <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--text-muted)' }}>
                    <h3>Aucun contenu trouvé</h3>
                    <p>Essayez une autre recherche ou filtre.</p>
                </div>
            )}
        </div>
    );
};

export default Home;
