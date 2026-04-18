import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../../services/userService';
import '../../styles/auth.css';

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
          <div className="space-btwn-row mt-10 mb-10">
            <p>PLACEHOLDER</p>
            <p className="fs15">
              <a href="/forgot-password">Forgot password</a>
            </p>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? <span className="spinner" /> : 'Log In'}
          </button>
        </form>
        <p className="fs15 mb8 pt8">
          Don't have an account? <span><a href="/signup">Sign up</a></span>
        </p>
      </div>
    </div>
  );
}