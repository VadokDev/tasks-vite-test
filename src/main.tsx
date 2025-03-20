import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <div className="space-y-6">
        <App />
      </div>
    </main>
  </StrictMode>,
)
