import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'

import { Login } from './pages/auth/login/Login';
import { Register } from './pages/auth/register/Register';
import { Home } from './pages/home/Home';
import { Layout } from './pages/layout/Layout';
import 'material-icons/iconfont/material-icons.css';
import { Courses } from './pages/courses/Courses';
import { Users } from './pages/users/Users';
import { Students } from './pages/students/Students';


const router = createBrowserRouter([
  {
    path:'/',
    element: <Login/>
  },
  {
    path:'/register',
    element: <Register/>
  },
  {
    element: <Layout/>,
    children: [
      {
        path: '/home',
        element: <Home></Home>
      },
      {
        path: '/cursos',
        element: <Courses></Courses>
      },
      {
        path: '/usuarios',
        element: <Users></Users>
      },
      {
        path: '/alumnos',
        element: <Students></Students>
      },
    ]
  },
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
