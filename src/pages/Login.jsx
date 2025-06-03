import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { useAuth } from '../context/AuthContext';
import styles from './login.module.css';

export default function Login() {
  const { login: saveToken } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isLogin ? '/auth/login' : '/auth/register';
      const body = isLogin ? { email, password } : { name, email, password };
      const res = await axios.post(url, body);
      if(isLogin){
        saveToken(res.data.token);
        navigate('/dashboard');
      }
      else{
        alert('Registration successful. Please login.');
        setIsLogin(true);
        setName('');
        setPassword('');
      }
    } 
    catch (error) {
      console.error(`${isLogin ? 'Login' : 'Register'} error:`, error.response?.data?.message || error.message);
      alert(`${isLogin ? 'Login' : 'Register'} failed`);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>{isLogin ? 'Login' : 'Register'}</h2>
        {!isLogin && (
          <input
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
        )}
        <input
          className={styles.input}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          className={styles.input}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button className={styles.button} type="submit">{isLogin ? 'Login' : 'Register'}</button>
        <p className={styles.toggleText}>
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <span onClick={() => setIsLogin(!isLogin)} className={styles.toggleLink}>{isLogin ? 'Register' : 'Login'}</span>
        </p>
      </form>
    </div>
  );
}