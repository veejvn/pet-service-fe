import React from 'react';
import AdminNavbarComponent from '../../component/Admin/AdminNavbarComponent';

const AdminPage = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                {/* Sidebar */}
                <AdminNavbarComponent/>

                {/* Main content */}
                <main className="col-md-9 ms-sm-auto col-lg-10 px-4">
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h1 className="h2">Dashboard</h1>
                        
                    </div>

                    <h2>Tổng quan</h2>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card mb-4">
                                <div className="card-body">
                                    <h5 className="card-title">Dịch vụ</h5>
                                    <p className="card-text">20 dịch vụ đã được đăng.</p>
                                </div>
                            </div>
                        </div>
                       
                    </div>

                    <h2>Danh sách Dịch vụ</h2>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Tên Dịch vụ</th>
                                <th scope="col">Mô tả</th>
                                <th scope="col">Giá</th>
                                <th scope="col">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Dịch vụ 1</td>
                                <td>Mô tả dịch vụ 1</td>
                                <td>$50</td>
                                <td>
                                    <button className="btn btn-warning btn-sm">Sửa</button>
                                    <button className="btn btn-danger btn-sm">Xóa</button>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Dịch vụ 2</td>
                                <td>Mô tả dịch vụ 2</td>
                                <td>$75</td>
                                <td>
                                    <button className="btn btn-warning btn-sm">Sửa</button>
                                    <button className="btn btn-danger btn-sm">Xóa</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </main>
            </div>
        </div>
    );
};

export default AdminPage;
