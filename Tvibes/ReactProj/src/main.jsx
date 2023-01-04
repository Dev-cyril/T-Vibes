import React from 'react'
import Page from './pages/Landing_page'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom"
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Page />,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
