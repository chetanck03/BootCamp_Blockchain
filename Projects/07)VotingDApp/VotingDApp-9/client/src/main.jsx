import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { Toaster } from 'react-hot-toast';
import './index.css';

createRoot(document.getElementById('root')).render(
    <>
        <Toaster
            position="top-center" // Position the toast at the top center
            toastOptions={{
                style: {
                    background: '#333', // Background color of toast
                    color: '#fff', // Text color
                    padding: '12px 20px', // Padding inside the toast
                    borderRadius: '8px', // Rounded corners for the toast
                    fontSize: '14px', // Font size
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Adding shadow for better look
                    maxWidth: '350px', // Limit max width of toast
                    width: 'auto' // Allow auto-width for toasts
                },
                success: {
                    duration: 4000, // Duration of success toasts
                },
                error: {
                    duration: 4000, // Duration of error toasts
                }
            }}
        />
        <App />
    </>
);
