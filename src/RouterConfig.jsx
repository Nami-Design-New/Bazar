import EditProfile from "./routes/EditProfile";
import ForgetPassword from "./routes/ForgetPassword";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/Register";

const routerConfig = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/forget-password", element: <ForgetPassword /> },
  { path: "/edit-profile", element: <EditProfile /> },
  { path: "*", element: <></> },
];

export default routerConfig;
