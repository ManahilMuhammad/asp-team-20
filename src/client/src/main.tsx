import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './components/theme/theme-provider.tsx'
import ModeToggle from './components/theme-toggle.tsx'
import { AuthProvider } from './components/auth/auth-provider.tsx'
import { TooltipProvider } from './components/ui/tooltip.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider defaultTheme="dark" storageKey="sq44fr-panel">
        <TooltipProvider>
          <App />
          <ModeToggle />
        </TooltipProvider>
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>,
)
