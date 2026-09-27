import "../../styles/layout.css";

function AppLayout({ sidebar, header, children }) {
  return (
    <div className="app-layout">

      <aside className="sidebar">
        {sidebar}
      </aside>

      <main className="main-content">

        <header className="header">
          {header}
        </header>

        <section className="content">
          {children}
        </section>

      </main>

    </div>
  );
}

export default AppLayout;