import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./ui/Home";
import Menu from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import Order from "./features/order/Order";
import CreateOrder from "./features/order/CreateOrder";
import AppLayout from "./ui/AppLayout";
import CartOverview from "./features/cart/CartOverview";
import Error from "./ui/Error";
import ProtectedRoute from "./ui/ProtectedRoute";

// ** loaders

import { loader as menuLoader } from "./features/menu/Menu";
import { loader as orderLoader } from "./features/order/Order";

// ** actions

import { action as orderAction } from "./features/order/CreateOrder";

// *! reactRouter

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/menu",
            element: <Menu />,
            errorElement: <Error />,
            loader: menuLoader,
          },
          {
            path: "/cart",
            element: <Cart />,
          },
          {
            path: "/cartOverwiev",
            element: <CartOverview />,
          },
          {
            path: "/order/:orderId",
            element: <Order />,
            loader: orderLoader,
            errorElement: <Error />,
          },
          {
            path: "/order/new",
            element: <CreateOrder />,
            action: orderAction,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
