import AdminServiceComponent from "../component/Admin/AdminServiceComponent";
import AboutPage from "../pages/About/AboutPage";
import ContactPage from "../pages/Contact/ContactPage";
import HomePage from '../pages/Home/HomePage';
import ProductsPage from "../pages/Products/ProductsPage";
import ServiceDetail from "../pages/ServiceDetail/ServicesDetail";
import ServicesPage from "../pages/Services/ServicesPage";
import Login from "../pages/Auth/Login";
import CartPage from "../pages/Cart/CartPage";
import DefaultComponent from '../component/Layout/Default/DefaultComponent';
import AuthLayout from "../component/Layout/AuthLayout";
import Logout from "../pages/auth/Logout";
import { Fragment } from "react";
import Register from "../pages/auth/Register";
import ReceiveTokens from "../pages/auth/ReceiveTokens";
import ForgotPassword from "../pages/auth/ForgotPassword";
import MyRecieptPage from "../pages/Reciept/MyRecieptPage";

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
        path:'/register',
        Page:Register,
        Layout: AuthLayout
    },
    {
        path:'/login',
        Page:Login,
        Layout: AuthLayout
    },
    {
        path:'/forgot-password',
        Page:ForgotPassword,
        Layout: AuthLayout
    },
    {
        path:'/auth/receive-tokens',
        Page:ReceiveTokens,
        Layout: Fragment
    },
    {
        path:'/logout',
        Page:Logout,
        Layout: Fragment
    },
    {
        path:'/cart',
        page:CartPage,
        layout: DefaultComponent
    },
    {
        path:'/myReciept/:id',
        page:MyRecieptPage,
        layout: DefaultComponent
    }

]

