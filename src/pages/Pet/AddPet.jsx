/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddPet = () => {
  const navigate = useNavigate();

  // State for pet data
  const [petData, setPetData] = useState({
    name: "",
    weight: 0,
    age: "",
    description: "",
    species: "",
    image: "", // URL or file path after upload
  });

  const [imageFile, setImageFile] = useState(null); // State for uploaded image file
  const [speciesList, setSpeciesList] = useState([]); // List of species options

  // Fetch species list on component load
  useEffect(() => {
    // Simulate fetching species list from API
    const fetchSpeciesList = async () => {
      // Replace with actual API call
      const species = ["Chó", "Mèo", "Cá", "Chim"];
      setSpeciesList(species);
    };

    fetchSpeciesList();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPetData({ ...petData, [name]: value });
  };

  // Handle image file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    // Optionally, create a preview URL for the uploaded file
    const imageUrl = URL.createObjectURL(file);
    setPetData({ ...petData, image: imageUrl });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simulate API call to upload image and save pet data
    const formData = new FormData();
    formData.append("name", petData.name);
    formData.append("weight", petData.weight);
    formData.append("age", petData.age);
    formData.append("description", petData.description);
    formData.append("species", petData.species);
    if (imageFile) {
      formData.append("image", imageFile); // Add image file to form data
    }

    try {
      // Replace with your actual API call
      console.log("Sending form data to server...");
      console.log(formData);

      alert(`Pet "${petData.name}" has been added successfully!`);
      navigate("/pet/list"); // Redirect to pet list
    } catch (error) {
      console.error("Error adding pet:", error);
      alert("Failed to add pet. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Thêm Pet Mới</h1>
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
            Tuổi (hoặc tháng)
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
            onChange={handleFileChange}
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
          <button type="submit" className="btn btn-success">
            Thêm Pet
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

export default AddPet;
