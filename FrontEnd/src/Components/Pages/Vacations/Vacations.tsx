import Card from "./VacationCard/VacationCard";
import AddVacationModal from "./addVacationModal/addVacationModal";
import "./Vacations.css";

function Vacations(): JSX.Element {
  return (
    <div className="Vacations">
      <AddVacationModal />
      <Card />
    </div>
  );
}

export default Vacations;
