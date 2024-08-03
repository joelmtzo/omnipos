
const NavBar = ({handleSelectedLink}) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark py-3 px-5">
      <div className="collapse navbar-collapse d-flex justify-content-between">
        <a className="navbar-brand" href="#">
          NOMBRE DE RESTAURANT MAS LARGO DE LO NORMAL
        </a>
        <ul className="navbar-nav flex-row gap-3">
          <li onClick={() => handleSelectedLink("POS")} className="nav-item active">
            <a className="btn btn-dark p-3" href="#">
              POS
            </a>
          </li>
          <li onClick={() => handleSelectedLink("Tables")} className="nav-item">
            <a className="btn btn-dark p-3" href="#">
              Tables
            </a>
          </li>
          <li onClick={() => handleSelectedLink("Kitchen")} className="nav-item">
            <a className="btn btn-dark p-3" href="#">
              Order Status
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
