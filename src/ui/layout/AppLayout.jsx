import Footer from "./Footer";
import Header from "./Header";

function AppLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default AppLayout;
