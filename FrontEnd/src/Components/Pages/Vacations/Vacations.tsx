import Card from "./VacationCard/VacationCard";
import AddVacationModal from "./addVacationModal/addVacationModal";
import "./Vacations.css";
import { useEffect, useState } from "react";
import { vacation } from "../../Redux/VacationStore";
import axios from "axios";
import { allVacationsAction } from "../../Redux/VacationReducer";

function Vacations(): JSX.Element {
  // const [vacations, setVacations] = useState([]);

  //get data from database and save in redux
  useEffect(() => {
    if (vacation.getState().vacations.vacations.length < 1) {
      console.log("getting data from backend....");
      axios
        .get("http://localhost:8080/api/v1/vacation/vacations/allVacations")
        .then((response) => {
          vacation.dispatch(allVacationsAction(response.data));
          // (vacation. (() => {setVacations(response.data)}))
        });
    }
  }, []);
  return (
    <div className="Vacations">
      <AddVacationModal />
      <Card />
    </div>
  );
}

export default Vacations;
