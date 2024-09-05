import Home from "./routes/Home";
import ErrorPage from "./routes/ErrorPage";
import Cart from "./routes/Cart";
import Login from "./routes/Login";
import Register from "./routes/Register";
import EditProfile from "./routes/EditProfile";
import Activities from "./routes/Activities";
import Favorites from "./routes/Favorites";
import AdDetails from "./routes/AdDetails";
import Coupons from "./routes/Coupons";
import Contact from "./routes/Contact";
import Profile from "./routes/Profile";
import Checkout from "./routes/Checkout";
import OrderDetails from "./routes/OrderDetails";
import MarketDetails from "./routes/MarketDetails";
import CouponDetails from "./routes/CouponDetails";
import ForgetPassword from "./routes/ForgetPassword";
import AddAdvertisment from "./routes/AddAdvertisment";

const routerConfig = [
  { path: "/", element: <Home /> },
  { path: "*", element: <ErrorPage /> },
  { path: "contact", element: <Contact /> },

  // user auth
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/forget-password", element: <ForgetPassword /> },
  { path: "/edit-profile", element: <EditProfile /> },
  { path: "/profile", element: <Profile /> },

  // user features
  { path: "/cart", element: <Cart /> },
  { path: "/checkout", element: <Checkout /> },
  { path: "/my-activities", element: <Activities /> },
  { path: "/ad-details/:id", element: <AdDetails /> },
  { path: "/order-details/:id", element: <OrderDetails /> },
  { path: "/market-details/:id", element: <MarketDetails /> },
  { path: "/favorites", element: <Favorites /> },
  { path: "/add-ad", element: <AddAdvertisment /> },

  // general
  { path: "/coupons", element: <Coupons /> },
  { path: "/coupon-details/:id", element: <CouponDetails /> },
  { path: "/ads", element: <Home /> }
];

export default routerConfig;
