import MainRoute from "../../../Routes/MainRoute/MainRoute";
import { useLocation } from "react-router-dom";
import Footer from "../Footer/Footer";
import NavBar from "../Header/NavBar";
import "./MainLayout.css";

function MainLayout(): JSX.Element {
  const location = useLocation();
  // don't show the navbar on register and login pages
  const showNavbar =
    location.pathname !== "/register" && location.pathname !== "/login";
  // don't show the footer on vacations page
  const showFooter = location.pathname !== "/vacations";

  return (
    <div className="MainLayout">
      <header>{showNavbar && <NavBar />}</header>
      <main>
        <MainRoute />
      </main>
      <footer>{showFooter && <Footer />}</footer>
    </div>
  );
}

export default MainLayout;
