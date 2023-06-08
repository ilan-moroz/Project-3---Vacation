import { Navigate, Route, Routes } from "react-router-dom";
import "./MainRoute.css";
import Login from "../../Components/Pages/Login/Login";
import Register from "../../Components/Pages/Register/Register";
import Main from "../../Components/Layout/Main/Main";
import Page404 from "../../Components/Pages/Page404/Page404";
import Vacations from "../../Components/Pages/Vacations/Vacations";
import VacationsReport from "../../Components/Pages/VacationsReport/VacationsReport";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/VacationStore";

function MainRoute(): JSX.Element {
  const role = useSelector((state: RootState) => state.users.role);

  const UserOrRedirect = () => {
    if (role === "user" || role === "admin") {
      return <Vacations />;
    } else {
      // If user is not logged in, redirect to login
      return <Navigate to="/login" replace />;
    }
  };

  const AdminOrRedirect = () => {
    if (role === "admin") {
      return <VacationsReport />;
    } else {
      // If user is not admin, redirect to page404
      return <Navigate to="/*" replace />;
    }
  };
  return (
    <div className="MainRoute">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/vacations" element={<UserOrRedirect />} />
        <Route path="/vacationreports" element={<AdminOrRedirect />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default MainRoute;
