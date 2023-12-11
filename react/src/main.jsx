import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import router from './router'
import { RouterProvider } from 'react-router-dom'
import { ContextProvider } from './contexts/ContextProvider'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
    <RouterProvider router={router}/>
    </ContextProvider>
  </React.StrictMode>,
)
