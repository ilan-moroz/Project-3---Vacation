import { Button } from '@mui/material'
import './Page404.css'

function Page404(): JSX.Element {
  return (
    <div className="Page404">
      <header className="top-header"></header>

      <div>
        <div className="starsec"></div>
        <div className="starthird"></div>
        <div className="starfourth"></div>
        <div className="starfifth"></div>
      </div>

      <div className="lamp__wrap">
        <div className="lamp">
          <div className="cable"></div>
          <div className="cover"></div>
          <div className="in-cover">
            <div className="bulb"></div>
          </div>
          <div className="light"></div>
        </div>
      </div>
      <section className="error">
        <div className="error__content">
          <div className="error__message message">
            <h1 className="message__title" style={{ fontFamily: 'tiki' }}>
              ]4*4 Page N*t Found[
            </h1>
            <p className="message__text">
              We're sorry, the page you were looking for isn't found here. The
              link you followed may either be broken or no longer exists. Please
              try again, or go back to home page.
            </p>
          </div>
          <div className="error__nav e-nav">
            <Button color="primary" variant="outlined">
              Home Page
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Page404
