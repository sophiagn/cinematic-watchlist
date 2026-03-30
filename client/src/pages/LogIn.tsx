import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../services/userService';
import '../styles/auth.css';

export default function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogIn(e: React.SyntheticEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const data = await signIn(email, password);

    setLoading(false);

    if (!data?.session) {
      setError('Invalid email or password');
      return;
    }

    navigate('/');
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Welcome Back</h1>
        {error && <p className="auth-error">{error}</p>}
        <form onSubmit={handleLogIn}>
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
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? <span className="spinner" /> : 'Log In'}
          </button>
        </form>
        <p className="auth-link">
          <a href="/signup">Don't have an account?</a>
        </p>
      </div>
    </div>
  );
}