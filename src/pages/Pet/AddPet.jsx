/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SpeciesService from "../../service/species.service";
import UploadService from "../../service/upload.service";
import PetService from "../../service/pet.service";
import { toast } from "react-toastify";
import { Spin } from "antd";

const AddPet = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState();
  const [imageFile, setImageFile] = useState(null); // State for uploaded image file
  const [speciesList, setSpeciesList] = useState([]); // List of species options
  const [loading, setLoading] = useState(false);

  // State for pet data
  const [petData, setPetData] = useState({
    name: "",
    weight: 0,
    age: "",
    description: "",
    species_id: "",
    image: "", // URL or file path after upload
  });

  console.log(petData);

  useEffect(() => {
    fetchSpeciesList();
  }, []);

  const fetchSpeciesList = async () => {
    const [result, error] = await SpeciesService.getAll();
    if (error) {
      console.log(error);
      return;
    }
    setSpeciesList(result.data);
  };

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

  const handleUploadFile = async () => {
    const hasimageFile = imageFile instanceof File;
    let newUpload = {};
    if (hasimageFile) {
      const [uploadAvatarResult, uploadAvatarError] = await UploadService.uploadImage(imageFile);
      if (!uploadAvatarError) {
        newUpload.image = uploadAvatarResult.data;
      }
    } else {
      newUpload.image = petData.image;
    }
    return newUpload;
  }

  // Handle form submission
  const onSubmit = async () => {
    const { image } = await handleUploadFile();
    const [result, error] = await PetService.create({
      ...petData,
      image,
    });
    if (error) {
      setErrorMessage(error.message);
      return;
    }
    toast.success("Thêm thú cưng thành công", {
      autoClose: 3000,
    });
    navigate("/pet/list")
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
  }

  return (
    <Spin spinning={loading}>
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
              name="species_id"
              value={petData.species_id}
              onChange={handleInputChange}
              required
            >
              <option value="">Chọn Loài</option>
              {speciesList.map((species, index) => (
                <option key={index} value={species.id}>
                  {species.name}
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
          <p className="text-danger mb-4">{errorMessage}</p>
          <div className="text-center">
            <button
              type="button"
              className={`btn btn-secondary me-2 rounded ${loading ? "disabled" : ""}`}
              disabled={loading}
              onClick={() => navigate("/pet/list")}
            >
              Hủy
            </button>
            <button type="submit" className={`btn btn-primary rounded ${loading ? "disabled" : ""}`}
              disabled={loading}
            >
              {loading ? "Đang xử lý..." : "Thêm Pet"}
            </button>
          </div>
        </form>
      </div>
    </Spin>
  );
};

export default AddPet;
