import React, { useEffect, useState } from 'react'

import { NavLink, useNavigate } from 'react-router-dom';
function NavbarComponent() {
  const [isSticky, setIsSticky] = useState(false);

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
    const navigate=useNavigate();
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
        <NavLink to={"/"} className={({isActive}) => isActive ? "nav-item nav-link active" : "nav-item nav-link"}>Trang chủ</NavLink>
        <NavLink to={"/about"} className={({isActive}) => isActive ? "nav-item nav-link active" : "nav-item nav-link"}>Về chúng tôi</NavLink>
        <NavLink to={"/services"} className={({isActive}) => isActive ? "nav-item nav-link active" : "nav-item nav-link"}>Dịch vụ</NavLink>
        <a
          href="/login"
          className="nav-item nav-link nav-contact bg-primary text-white px-5 ms-lg-5"
        >
          Đăng nhập
        </a>
      </div>
    </div>
  </nav>
  

  )
}

export default NavbarComponent