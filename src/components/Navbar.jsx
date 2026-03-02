import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaSearch, FaUser, FaSignOutAlt, FaBookmark, FaHome } from 'react-icons/fa';

const Navbar = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!currentUser && !['/login', '/register'].includes(location.pathname)) {
        return null; // Don't show navbar if not logged in and not on auth pages (though protected routes handle this)
    }

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav
            className={`glass`}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                height: '70px',
                display: 'flex',
                alignItems: 'center',
                padding: '0 4%',
                zIndex: 1000,
                backgroundColor: isScrolled ? 'rgba(20, 20, 20, 0.95)' : 'transparent',
                borderBottom: isScrolled ? '1px solid var(--glass-border)' : 'none',
                transition: 'background-color 0.3s ease'
            }}
        >
            <Link to="/" style={{ color: 'var(--primary)', fontSize: '1.8rem', fontWeight: 'bold', marginRight: '2rem', display: 'flex', alignItems: 'center' }}>
                STREAM<span style={{ color: 'white' }}>FLIX</span>
            </Link>

            {currentUser && (
                <>
                    <div style={{ display: 'flex', gap: '1.5rem', flexGrow: 1 }}>
                        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: location.pathname === '/' ? 1 : 0.7 }}>
                            <FaHome /> <span>Accueil</span>
                        </Link>
                        <Link to="/watchlist" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: location.pathname === '/watchlist' ? 1 : 0.7 }}>
                            <FaBookmark /> <span>Ma Liste</span>
                        </Link>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <Link to="/profile" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: location.pathname === '/profile' ? 1 : 0.7 }}>
                            <FaUser /> <span>{currentUser.username}</span>
                        </Link>
                        <button
                            onClick={handleLogout}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}
                        >
                            <FaSignOutAlt /> <span>Déconnexion</span>
                        </button>
                    </div>
                </>
            )}
        </nav>
    );
};

export default Navbar;
