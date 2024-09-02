import Activities from "./routes/Activities";
import AdDetails from "./routes/AdDetails";
import EditProfile from "./routes/EditProfile";
import ErrorPage from "./routes/ErrorPage";
import ForgetPassword from "./routes/ForgetPassword";
import Home from "./routes/Home";
import OrderDetails from "./routes/OrderDetails";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Favorites from "./routes/Favorites";

const routerConfig = [
  { path: "/", element: <Home /> },
  { path: "*", element: <ErrorPage /> },
  // user auth
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/forget-password", element: <ForgetPassword /> },
  { path: "/edit-profile", element: <EditProfile /> },

  // user features
  { path: "/my-activities", element: <Activities /> },
  { path: "/ad-details/:id", element: <AdDetails /> },
  { path: "/order-details/:id", element: <OrderDetails /> },

  { path: "/favorites", element: <Favorites /> },
];

export default routerConfig;
