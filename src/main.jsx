import App from "./App";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

import "./assets/styles/all.min.css";
import "../node_modules/react-toastify/dist/ReactToastify.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min";
import "./assets/styles/style.css";

import InterceptorProvider from "./components/verification/InterceptorProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <ToastContainer />
      <BrowserRouter>
        <InterceptorProvider>
          <App />
        </InterceptorProvider>
      </BrowserRouter>
    </Provider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
