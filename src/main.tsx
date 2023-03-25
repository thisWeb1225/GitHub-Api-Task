import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './css/reset.css'
import { IssuesListProvider } from './context/IssuesProvider'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <IssuesListProvider>
      <App />
    </IssuesListProvider>
  </React.StrictMode>,
)
