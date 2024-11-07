import React, { useEffect, useState } from 'react'

import classNames from 'classnames'
import { useNavigate } from 'react-router-dom';
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
        <a href="/" className="nav-item nav-link active">
          Trang chủ
        </a>
        <a href="/about" className="nav-item nav-link">
          Về chúng tôi
        </a>
        <a href="/services" className="nav-item nav-link">
          Dịch vụ
        </a>
        {/* <div className="nav-item dropdown">
          <a
            href="#"
            className="nav-link dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            Pages
          </a>
          <div className="dropdown-menu m-0">
            <a href="price.html" className="dropdown-item">
              Pricing Plan
            </a>
            <a href="team.html" className="dropdown-item">
              The Team
            </a>
            <a href="testimonial.html" className="dropdown-item">
              Testimonial
            </a>
            <a href="blog.html" className="dropdown-item">
              Blog Grid
            </a>
            <a href="detail.html" className="dropdown-item">
              Blog Detail
            </a>
          </div>
        </div> */}
        <a
          href="/contact"
          className="nav-item nav-link nav-contact bg-primary text-white px-5 ms-lg-5"
        >
          Liên Hệ <i className="bi bi-arrow-right" />
        </a>
      </div>
    </div>
  </nav>
  

  )
}

export default NavbarComponent