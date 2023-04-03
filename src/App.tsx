import React from 'react'
import ReactDOM from 'react-dom/client'
import Index from './Index'
import './css/reset.css'
import { IssuesListProvider } from './context/IssuesProvider'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <IssuesListProvider>
      <Index />
    </IssuesListProvider>
  </React.StrictMode>,
)
