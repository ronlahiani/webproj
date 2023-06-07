import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsPending(true);

    try {
      const response = await fetch(`/api/users?email=${email}&password=${password}`);
      if (!response.ok) {
        throw new Error('Could not fetch the data for that resource!');
      }

      const data = await response.json();
      setUser(data);
      setIsPending(false);
      setError(null);
    } catch (error) {
      setIsPending(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      // Handle successful login
      console.log('Login successful');
      navigate('/home');
    }
  }, [user, navigate]);

  return (
    <div className="login-container">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {!isPending && !error && !user && (
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          {error && <div className="error-label">{error}</div>}
          <button id="login" type="submit">Login</button>
        </form>
      )}
    </div>
  );
};

export default Login;
