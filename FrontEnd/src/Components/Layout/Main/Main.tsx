import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./Main.css";
import { RootState } from "../../../Redux/VacationStore";

function Main(): JSX.Element {
  const user = useSelector((state: RootState) => state.users.currentUser);
  return (
    <div className="Main">
      {user == null && (
        <div className="content-container">
          <h1>Welcome to Shnitzel Vacations</h1>
          <p>Your journey towards the perfect vacation starts here.</p>
          <p>To unlock a world of unforgettable experiences,</p>
          <p>
            please <NavLink to="/register">register</NavLink> or{" "}
            <NavLink to="/login">login</NavLink>.
          </p>
        </div>
      )}
    </div>
  );
}

export default Main;
