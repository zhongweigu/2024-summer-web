import Layout from "../pages/Layout/index.jsx";
import Login from "../pages/Login/index.jsx";

import {createBrowserRouter} from "react-router-dom";
import RegisterPage from "../pages/Register/index.jsx";

const router = createBrowserRouter([
    {
        path: "/home" ,
        element: <Layout />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
      path: "/register",
      element: <RegisterPage />
    }
])

export default router;