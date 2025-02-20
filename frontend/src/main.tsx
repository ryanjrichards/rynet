import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Navbar from './components/Navbar';
import Main from './components/Content';
import Standings from './components/Standings';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Navbar />
    <Main />
    <Standings />
  </StrictMode>,
)
