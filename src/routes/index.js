import AboutPage from "../pages/About/AboutPage";
import AdminPage from "../pages/Admin/AdminPage";
import ContactPage from "../pages/Contact/ContactPage";
import HomePage from "../pages/Home/HomePage";
import ProductsPage from "../pages/Products/ProductsPage";
import ServiceDetail from "../pages/ServiceDetail/ServicesDetail";
import ServicesPage from "../pages/Services/ServicesPage";
import Login from "../pages/Auth/Login";

import DefaultComponent from '../component/Layout/Default/DefaultComponent';
import AuthLayout from "../component/Layout/AuthLayout";
import Logout from "../pages/auth/Logout";
import { Fragment } from "react";

export const routes = [
    {
        path:'/',
        Page:HomePage,
        Layout: DefaultComponent
    },
    {
        path:'/services',
        Page:ServicesPage,
        Layout: DefaultComponent

    },
    {
        path:'/service/:id',
        Page:ServiceDetail,
        Layout: DefaultComponent

    },
    {
        path:'/contact',
        Page:ContactPage,
        Layout: DefaultComponent

    },
    {
        path:'/about',
        Page:AboutPage,
        Layout: DefaultComponent
    },
    {
        path:'/product',
        Page:ProductsPage,
        Layout: DefaultComponent
    },
    {
        path:'/login',
        Page:Login,
        Layout: AuthLayout
    },
    {
        path:'/logout',
        Page:Logout,
        Layout: Fragment
    }
]
