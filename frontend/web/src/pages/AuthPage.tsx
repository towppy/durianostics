import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/AuthPage.css';
import Header from '../components/Header';
import { API_URL } from '../appconf';

export default function AuthPage() {
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    if (mode === 'signup' && password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    let res, data;
    if (mode === 'signup') {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      if (photo) formData.append('image', photo);
      res = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        body: formData
      });
      data = await res.json();
    } else {
      res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password })
      });
      data = await res.json();
    }
    if (res.ok) {
      if (mode === 'login') {
        setToken(data.access_token);
        setMessage('Login successful!');
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setTimeout(() => navigate('/'), 1000);
      } else {
        setMessage('Signup successful! Please check your email to verify.');
        setMode('login');
      }
    } else {
      setMessage(data.error || data.msg || 'Something went wrong');
    }
  };

  return (
    <div className="auth-container">
      <h2>{mode === 'login' ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit} encType={mode === 'signup' ? 'multipart/form-data' : undefined}>
        {mode === 'signup' && (
          <>
            <div>
              <label>Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div>
              <label>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div>
              <label>Photo</label>
              <input type="file" accept="image/*" onChange={e => setPhoto(e.target.files?.[0] || null)} required />
            </div>
            <div>
              <label>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <div>
              <label>Confirm Password</label>
              <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
            </div>
          </>
        )}
        {mode === 'login' && (
          <>
            <div>
              <label>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div>
              <label>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
          </>
        )}
        <button type="submit">{mode === 'login' ? 'Login' : 'Sign Up'}</button>
      </form>
      <button
        className="switch-mode-btn"
        onClick={() => {
          setMode(mode === 'login' ? 'signup' : 'login');
          setMessage('');
        }}
      >
        {mode === 'login' ? 'No account? Sign Up' : 'Have an account? Login'}
      </button>
      {message && <div className="auth-message">{message}</div>}
      {token && <div className="auth-token"><b>Token:</b> {token}</div>}
    </div>
  );
}
