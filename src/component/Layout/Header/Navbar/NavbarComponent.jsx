import React, { useEffect, useState } from 'react'
import store from '../../../../redux/store.redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import "./Navbar.css";
import { useSelector } from 'react-redux';

function NavbarComponent() {
  const [isSticky, setIsSticky] = useState(false);
  const isLoggedIn = store.getState().auth.isLoggedIn;
  const user = useSelector((state) => state.auth.user);

  const handleScroll = () => {
    if (window.scrollY > 40) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const navigate = useNavigate();
  return (

    <nav className={`navbar navbar-expand-lg bg-white navbar-light shadow-sm py-3 py-lg-0 px-3 px-lg-0 ${isSticky ? 'sticky-top' : ''}`}>
      <a href="/" className="navbar-brand ms-lg-5">
        <h1 className="m-0 text-uppercase text-dark">
          <i className="bi bi-shop fs-1 text-primary me-3" />
          Cửa hàng thú cưng
        </h1>
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
      >
        <span className="flaticon-house"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <div className="navbar-nav ms-auto py-0">
          <NavLink to={"/"} className={({ isActive }) => isActive ? "nav-item nav-link active" : "nav-item nav-link"}>Trang chủ</NavLink>
          <NavLink to={"/about"} className={({ isActive }) => isActive ? "nav-item nav-link active" : "nav-item nav-link"}>Về chúng tôi</NavLink>
          <NavLink to={"/services"} className={({ isActive }) => isActive ? "nav-item nav-link active" : "nav-item nav-link"}>Dịch vụ</NavLink>
          {isLoggedIn && (<div className="d-flex position-relative justify-content-center align-items-center my-auto mx-4">
            <Link to={"/cart"}>
              <i className="bi bi-cart fs-1 text-primary" />
              <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning'>3</span>
            </Link>
          </div>)}
          {isLoggedIn ?
            <div className="d-flex justify-content-center align-items-center my-3 me-5">
              <div className="dropdown">
                <div className="avatar" data-bs-toggle="dropdown" aria-expanded="false">
                  {user?.avatar ? (
                    <img src={user?.avatar} alt="Avatar" />
                  ) : (
                    <img src="https://via.placeholder.com/150" alt="Avatar" />
                  )
                  }
                </div>
                <ul className="dropdown-menu dropdown-menu-end rounded">
                  <li className="dropdown-item d-flex"><div className='mx-auto'>{user?.displayName}</div></li>
                  <li><Link to={"/profile"} className="dropdown-item">Hồ sơ</Link></li>
                  <li><Link to={"/receipt"} className="dropdown-item">Hóa đơn</Link></li>
                  <li><Link to={"/logout"} className="dropdown-item">Đăng xuất</Link></li>
                </ul>
              </div>
            </div>
            : <a href="/login" className="nav-item nav-link nav-contact bg-primary text-white px-5 ms-lg-5">
              Đăng nhập
            </a>
          }
        </div>
      </div>
    </nav>


  )
}

export default NavbarComponent