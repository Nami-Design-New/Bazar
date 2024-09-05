import Home from "./routes/Home";
import ErrorPage from "./routes/ErrorPage";
import Login from "./routes/Login";
import Register from "./routes/Register";
import ForgetPassword from "./routes/ForgetPassword";
import EditProfile from "./routes/EditProfile";
import Activities from "./routes/Activities";
import Favorites from "./routes/Favorites";
import AdDetails from "./routes/AdDetails";
import OrderDetails from "./routes/OrderDetails";
import MarketDetails from "./routes/MarketDetails";
import Cart from "./routes/Cart";
import Checkout from "./routes/Checkout";
import Coupons from "./routes/Coupons";
import CouponDetails from "./routes/CouponDetails";

const routerConfig = [
  { path: "/", element: <Home /> },
  { path: "*", element: <ErrorPage /> },

  // user auth
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/forget-password", element: <ForgetPassword /> },
  { path: "/edit-profile", element: <EditProfile /> },

  // user features
  { path: "/cart", element: <Cart /> },
  { path: "/checkout", element: <Checkout /> },
  { path: "/my-activities", element: <Activities /> },
  { path: "/ad-details/:id", element: <AdDetails /> },
  { path: "/order-details/:id", element: <OrderDetails /> },
  { path: "/market-details/:id", element: <MarketDetails /> },
  { path: "/favorites", element: <Favorites /> },

  // general
  { path: "/coupons", element: <Coupons /> },
  { path: "/coupon-details/:id", element: <CouponDetails /> },
  { path: "/ads", element: <Home /> },
];

export default routerConfig;
