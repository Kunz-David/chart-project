import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "./tailwind.generated.css"
import {WindowErrorFallback} from "./components/WindowErrorFallback.tsx"
import {ErrorBoundary} from "react-error-boundary"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={WindowErrorFallback}>
      <App/>
    </ErrorBoundary>
  </React.StrictMode>
)
