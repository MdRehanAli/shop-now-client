import { createBrowserRouter } from "react-router";
import Home from "../Home/Home";
import RootLayout from "../../layouts/RootLayout";
import AllProducts from "../AllProducts/AllProducts";
import Register from "../Register/Register";
import MyProducts from "../MyProducts/MyProducts";
import MyBids from "../MyBids/MyBids";
import PrivateRoute from "./PrivateRoute";
import ProductDetails from "../ProductDetails/ProductDetails";

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
                element: <PrivateRoute><MyProducts></MyProducts></PrivateRoute>
            },
            {
                path: '/myBids',
                element: <PrivateRoute><MyBids></MyBids></PrivateRoute>
            },
            {
                path: 'productDetails/:id',
                loader: ({ params }) => fetch(`http://localhost:5000/products/${params.id}`),
                Component: ProductDetails
            }
        ]
    },
])

export default router;