import React, { useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../Context/appContext.jsx'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function Login() {
    const navigate = useNavigate();
    const { backendURL, setUserToken, setShowLogin } = useContext(AppContext);

    const [username, setUsername] = useState('');
    const [profilePic, setProfilePic] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [state, setState] = useState('Login'); // 'Login' or 'Signup'
    // const [isSignup, setIsSignup] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if(state==='Login'){
                const {data}=await axios.post(`${backendURL}/api/user/signin`,{
                    email,
                    password
                });
                if(!data.success){
                    setError(data.message);
                    return;
                }
                // login
                localStorage.setItem('token', data.token);
                setUserToken(data.token);
                setShowLogin(false);
                navigate('/');
                return;
            }
            else{
                // signup
                const formData = new FormData();
                formData.append('username', username);
                formData.append('email', email);
                formData.append('password', password);
                formData.append('profilePic', profilePic);

                const {data}=await axios.post(`${backendURL}/api/user/signup`,formData,{
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                if(!data.success){
                    setError(data.message);
                    return;
                }
                setUserToken(data.token);
                localStorage.setItem('token', data.token);
                setShowLogin(false);
                navigate('/');
                return;

            }
            // const { data } = await axios.post(endpoint, {
            //     email,
            //     password
            // });

            // if (!data.success) {
            //     setError(data.message);
            //     return;
            // }

            // login after signup OR normal login
            // localStorage.setItem('token', data.token);
            // setUserToken(data.token);
            // setShowLogin(false);
            // navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        document.body.style.overflow='hidden';
        return ()=>{
            document.body.style.overflow='unset';
        }
    }, []);

    useEffect(() => {
        setError('');
        setEmail('');
        setPassword('');
        setUsername('');
        setProfilePic(null);
    }, [state]);

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">   
                    
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded shadow-md w-96"
            >
                <button
                    type="button"
                    onClick={() => setShowLogin(false)}
                    className="text-black relative left-80 bottom-2 z-60  text-xl"
                    >
                    ✕
                </button>
                <h2 className="text-2xl font-semibold mb-4 text-center">
                    {state=="Login" ? 'Login' : 'Sign Up'}
                </h2>

                {error && (
                    <p className="text-red-500 text-sm mb-3 text-center">
                        {error}
                    </p>
                )}

                {state === 'Signup' && (
                    <>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full mb-3 px-3 py-2 border rounded"
                            required
                        />

                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setProfilePic(e.target.files[0])}
                            className="w-full mb-3 px-3 py-2 border rounded"
                            required
                        />
                    </>
                )}

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mb-3 px-3 py-2 border rounded"
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mb-4 px-3 py-2 border rounded"
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
                >
                    {loading
                        ? 'Please wait...'
                        : state=="Signup"
                        ? 'Create Account'
                        : 'Login'}
                </button>

                <p className="text-sm text-center mt-4">
                    {state=='Signup' ? 'Already have an account?' : 'New user?'}{' '}
                    <span
                        className="text-blue-600 cursor-pointer"
                        onClick={() => setState(state=='Login' ? 'Signup' : 'Login')}
                    >
                        {state=='Login' ? 'Sign Up' : 'Login'}
                    </span>
                </p>
                
            </form>
        </div>
    );
}

export default Login;