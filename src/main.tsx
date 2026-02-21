import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import './index.css';
import { ThemeProvider } from './apps/frontend/contexts/theme-context.tsx';
import { store } from './apps/frontend/redux/store.ts';
import AppRouter from './apps/frontend/routes/app-router.tsx';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider> 
          <AppRouter/>
          <ToastContainer position="top-center" autoClose={2000} />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
