import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import LandingPage from './apps/frontend/pages/landing-page/index.tsx';
import { ThemeProvider } from './apps/frontend/contexts/theme-context.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider> 
        <LandingPage/>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
