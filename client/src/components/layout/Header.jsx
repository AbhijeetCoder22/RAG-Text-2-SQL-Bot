function Header() {
  return (
    <div className="header-content">

      <div>
        <h2>Data Assistant</h2>
      </div>

      <div className="header-right">

        <div className="database-status">
          <span className="status-dot"></span>
          Database Online
        </div>

        <div className="user-avatar">
          AM
        </div>

      </div>

    </div>
  );
}

export default Header;