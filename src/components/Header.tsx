import { memo } from "react";
import { Link } from "react-router-dom";

type Props = {
  username?: string;
  onLogout?: () => void;
};

const Header = memo(({ username, onLogout }: Props) => {
  const me = `/${username}`;
  return (
    <header className="header">
      <div className="logo">
        <img src="../../img/lufy.png" alt="Dwitter Logo" className="logo-img" />
        <h1 className="logo-name">Swit</h1>
        {username && <span className="logo-user">@{username}</span>}
      </div>
      {username && (
        <nav className="menu">
          <Link to="/">All tweets</Link>
          <Link to={me}>My tweets</Link>
          <button className="menu-item" onClick={onLogout}>
            Logout
          </button>
        </nav>
      )}
    </header>
  );
});

Header.displayName = "Header";

export default Header;
