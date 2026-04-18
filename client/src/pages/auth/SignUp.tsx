import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../services/userService';
import { isEmailValid, isPasswordValid } from '../../utils/userUtil';
import '../../styles/auth.css';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSignUp(e: React.SyntheticEvent) {
    e.preventDefault();
    setError('');

    if (!isEmailValid(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!isPasswordValid(password)) {
      setError('Password must be at least 8 characters with an uppercase letter, lowercase letter, digit, and special character');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    const data = await signUp(email, password);

    setLoading(false);

    if (!data?.user) {
      setError('Something went wrong. Please try again.');
      return;
    }

    navigate('/');
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Create an Account</h1>
        {error && <p className="auth-error">{error}</p>}
        <form onSubmit={handleSignUp}>
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
          <div className="mt10">
            <button type="submit" disabled={loading}>
              {loading ? <span className="spinner" /> : 'Sign Up'}
            </button>
          </div>
        </form>
        <p className="fs15 mb8 pt8">
          Already have an account? <span><a href="/">Log In</a></span>
        </p>
      </div>
    </div>
  );
}