import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbarComponent from '../../component/Admin/AdminNavbarComponent';
import AdminServiceComponent from '../../component/Admin/AdminServiceComponent';
// Import các component khác ở đây

const AdminPage = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <div className="container-fluid">
            <div className="row">
                {/* Sidebar */}
                <div className="col-md-2 min-vh-100 bg-dark">
                    <nav className="nav flex-column">
                        <a className="nav-link text-white" data-bs-toggle="tab" href="#dashboard">Dashboard</a>
                        <a className="nav-link text-white" data-bs-toggle="tab" href="#services">Quản lý Dịch vụ</a>
                        <a className="nav-link text-white" data-bs-toggle="tab" href="#users">Quản lý Người dùng</a>
                        <a className="nav-link text-white mt-auto" onClick={handleLogout}>
                            <i className="fas fa-sign-out-alt me-2"></i>
                            Thoát
                        </a>
                    </nav>
                </div>

                {/* Main content */}
                <div className="col-md-10 p-4">
                    <div className="tab-content">
                        <div className="tab-pane fade show active" id="dashboard">
                            <h3>Dashboard</h3>
                            {/* Nội dung Dashboard */}
                        </div>
                        <div className="tab-pane fade" id="services">
                            <AdminServiceComponent />
                        </div>
                        <div className="tab-pane fade" id="users">
                            <h3>Quản lý Người dùng</h3>
                            {/* Component quản lý người dùng */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;

