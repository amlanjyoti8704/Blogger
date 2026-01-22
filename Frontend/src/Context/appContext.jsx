import { useEffect, useState, createContext } from 'react';
import axios from 'axios';

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {

    const backendURL = import.meta.env.VITE_BACKEND_URL;

    const [showLogin, setShowLogin] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [userData, setUserData] = useState(null);
    const [posts, setPosts] = useState([]);
    const [currentPost, setCurrentPost] = useState(null);
    
    // fetch logged-in user data
    const fetchUserData = async () => {
        if (!userToken) return;

        try {
            const { data } = await axios.get(`${backendURL}/api/user/me`, {headers: { token: userToken }});
            setUserData(data);
        } catch (error) {
            console.error(error);
            logout();
        }
    };

    // logout user
    const logout = async () => {
        try {
            await axios.post(`${backendURL}/api/user/signout`);
        } catch (error) {
            console.error(error);
        }
        localStorage.removeItem('userToken');
        setUserToken(null);
        setUserData(null);
    };

    // fetch posts
    const fetchPosts = async () => {
        try {
            const { data } = await axios.get(`${backendURL}/api/post/getposts`);
            setPosts(data.posts);
            console.log("Posts data:", data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    }

    // fetch a single post
    const fetchSinglePost=async(slug)=>{
        try{
            const { data } = await axios.get(`${backendURL}/api/post/getpost/${slug}`);
            setCurrentPost(data);
            console.log("Single Post data:", data);
        }
        catch(error){
            console.error("Error fetching single post:", error);
        }
    }

    // whenever token changes → refetch user
    useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
        setUserToken(token);
    }
    }, []);

    useEffect(() => {
        if(userToken){
            fetchUserData();
        }
    }, [userToken]);

    const value = {
        backendURL,
        userData,
        setUserData,
        showLogin,
        setShowLogin,
        userToken,
        setUserToken,
        logout,
        posts,
        setPosts,
        fetchPosts,
        currentPost,
        setCurrentPost,
        fetchSinglePost,
        fetchUserData,
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};