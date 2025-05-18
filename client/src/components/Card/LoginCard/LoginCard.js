import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginCard.css';

const LoginCard = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleLogin = (e) => {
        e.preventDefault();
        // Check for admin credentials
        if (credentials.email === 'santhosh' && credentials.password === 'sarvika') {
            navigate('/admin/dashboard');
        } else {
            setError('Invalid credentials');
        }
    };

    return ( 
        <div className="login__card">
            <div className="login__inputs">
                {error && <div className="error-message">{error}</div>}
                <div className="email__input__container input__container">
                    <label className="email__label input__label">Username</label>
                    <input 
                        type="text" 
                        name="email"
                        className="email__input login__input" 
                        placeholder='Enter your username'
                        value={credentials.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="password__input__container input__container">
                    <label className="password__label input__label">Password</label>
                    <input 
                        type="password" 
                        name="password"
                        className="password__input login__input" 
                        placeholder='Enter your password'
                        value={credentials.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="login__button__container">
                    <button className="login__button" onClick={handleLogin}>
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}
 
export default LoginCard;
