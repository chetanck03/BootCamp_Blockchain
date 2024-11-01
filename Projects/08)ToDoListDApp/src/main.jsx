import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <>
    <App />
    {/* Global Toaster component to set the default position and style */}
    <Toaster
      position="top-center" // Set desired position here
      toastOptions={{
        style: {
          background: '#333',
          color: '#fff',
          fontSize: '16px',
          padding: '15px',
          borderRadius: '8px'
        },
        duration: 4000, // Customize duration if needed
      }}
    />
  </>
);
