// eslint-disable-next-line no-unused-vars
import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PetService from "../../service/pet.service";
import { toast } from "react-toastify";

const ListPet = () => {
  const [pets, setPets] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPets();
  }, [])

  const fetchPets = async () => {
    const [result, error] = await PetService.getAll();
    if (error) {
      console.log(error);
      return;
    }
    setPets(result.data);
  }

  const handleDelete = async (id) => {
    setLoading(true);
    const [result, error] = await PetService.delete(id);
    if (error) {
      console.log(error);
      result;
    }
    toast.success("Xóa thú cưng thành công", {
      autoClose: 3000,
    })
    fetchPets();
    setLoading(false);
  };

  const handleRedirectUpdate = (pet) => {
    navigate("/pet/update", { state: { pet } })
  }

  return (
    <Spin spinning={loading}>
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="text-center">Danh sách thú cưng  </h1>
          {/* Button to add a new pet */}
          <Link to="/pet/add" className="btn btn-primary rounded">
            Thêm Pet Mới
          </Link>
        </div>
        <div className="row">
          {pets && pets.map((pet) => (
            <div className="col-md-4 mb-4" key={pet?.id || ""}>
              <div className="card h-100 shadow-sm">
                <img
                  src={pet?.image || ""}
                  className="card-img-top"
                  alt={`Image of ${pet?.name || ""}`}
                  style={{ objectFit: "cover", height: "200px" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{pet?.name || ""}</h5>
                  <p className="card-text">
                    <strong>Loài:</strong> {pet?.species?.name || ""}
                  </p>
                  <p className="card-text">
                    <strong>Cân nặng:</strong> {pet?.weight || ""}kg
                  </p>
                  <p className="card-text">
                    <strong>Tuổi:</strong> {pet?.age || ""}
                  </p>
                  <p className="card-text text-truncate">
                    <strong>Mô tả:</strong> {pet?.description || ""}
                  </p>
                  <div className="d-flex justify-content-between">
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target={`#modal-${pet?.id}`}
                    >
                      Xóa
                    </button>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => {
                        handleRedirectUpdate(pet);
                      }}
                    >
                      Cập nhật
                    </button>
                  </div>
                </div>
              </div>

              {/* Modal for delete confirmation */}
              <div
                className="modal fade"
                id={`modal-${pet?.id}`}
                tabIndex="-1"
                aria-labelledby={`modalLabel-${pet?.id}`}
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5
                        className="modal-title"
                        id={`modalLabel-${pet.id}`}
                      >{`Xóa Pet: ${pet.name}`}</h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <p>{`Bạn có chắc muốn xóa "${pet.name}" khỏi danh sách?`}</p>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Hủy
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleDelete(pet.id)}
                        data-bs-dismiss="modal"
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Spin>
  );
};

export default ListPet;
