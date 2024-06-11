import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './store/auth.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
  <React.StrictMode>
    <App />
    <ToastContainer />
  </React.StrictMode>
  </AuthProvider>

)
