import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './components/Login.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignUpPage.jsx'
import Room from './pages/Room.jsx'
import AuthLayout from "./components/AuthLayout.jsx"

const router = createBrowserRouter([
 {
  path: "/",
  element: <App/>,
  children: [
    {
      path:"/",
      element:<Room/>
    },
    {
      path:"/signup",
      element:(
       
          <SignupPage/>
    
      )
    },
    {
      path:"/login",
      element:(
      
        <LoginPage/>
     
        ),
    },
  ]
 }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router = {router}/>
    </Provider>
  </React.StrictMode>,
)
