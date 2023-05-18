import Card from "./VacationCard/VacationCard";
import AddVacationModal from "./addVacationModal/addVacationModal";
import "./Vacations.css";
import { useEffect, useState } from "react";
import { vacation } from "../../../Redux/VacationStore";
import axios from "axios";
import { allVacationsAction } from "../../../Redux/VacationReducer";

function Vacations(): JSX.Element {
  // re render the page after get data
  const [refresh, setRefresh] = useState(false);

  //get data from database and save in redux
  useEffect(() => {
    if (vacation.getState().vacations.vacations.length < 1) {
      console.log("getting data from backend....");
      axios
        .get("http://localhost:8080/api/v1/vacation/vacations/allVacations")
        .then((response) => {
          vacation.dispatch(allVacationsAction(response.data));
          setRefresh(!refresh);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="Vacations">
      {/* add new vacation */}
      <AddVacationModal />
      {/* get all vacations from redux and display all the vacations*/}
      <div className="vacationCards">
        {vacation.getState().vacations.vacations.map((item) => (
          <Card
            key={item["vacationDestiny"]}
            vacationDestiny={item["vacationDestiny"]}
            vacationDesc={item["vacationDesc"]}
            vacationStart={item["vacationStart"]}
            vacationEnd={item["vacationEnd"]}
            price={item["price"]}
            photoFile={`http://localhost:8080/${item["photoFile"]}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Vacations;
