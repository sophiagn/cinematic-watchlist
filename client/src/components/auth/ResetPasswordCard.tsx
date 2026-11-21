import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updatePassword } from '../../services/userService';
import { useRecoveryAccess } from '../../hooks/useRecoveryAccess';
import { isPasswordValid } from '../../utils/userUtil';

export default function ResetPasswordCard() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { isCheckingAccess, hasAccess } = useRecoveryAccess();

    async function handleResetPassword(e: React.SyntheticEvent) {
        e.preventDefault();
        setError('');

        if (!isPasswordValid(password)) {
            setError(
                'Password must be at least 8 characters with an uppercase letter, lowercase letter, digit, and special character'
            );
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);

        const data = await updatePassword(password);

        setLoading(false);

        if (!data?.user) {
            setError('This reset link is invalid or expired. Please request a new one.');
            return;
        }

        // Redirect to login after successful password reset
        navigate('/?mode=login');
    }

    if (isCheckingAccess) {
        return (
            <div className="auth-card">
                <span className="spinner dark" />
            </div>
        );
    }

    if (!hasAccess) {
        return (
            <div className="auth-card">
                <h1>Reset Password</h1>
                <div className="auth-status">
                    <p className="auth-error">This reset link is invalid or expired.</p>
                </div>
                <button
                    type="button"
                    className="btn-primary mt15"
                    onClick={() => navigate('/?mode=forgot-password')}>
                    Request new link
                </button>
            </div>
        );
    }

    return (
        <div className="auth-card">
            <h1>Reset Password</h1>
            <div className="auth-status">
                {error && <p className="auth-error">{error}</p>}
            </div>
            <form onSubmit={handleResetPassword}>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        id="confirmPassword"
                        type="password"
                        autoComplete="new-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? <span className="spinner" /> : 'Reset Password'}
                </button>
            </form>
        </div>
    );
}
