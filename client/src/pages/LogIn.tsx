import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../services/userService';

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
    <div>
      <h1>Log In</h1>
      <form onSubmit={handleLogIn}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Log In'}
        </button>
      </form>
      <p>
        Don't have an account? <a href="/signup">Sign Up</a>
      </p>
    </div>
  );
}