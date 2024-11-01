import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';

import App from './App.jsx';  // Import App
import { AuthProvider } from './AuthContext.jsx';  // Import AuthProvider
import router from './lib/router.jsx';  // Import the router

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>  {/* Wrap RouterProvider with AuthProvider */}
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);

