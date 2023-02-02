import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { TransactionsProvider } from './context/TransactionsProvider'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <TransactionsProvider>
      <App />
    </TransactionsProvider>
  </React.StrictMode>,
)
