import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {Toaster} from "react-hot-toast"
import './index.css'

createRoot(document.getElementById('root')).render(
    <>
    <Toaster position='top'></Toaster>
    <App />
    </>
)