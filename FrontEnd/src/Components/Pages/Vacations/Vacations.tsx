import Card from './VacationCard/VacationCard'
import NavBar from '../../Layout/NavBar/NavBar'
import AddVacationModal from './addVacationModal/addVacationModal'
import './Vacations.css'

function Vacations(): JSX.Element {
  return (
    <div className="Vacations">
      <NavBar />
      <AddVacationModal />
      <Card />
    </div>
  )
}

export default Vacations
