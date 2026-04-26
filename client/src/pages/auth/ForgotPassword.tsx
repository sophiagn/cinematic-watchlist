import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendPasswordResetLink } from '../../services/userService';
import '../../styles/auth.css';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleForgotPassword(e: React.SyntheticEvent) {
        e.preventDefault();
        setError('');
        setLoading(true);

        const data = await sendPasswordResetLink(email);

        setLoading(false);

        if (!data) {
            setError('Failed to send password reset link. Please try again.');
            return;
        }
        setSuccess('Password reset link sent successfully! Please check your email.');
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="back-button">
                    <button type="button" onClick={() => navigate('/')}>
                        <svg width="20" height="20" viewBox="0 0 28 23" 
                                fill="none" stroke="currentColor" strokeWidth="4" 
                                strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="15 18 9 12 15 6" />
                        </svg>
                        Back to login
                    </button>
                </div>
                <h1>Forgot Password</h1>
                <div className="auth-status">
                    {error && <p className="auth-error">{error}</p>}
                    {success && <p className="auth-success">{success}</p>}
                </div>
                <form onSubmit={handleForgotPassword}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? <span className="spinner light" /> : 'Send reset link'}
                    </button>
                </form>
            </div>
        </div>
    );
}