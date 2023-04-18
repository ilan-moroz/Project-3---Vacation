import { Route, Routes } from 'react-router-dom'
import './MainRoute.css'
import Login from '../../Pages/Login/Login'
import Register from '../../Pages/Register/Register'
import Main from '../../Layout/Main/Main'
import Page404 from '../../Pages/Page404/Page404'
import Vacations from '../../Pages/Vacations/Vacations'

function MainRoute(): JSX.Element {
  return (
    <div className="MainRoute">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/vacations" element={<Vacations />} />
        <Route path="/" element={<Main />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  )
}

export default MainRoute
