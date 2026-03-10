import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import './index.css';
import { ThemeProvider } from './apps/frontend/contexts/theme-context.tsx';
import { store } from './apps/frontend/redux/store.ts';
import AppRouter from './apps/frontend/routes/app-router.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider> 
          <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
          <AppRouter/>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
