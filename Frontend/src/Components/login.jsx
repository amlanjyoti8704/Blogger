import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../Context/appContext.jsx';

function Login() {
  const navigate = useNavigate();
  const { backendURL, setUserToken, setShowLogin, setUserData } = useContext(AppContext);

  const [state, setState] = useState('Login'); // Login | Signup
  const [username, setUsername] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // ================= LOGIN =================
      if (state === 'Login') {
        const { data } = await axios.post(
          `${backendURL}/api/user/signin`,
          { email, password }
        );

        if(data.success){
            console.log(data);
            setUserData(data.user);
            setUserToken(data.token);
            localStorage.setItem('userToken', data.token);
            setShowLogin(false);
            navigate('/');
        }
        else{
            setError(data?.message || 'Invalid Credentials');
        }
      }

      // ================= SIGNUP =================
      else{

          const formData = new FormData();
          formData.append('username', username);
          formData.append('email', email);
          formData.append('password', password);
          // MUST match multer field name
          formData.append('image', profilePic);
    
          const { data } = await axios.post(
            `${backendURL}/api/user/signup`,
            formData
          );
          
          if(data.success){
            setUserData(data.user);
            setUserToken(data.token);
            localStorage.setItem('userToken', data.token);
            setShowLogin(false);
            navigate('/');
          }
          else{
            setError(data?.message || 'Signup failed');
          }
          
        }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  // Lock background scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => (document.body.style.overflow = 'unset');
  }, []);

  // Reset form on toggle
  useEffect(() => {
    setError('');
    setUsername('');
    setEmail('');
    setPassword('');
    setProfilePic(null);
  }, [state]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-96 p-6 rounded shadow-md"
      >
        <button
          type="button"
          onClick={() => setShowLogin(false)}
          className="absolute top-4 right-4 text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-center">
          {state === 'Login' ? 'Login' : 'Sign Up'}
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-3">{error}</p>
        )}

        {state === 'Signup' && (
          <>
            <input
              type="text"
              placeholder="Username"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
              className="w-full mb-3 px-3 py-2 border rounded"
            />

            <input
              type="file"
              accept="image/*"
              required
              onChange={(e) => setProfilePic(e.target.files[0])}
              className="w-full mb-3 px-3 py-2 border rounded"
            />
          </>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 px-3 py-2 border rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-3 py-2 border rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          {loading
            ? 'Please wait...'
            : state === 'Signup'
            ? 'Create Account'
            : 'Login'}
        </button>

        <p className="text-sm text-center mt-4">
          {state === 'Signup' ? 'Already have an account?' : 'New user?'}{' '}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() =>
              setState(state === 'Login' ? 'Signup' : 'Login')
            }
          >
            {state === 'Login' ? 'Sign Up' : 'Login'}
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;