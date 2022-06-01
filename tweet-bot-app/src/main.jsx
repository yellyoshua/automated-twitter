import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './Router'
import TweetsProvider from './providers/TweetsProvider'
import AuthenticationProvider from './providers/AuthenticationProvider'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthenticationProvider>
      <TweetsProvider>
        <Router />
      </TweetsProvider>
    </AuthenticationProvider>
  </React.StrictMode>
)
