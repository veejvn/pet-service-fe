// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";

const ListPet = () => {
  const pets = [
    {
      id: "1",
      name: "Mắm Tôm",
      weight: 5,
      age: "12 tháng",
      description: "Tao là mèo",
      species: { id: "1", name: "Chó" },
      image: "/src/assets/img/biduu.jpg",
    },
    // Add more pet objects here
  ];

  const handleDelete = (id) => {
    console.log(`Deleting pet with ID: ${id}`);
    // Add delete logic here (API call or state update)
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-center">Your Pets List</h1>
        {/* Button to add a new pet */}
        <Link to="/pet/add-pet" className="btn btn-success">
          Thêm Pet Mới
        </Link>
      </div>
      <div className="row">
        {pets.map((pet) => (
          <div className="col-md-4 mb-4" key={pet.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={pet.image}
                className="card-img-top"
                alt={`Image of ${pet.name}`}
                style={{ objectFit: "cover", height: "200px" }}
              />
              <div className="card-body">
                <h5 className="card-title">{pet.name}</h5>
                <p className="card-text">
                  <strong>Species:</strong> {pet.species.name}
                </p>
                <p className="card-text">
                  <strong>Weight:</strong> {pet.weight}kg
                </p>
                <p className="card-text">
                  <strong>Age:</strong> {pet.age}
                </p>
                <p className="card-text text-truncate">
                  <strong>Description:</strong> {pet.description}
                </p>
                <div className="d-flex justify-content-between">
                  <Link
                    to={`/pet/update-pet`} //
                    className="btn btn-primary btn-sm"
                  >
                    Cập nhật
                  </Link>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target={`#modal-${pet.id}`}
                  >
                    Xóa
                  </button>
                </div>
              </div>
            </div>

            {/* Modal for delete confirmation */}
            <div
              className="modal fade"
              id={`modal-${pet.id}`}
              tabIndex="-1"
              aria-labelledby={`modalLabel-${pet.id}`}
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
  );
};

export default ListPet;
