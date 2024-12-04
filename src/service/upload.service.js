import axios, { service } from "../tools/axios.tool";

const API_URL = import.meta.env.VITE_API_URL;

const UploadService = {
  async uploadImage(imageFile) {
    const formData = new FormData();
    formData.append("image", imageFile, "image.jpg");
    return service(
      axios.post(`${API_URL}/uploads/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    );
  },
  async deleteFile(fileUrl) {
    return service(
      axios.delete(`${API_URL}/uploads`, {
        params: {
          file_url: fileUrl,
        },
      })
    );
  },
};

export default UploadService;
