import React from 'react'

function AdminNavbarComponent() {
  return (
    <nav id="sidebar" className="col-md-3 col-lg-2 d-md-block bg-light sidebar" style={{height:'100vh'}}>
    <div className="position-sticky" >
        <h5 className="text-center">Admin Dashboard</h5>
        <ul className="nav flex-column">

            <li className="nav-item">
                <a className="nav-link" href="#">
                    Quản lý Dịch vụ
                </a>
                <a className="nav-link" href="/">
                    Thoát
                </a>
            </li>
           
        </ul>
    </div>
</nav>
  )
}

export default AdminNavbarComponent