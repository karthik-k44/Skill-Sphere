import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import LandingPage from './apps/frontend/landing-page/landing.tsx'
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <LandingPage/>
    </BrowserRouter>
  </StrictMode>,
)
