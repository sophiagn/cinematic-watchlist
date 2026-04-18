
import { useNavigate } from 'react-router-dom';
import '../../styles/auth.css';

export default function ForgotPassword() {
    const navigate = useNavigate();

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
                <form>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            required
                        />
                    </div>
                    <button type="submit">
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
}