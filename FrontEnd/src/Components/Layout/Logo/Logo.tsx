import { NavLink } from "react-router-dom";
import "./Logo.css";

interface HeaderProps {
  style?: React.CSSProperties; // Add style prop
}

function Header({ style }: HeaderProps): JSX.Element {
  return (
    <div className="Header" style={style}>
      <NavLink to="/">
        <h1>]SHN|TZEL V@CATI*NS[</h1>
      </NavLink>
    </div>
  );
}

export default Header;
