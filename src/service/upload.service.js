import axios from "axios";
import { service } from "../tools/axios.tool";

const API_URL = import.meta.env.VITE_API_URL;

const UploadService = {
  uploadImage(formData) {
    return service(
      axios.post(`${API_URL}/uploads/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    );
  },
  deleteFile(fileUrl){
    return service(axios.delete(`${API_URL}/uploads}`, {
        params: {file_url: fileUrl}
    }))
  }
};

export default UploadService;
