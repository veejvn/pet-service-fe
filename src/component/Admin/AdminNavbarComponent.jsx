import React from 'react'
import { NavLink } from 'react-router-dom';

function AdminNavbarComponent() {
  return (
    <nav className="admin-navbar">
      {/* <NavLink to="/admin/dashboard">Dashboard</NavLink> */}
      <NavLink 
        to="/admin/services"
        className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
      >
        Quản lý dịch vụ
      </NavLink>
      <NavLink 
        to="/"
        className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
      >
        Thoát
      </NavLink>
      {/* <NavLink to="/admin/products">Quản lý sản phẩm</NavLink> */}
    </nav>
  )
}

// Thêm CSS inline hoặc trong file CSS riêng
const styles = {
  '.admin-navbar': {
    padding: '1rem',
    backgroundColor: '#f8f9fa',
    borderBottom: '1px solid #dee2e6',
  },
  '.nav-link': {
    padding: '0.5rem 1rem',
    textDecoration: 'none',
    color: '#333',
    marginRight: '1rem',
  },
  '.nav-link.active': {
    color: '#007bff',
    fontWeight: 'bold',
  }
}

export default AdminNavbarComponent