import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './components/app/App.jsx'
import {AppProvider} from "./context.jsx";
import {BrowserRouter as Router} from "react-router-dom";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <AppProvider>
          <Router>
              <App />
          </Router>
      </AppProvider>
  </StrictMode>,
)

//App contains routes (Routes, Route) so it decides which page to show
//AppProvider ./context.jsx-shares useGlobalContext() states(query,movies,loading,error)
//--wraps app in Context provider-all components inside can access shared state per context
//BrowserRouter as-imports BrowserRtr and renames it to Router-enables client-side routing:
//--lets you use URLs like /movies/tt123 and allows <Routes>, <Route>, <Link>, useParams()
//StrictMde-dev checks,warnings, helps catch bugs
//Router-Wraps the app in ReactRouter-everythng inside can use Routes, Link, useParams
//<Routes> in App decide show Home or Movie page