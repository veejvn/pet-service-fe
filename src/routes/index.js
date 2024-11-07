import AboutPage from "../pages/About/AboutPage";
import AdminPage from "../pages/Admin/AdminPage";
import ContactPage from "../pages/Contact/ContactPage";
import HomePage from "../pages/Home/HomePage";
import ProductsPage from "../pages/Products/ProductsPage";
import ServiceDetail from "../pages/ServiceDetail/ServicesDetail";
import ServicesPage from "../pages/Services/ServicesPage";

export const routes = [
    {
        path:'/',
        page:HomePage,
        isShowHeader:true
    },
    {
        path:'/services',
        page:ServicesPage,
        isShowHeader:true

    },
    {
        path:'/service/:id',
        page:ServiceDetail,
        isShowHeader:true

    },
    {
        path:'/contact',
        page:ContactPage,
        isShowHeader:true

    },
    {
        path:'/about',
        page:AboutPage,
        isShowHeader:true
    },
    {
        path:'/product',
        page:ProductsPage,
        isShowHeader:true
    },
    {
        path:'/admin',
        page:AdminPage,

    }
]
