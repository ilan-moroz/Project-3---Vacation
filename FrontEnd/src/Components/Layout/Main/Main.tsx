import { useSelector } from "react-redux";
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
            please <a href="/register">register</a> or{" "}
            <a href="/login">login.</a>{" "}
          </p>
        </div>
      )}
    </div>
  );
}

export default Main;
