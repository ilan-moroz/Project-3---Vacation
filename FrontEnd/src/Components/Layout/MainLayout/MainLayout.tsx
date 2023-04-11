import MainRoute from '../../Routes/MainRoute/MainRoute'
import Footer from '../Footer/Footer'
import './MainLayout.css'

function MainLayout(): JSX.Element {
  return (
    <div className="MainLayout">
      <main>
        <MainRoute />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default MainLayout
