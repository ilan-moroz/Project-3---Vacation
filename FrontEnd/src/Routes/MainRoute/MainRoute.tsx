import { Route, Routes } from "react-router-dom";
import "./MainRoute.css";
import Login from "../../Components/Pages/Login/Login";
import Register from "../../Components/Pages/Register/Register";
import Main from "../../Components/Layout/Main/Main";
import Page404 from "../../Components/Pages/Page404/Page404";
import Vacations from "../../Components/Pages/Vacations/Vacations";
import VacationsReport from "../../Components/Pages/VacationsReport/VacationsReport";

function MainRoute(): JSX.Element {
  return (
    <div className="MainRoute">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/vacations" element={<Vacations />} />
        <Route path="/vacationreports" element={<VacationsReport />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default MainRoute;
