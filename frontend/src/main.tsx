import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './index.css'
import App from './App.tsx'
import Login from "./pages/Login.tsx"
import Register from "./pages/Register.tsx"
import Me from "./pages/Me.tsx"
import NewNote from './pages/NewNote.tsx'
import EditNote from './pages/EditNotes.tsx';
import UserSettings from './pages/UserSettings.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/me" element={<Me />} />
                <Route path="/new-note" element={<NewNote />} />
                <Route path="/edit-note/:id" element={<EditNote />} />
                <Route path="/settings/:id" element={<UserSettings />} />
            </Routes>
        </BrowserRouter>

        <ToastContainer theme="colored" closeOnClick limit={1} />
    </StrictMode>,
);
