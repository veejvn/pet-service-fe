import { useEffect, useState } from "react";
import UserService from "../../../service/user.service";
import { Link } from "react-router-dom";

const Profile = () => {

  const [user, setUser] = useState({});

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const [result, error] = await UserService.getUser();
    if (error) {
      console.log(error);
      return;
    }
    setUser(result.data)
  }

  return (
    <section className="" style={{ backgroundColor: "#f4f5f7" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col mb-4 mb-lg-0">
            <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
              <div className="row g-0">
                <div
                  className="col-md-4 gradient-custom text-center text-white"
                  style={{
                    borderTopLeftRadius: ".5rem",
                    borderBottomLeftRadius: ".5rem",
                  }}
                >
                  <img
                    src={user?.avatar}
                    alt="Avatar"
                    className="my-5 rounded-circle"
                    style={{ width: "80px", height: "80px" }}
                  />
                  <h5>{user?.displayName}</h5>
                  <Link to={"/account/update-profile"}>
                    <i className="bi bi-pencil-square text-primary me-2"></i>
                  </Link>
                  <Link to={"/account/change-password"}>
                    <i className="bi bi-key text-primary ms-2"></i>
                  </Link>
                </div>
                <div className="col-md-8">
                  <div className="card-body p-4">
                    <h6>Thông tin cá nhân</h6>
                    <hr className="mt-0 mb-4" />
                    <div className="row pt-1">
                      <div className="col-6 mb-3">
                        <h6>Email</h6>
                        <p className="text-muted">{user?.email}</p>
                      </div>
                      <div className="col-6 mb-3">
                        <h6>Số điện thoại</h6>
                        <p className="text-muted">{user?.phoneNumber}</p>
                      </div>
                    </div>
                    <hr className="mt-0 mb-4" />
                    <div className="row pt-1">
                      <div className="col-6 mb-3">
                        <h6>Ngày sinh</h6>
                        <p className="text-muted">{user?.dob}</p>
                      </div>
                      {user?.jobPosition && (
                        <div className="col-6 mb-3">
                          <h6>Vị trí công việc</h6>
                          <p className="text-muted">{user?.jobPosition}</p>
                        </div>)}
                    </div>
                    <div className="d-flex justify-content-start">
                      <a href="#!">
                        <i className="fab fa-facebook-f fa-lg me-3"></i>
                      </a>
                      <a href="#!">
                        <i className="fab fa-twitter fa-lg me-3"></i>
                      </a>
                      <a href="#!">
                        <i className="fab fa-instagram fa-lg"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;