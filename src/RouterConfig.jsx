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
import AbsherVerification from "./routes/AbsherVerification";
import FalVerification from "./routes/FalVerification";
import CommercialVerification from "./routes/CommercialVerification";
import Checkout from "./routes/Checkout";
import OrderDetails from "./routes/OrderDetails";
import MarketDetails from "./routes/MarketDetails";
import CouponDetails from "./routes/CouponDetails";
import ForgetPassword from "./routes/ForgetPassword";
import AddAdvertisment from "./routes/AddAdvertisment";
import Ads from "./routes/Ads";
import WantedAds from "./routes/WantedAds";
import Markets from "./routes/Markets";

const routerConfig = [
  { path: "/", element: <Home /> },
  { path: "*", element: <ErrorPage /> },

  // user auth
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/forget-password", element: <ForgetPassword /> },
  { path: "/edit-profile", element: <EditProfile /> },
  { path: "/profile", element: <Profile /> },
  { path: "/profile/:id", element: <Profile /> },
  {
    path: "/absher-verification",
    element: <AbsherVerification />,
    protected: true,
  },
  { path: "/fal-verification", element: <FalVerification /> },
  {
    path: "/commercial-verification",
    element: <CommercialVerification />,
    protected: true,
  },

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
  { path: "contact", element: <Contact /> },
  { path: "/coupons", element: <Coupons /> },
  { path: "/coupon-details/:id", element: <CouponDetails /> },
  { path: "/ads", element: <Ads /> },
  { path: "/wanted-ads", element: <WantedAds /> },
  { path: "/markets", element: <Markets /> },
];

export default routerConfig;
