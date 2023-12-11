import { Navigate, createBrowserRouter } from "react-router-dom";
import Register from "./views/register";
import Login from "./views/login";
import GuestLayout from "./components/guestlayout";
import DefaultLayout from "./components/defaultlayout";
import Dashboard from "./views/dashboard";
import Users from "./views/user";
import UserForm from "./views/userform";

const router = createBrowserRouter([
    {
        path:'/',
        element:<DefaultLayout/>,
        children:[
            {
                path:'/',
                element:< Navigate to='/dashboard'/>
            },
            {
                path:'/dashboard',
                element:<Dashboard/>
            },
            {
                path:'/users',
                element:<Users/>
            },
            {
                path: '/users/new',
                element: <UserForm key="userCreate" />
            },
            {
                path: '/users/:id',
                element: <UserForm key="userUpdate" />
            }
        ]
    },
    {
       path:'/',
       element:<GuestLayout/>,
       children:[
        {
            path:'/',
            element:< Navigate to='/login'/>
        },
        {
            path:'/login',
            element:<Login/>
    
        },
        {
            path:'sign-up',
            element:<Register/>
        },
       ]

    }
    

])

export default router