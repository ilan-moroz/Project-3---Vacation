import { useEffect } from "react";
import "./Main.css";
import { vacation } from "../../Redux/VacationStore";
import axios from "axios";
import { allVacationsAction } from "../../Redux/VacationReducer";

function Main(): JSX.Element {
  useEffect(() => {
    //redux
    if (vacation.getState().vacations.vacations.length < 1) {
      console.log("getting data from backend....");
      axios
        .get("http://localhost:8080/api/v1/vacation/vacations/allVacations")
        .then((response) => {
          vacation.dispatch(allVacationsAction(response.data));
        });
    }
  }, []);
  return <div className="Main"></div>;
}

export default Main;
