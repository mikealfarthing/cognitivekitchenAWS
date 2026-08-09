import logo from "../assets/logo.png";

export default function Topbar({ onSignOut, activePage, onNavigate }) {
  return (
    <div className="topbar">
      <div className="brand">
        <img src={logo} alt="Cognitive Kitchen" className="brand-logo" />
      </div>

	<nav className="topnav">
	  <button
		className={activePage === "videos" ? "active" : ""}
		onClick={() => onNavigate("videos")}
	  >
		Videos
	  </button>
	  <button
		className={activePage === "calendar" ? "active" : ""}
		onClick={() => onNavigate("calendar")}
	  >
		Calendar
	  </button>
	</nav>

      <div className="topbar-right">
        <button className="link" onClick={onSignOut}>Sign Out</button>
      </div>
    </div>
  );
}