// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdatePet = () => {
  const { petId } = useParams(); // Get pet ID from URL
  const navigate = useNavigate();

  // State for pet data
  const [petData, setPetData] = useState({
    name: "",
    weight: 0,
    age: "",
    description: "",
    species: "",
    image: "",
  });

  const [speciesList, setSpeciesList] = useState([]); // List of species options

  // Fetch pet data on component load
  useEffect(() => {
    // Simulate fetching pet details from API
    const fetchPetData = async () => {
      // Replace with your actual API call
      const petDetails = {
        id: petId,
        name: "Mắm Tôm",
        weight: 5,
        age: "12 tháng",
        description: "Tao là mèo",
        species: "Chó",
        image: "/src/assets/img/biduu.jpg",
      };

      setPetData(petDetails);
    };

    // Fetch species list (optional)
    const fetchSpeciesList = async () => {
      // Replace with actual API call
      const species = ["Chó", "Mèo", "Cá", "Chim"];
      setSpeciesList(species);
    };

    fetchPetData();
    fetchSpeciesList();
  }, [petId]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPetData({ ...petData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Pet Data:", petData);

    // Simulate API call to update pet data
    // Replace this with your API logic
    alert(`Pet "${petData.name}" has been updated successfully!`);
    navigate("/pet/list"); // Redirect to pet list
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Cập Nhật Thông Tin Pet</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Tên Pet
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={petData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="weight" className="form-label">
            Cân Nặng (kg)
          </label>
          <input
            type="number"
            className="form-control"
            id="weight"
            name="weight"
            value={petData.weight}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">
            Tuổi (tháng)
          </label>
          <input
            type="text"
            className="form-control"
            id="age"
            name="age"
            value={petData.age}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Mô Tả
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={petData.description}
            onChange={handleInputChange}
            rows="3"
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="species" className="form-label">
            Loài
          </label>
          <select
            className="form-select"
            id="species"
            name="species"
            value={petData.species}
            onChange={handleInputChange}
            required
          >
            <option value="">Chọn Loài</option>
            {speciesList.map((species, index) => (
              <option key={index} value={species}>
                {species}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Hình Ảnh
          </label>
          <input
            type="file"
            className="form-control"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleInputChange}
          />
          {petData.image && (
            <div className="mt-3">
              <img
                src={petData.image}
                alt="Preview"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
            </div>
          )}
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            Lưu Thay Đổi
          </button>
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => navigate("/pet/list")}
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePet;
