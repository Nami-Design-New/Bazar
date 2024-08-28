import Home from "./routes/Home";

const routerConfig = [
  { path: "/", element: <Home /> },
  { path: "*", element: <></> }
];

export default routerConfig;
