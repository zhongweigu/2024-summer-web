import Layout from "../pages/Layout/index.jsx";
import Login from "../pages/Login/index.jsx";

import {createBrowserRouter} from "react-router-dom";
import RegisterPage from "../pages/Register/index.jsx";
import HomePage from "../pages/HomePage/index.jsx";
import Release from "../pages/Release/index.jsx";

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
    },
    {
        path: "/",
        element: <HomePage />
    },
    {
        path: "/release",
        element: <Release/>
    }
])

export default router;