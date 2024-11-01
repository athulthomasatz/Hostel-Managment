import { createContext, useContext, useState, useEffect } from 'react';

// Create AuthContext
const AuthContext = createContext();

// AuthProvider component that wraps your app and makes `user` available globally
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);


  // Check for token in localStorage on app load
  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    const username = localStorage.getItem('username'); // Optional if you want to store username

    if (token) {
      setUser({ name: username, token });  // Set user state with token and username
    }
  }, []); // Empty dependency array ensures this effect runs only once when the app loads
  // Login function that sets the user state
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('token', userData.token);
    localStorage.setItem('username', userData.name);  // Optionally store username

  };

  // Logout function that clears the user state
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token'); // Remove the token from localStorage
    localStorage.removeItem('username');  // Optionally remove username


  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the AuthContext and access the user and login/logout functions
export const useAuth = () => useContext(AuthContext);
