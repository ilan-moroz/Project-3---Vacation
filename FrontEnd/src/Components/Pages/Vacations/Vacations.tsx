import Card from "./VacationCard/VacationCard";
import AddVacationModal from "./addVacationModal/addVacationModal";
import "./Vacations.css";
import { useState } from "react";
import { Vacation } from "../../Model/Vacation";
import { vacation } from "../../Redux/VacationStore";

function Vacations(): JSX.Element {
  const [vacations, setVacations] = useState<Vacation[]>(
    vacation.getState().vacations.vacations
  );

  vacation.subscribe(() => {
    setVacations(vacation.getState().vacations.vacations);
  });
  return (
    <div className="Vacations">
      <AddVacationModal />
      <Card />
      <div>
        {vacations.map((item) => {
          return <h3 key={item.vacationDesc}>{item.price}</h3>;
        })}
      </div>
    </div>
  );
}

export default Vacations;
