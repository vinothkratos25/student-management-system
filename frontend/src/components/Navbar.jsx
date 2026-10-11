import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <span className="brand">🎓 Student Management</span>
        <div className="nav-links">
          <NavLink to="/" end>Students</NavLink>
          <NavLink to="/add">Add Student</NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar