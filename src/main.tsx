import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import './index.css';
import LandingPage from './apps/frontend/pages/landing-page/index.tsx';
import { ThemeProvider } from './apps/frontend/contexts/theme-context.tsx';
import { store } from './apps/frontend/redux/store.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider> 
          <LandingPage/>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
