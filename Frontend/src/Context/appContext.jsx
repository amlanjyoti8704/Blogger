import { useEffect, useState, createContext } from 'react';
import axios from 'axios';

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {

    const backendURL = import.meta.env.VITE_BACKEND_URL;

    const [showLogin, setShowLogin] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [userData, setUserData] = useState(null);
    
    // fetch logged-in user data
    // const fetchUserData = async () => {
    //     if (!userToken) return;

    //     try {
    //         const { data } = await axios.get(`${backendURL}/api/user/getusers`, {headers: { token: userToken }});
    //         setUserData(data);
    //     } catch (error) {
    //         console.error(error);
    //         logout();
    //     }
    // };

    // logout user
    // const logout = async () => {
    //     try {
    //         await axios.post(`${backendURL}/api/auth/signout`);
    //     } catch (error) {
    //         console.error(error);
    //     }

    //     localStorage.removeItem('token');
    //     setUserToken(null);
    //     setUserData(null);
    // };

    // whenever token changes → refetch user
    // useEffect(() => {
    //     fetchUserData();
    // }, [userToken]);

    const value = {
        backendURL,
        userData,
        setUserData,
        showLogin,
        setShowLogin,
        userToken,
        setUserToken,
        // fetchUserData,
        // logout
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};