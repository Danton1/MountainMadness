if (
  !new (class {
    x
    // eslint-disable-next-line no-prototype-builtins
  })().hasOwnProperty('x')
)
  throw new Error('Transpiler is not configured correctly')

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
