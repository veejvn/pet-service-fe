import AdminServiceComponent from "../component/Admin/AdminServiceComponent";
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

export const routes = [
    {
        path:'/',
        page:HomePage,
        layout: DefaultComponent
    },
    {
        path:'/services',
        page:ServicesPage,
        layout: DefaultComponent

    },
    {
        path:'/service/:id',
        page:ServiceDetail,
        layout: DefaultComponent

    },
    {
        path:'/contact',
        page:ContactPage,
        layout: DefaultComponent

    },
    {
        path:'/about',
        page:AboutPage,
        layout: DefaultComponent
    },
    {
        path:'/product',
        page:ProductsPage,
        layout: DefaultComponent
    },
    {
        path:'/admin',
        page:AdminPage,

    },
    {
        path:'/login',
        page:Login,
        layout: AuthLayout
    }
]

