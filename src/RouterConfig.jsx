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
import AppVerification from "./routes/AppVerification";
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
import Videos from "./routes/Videos";
import Chats from "./routes/Chats";
import ManageAccounts from "./routes/ManageAccounts";
import Faq from "./routes/Faq";
import About from "./routes/About";
import TermsOfUse from "./routes/TermsOfUse";
import Privacy from "./routes/Privacy";
import AddInterest from "./ui/modals/AddInterest";
import Notifcations from "./routes/Notifcations";
import ProductDetails from "./routes/ProductDetails";

const routerConfig = [
  { path: "/", element: <Home /> },
  { path: "*", element: <ErrorPage /> },
  { path: "/about-us", element: <About /> },
  { path: "/terms-of-use", element: <TermsOfUse /> },
  { path: "/privacy-Policy", element: <Privacy /> },
  { path: "/faq", element: <Faq /> },
  { path: "/contact", element: <Contact /> },
  { path: "/videos", element: <Videos /> },
  { path: "/markets", element: <Markets /> },
  { path: "/coupons", element: <Coupons /> },
  { path: "/coupon-details/:id", element: <CouponDetails /> },
  { path: "/ads", element: <Ads /> },
  { path: "/wanted-ads", element: <WantedAds /> },

  // user auth
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/forget-password", element: <ForgetPassword /> },
  { path: "/edit-profile", element: <EditProfile /> },

  // verification
  {
    path: "/app-verification",
    element: <AppVerification />,
    protected: true,
  },
  { path: "/fal-verification", element: <FalVerification /> },
  {
    path: "/commercial-verification",
    element: <CommercialVerification />,
    protected: true,
  },

  // user features
  { path: "/profile", element: <Profile /> },
  { path: "/profile/:id", element: <Profile /> },
  { path: "/notifications", element: <Notifcations /> },
  { path: "/chats", element: <Chats /> },
  { path: "/cart", element: <Cart />, protected: true },
  { path: "/checkout", element: <Checkout />, protected: true },
  { path: "/my-activities", element: <Activities />, protected: true },
  { path: "/ad-details/:id", element: <AdDetails /> },
  { path: "/order-details/:id", element: <OrderDetails />, protected: true },
  { path: "/market-details/:id", element: <MarketDetails /> },
  { path: "/favorites", element: <Favorites /> },
  { path: "/add-ad", element: <AddAdvertisment />, protected: true },
  { path: "/add-ad/:id", element: <AddAdvertisment />, protected: true },
  { path: "/add-interest", element: <AddInterest />, protected: true },
  { path: "/add-interest/:id", element: <AddInterest />, protected: true },
  { path: "/manage-accounts", element: <ManageAccounts />, protected: true },
  { path: "/product-details/:id", element: <ProductDetails /> },
];

export default routerConfig;
