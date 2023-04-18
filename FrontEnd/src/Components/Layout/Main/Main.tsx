import NavBar from '../NavBar/NavBar'
import BackGround from '../BackGround/BackGround'
import './Main.css'

function Main(): JSX.Element {
  return (
    <div className="Main">
      <NavBar />
      <BackGround />
    </div>
  )
}

export default Main
