import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserAndMovies = async () => {
            try {
                // Authenticate user via HTTP-only cookie
                const userRes = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/me`, {
                    withCredentials: true
                });
                setUser(userRes.data);

                // Fetch protected movie data
                const movieRes = await axios.get(`${process.env.REACT_APP_API_URL}/api/movies/trending`, {
                    withCredentials: true
                });
                setMovies(movieRes.data.results);
            } catch (err) {
                setError('Authentication failed. Please log in.');
                navigate('/login');
            }
        };

        fetchUserAndMovies();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/logout`, {}, {
                withCredentials: true
            });
            navigate('/login');
        } catch (err) {
            console.error('Logout failed');
        }
    };

    if (!user && !error) return <div>Loading...</div>;

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1 style={{ color: '#e50914' }}>KodFlix Dashboard</h1>
                <div>
                    <span style={{ marginRight: '15px' }}>Welcome, {user?.username}</span>
                    <button onClick={handleLogout} style={{ padding: '5px 15px', cursor: 'pointer' }}>Logout</button>
                </div>
            </header>

            {error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : (
                <div>
                    <h2>Trending Weekly</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                        {movies && movies.map(movie => (
                            <div key={movie.id} style={{ width: '200px', backgroundColor: '#f4f4f4', padding: '10px', borderRadius: '8px' }}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                    alt={movie.title}
                                    style={{ width: '100%', borderRadius: '4px' }}
                                />
                                <h3 style={{ fontSize: '16px', margin: '10px 0 5px' }}>{movie.title || movie.name}</h3>
                                <p style={{ fontSize: '12px', color: '#666' }}>Rating: {movie.vote_average}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
