import { createBrowserRouter } from "react-router-dom";
import Register from "./views/register";
import Login from "./views/login";
import GuestLayout from "./components/guestlayout";
import DefaultLayout from "./components/defaultlayout";
import Dashboard from "./views/dashboard";

const router = createBrowserRouter([
    {
       path:'/',
       element:<GuestLayout/>,
       children:[
        {
            path:'/',
            element:<Login/>
    
        },
        {
            path:'sign-up',
            element:<Register/>
        },
       ]

    },
    {
        path:'/',
        element:<DefaultLayout/>,
        children:[
            {
                path:'dashboard',
                element:<Dashboard/>
            }
        ]
    }

])

export default router