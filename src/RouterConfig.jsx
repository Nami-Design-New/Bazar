import Activities from "./routes/Activities";
import EditProfile from "./routes/EditProfile";
import ErrorPage from "./routes/ErrorPage";
import ForgetPassword from "./routes/ForgetPassword";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/Register";

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
];

export default routerConfig;
