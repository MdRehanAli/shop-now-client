import { createBrowserRouter } from "react-router";
import Home from "../Home/Home";
import RootLayout from "../../layouts/RootLayout";
import AllProducts from "../AllProducts/AllProducts";
import Register from "../Register/Register";
import MyProducts from "../MyProducts/MyProducts";
import MyBids from "../MyBids/MyBids";

const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/allproducts',
                Component: AllProducts
            },
            {
                path: '/register',
                Component: Register
            },
            {
                path: '/myProducts',
                element: <MyProducts></MyProducts>
            },
            {
                path: '/myBids',
                element: <MyBids></MyBids>
            },
        ]
    },
])

export default router;