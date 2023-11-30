import { createBrowserRouter } from "react-router-dom";
import Register from "./views/register";
import Login from "./views/login";

const router = createBrowserRouter([
    {
        path:'/login',
        element:<Login/>

    },
    {
        path:'/sign-up',
        element:<Register/>
    }
])

export default router