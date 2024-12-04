import { useEffect, useState } from "react";
import UserService from "../../service/user.service";
import UploadService from "../../service/upload.service";
import useMessageByApiCode from "../../hooks/useMessageByApiCode";

const UpdateProfile = () => {

    const [data, setData] = useState({});
    const [avatar, setAvatar] = useState(null);
    const [errorMessage, setErrorMessage] = useState();
    const getMessage = useMessageByApiCode();

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        const [result, error] = await UserService.getUser();
        if (error) {
            console.log(error);
            return;
        }
        setData(result.data)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleChangeFile = (e) => {
        const file = e.target.files[0];
        setAvatar(file);
    }
    
    const handleSubmit = async () => {
        const fileUrl = data.avatar;
        console.log(fileUrl);
        const [resultDelete, errorDelete] = await UploadService.deleteFile(avatar);
        if(errorDelete){
            console.log(errorDelete);
            return;
        }
        console.log(resultDelete);
        const formData = new FormData();
        formData.append('image', avatar);
        const [resultUpload, errorUpload] = await UploadService.uploadImage(formData);
        if(errorUpload){
            console.log(errorUpload);
            return;
        }
        const updateData = {
            ...data,
            avatar: resultUpload.data
        }
        setData(updateData);
        console.log(data);
        const [result, error] = UserService.updateInfo(data);
        if(error) {
            setErrorMessage(getMessage(error.code));
            toast.error(getMessage(error.code), {
                autoClose: 3000,
            });
            return;
        }
        toast.success(getMessage(result.code), {
            autoClose: 3000,
        })

    }

    return (
        <section className="" style={{ backgroundColor: "#f4f5f7" }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col mb-4 mb-lg-0">
                        <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
                            <form className="row g-0">
                                <div
                                    className="col-md-4 gradient-custom text-center text-white"
                                    style={{
                                        borderTopLeftRadius: ".5rem",
                                        borderBottomLeftRadius: ".5rem",
                                    }}
                                >
                                    <img
                                        src={data?.avatar}
                                        alt="Avatar"
                                        className="my-5 rounded-circle"
                                        style={{ width: "80px", height: "80px" }}
                                    />
                                    <input className="row mx-auto" style={{width: '100%', maxWidth: '300px', color: '#555'}} type="file" name="avatar" 
                                    onChange={handleChangeFile}/>
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body p-4">
                                        <h6>Chỉnh sửa thông tin cá nhân</h6>
                                        <hr className="mt-0 mb-4" />
                                        <div className="row pt-1">
                                            <div className="col-6 mb-3">
                                                <h6>Tên</h6>
                                                <input className="p-2 w-100" type="text" name="displayName" placeholder="Nguyễn Văn A"
                                                    value={data?.displayName || ""} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <hr className="mt-0 mb-4" />
                                        <div className="row pt-1">
                                            <div className="col-6 mb-3">
                                                <h6>Số điện thoại</h6>
                                                <input className="p-2 w-100" type="text" name="phoneNumber" placeholder="0123456789"
                                                    value={data?.phoneNumber || ""} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <hr className="mt-0 mb-4" />
                                        <div className="row pt-1">
                                            <div className="col-6 mb-3">
                                                <h6>Ngày sinh</h6>
                                                <input type="date" value={data?.dob || ''} name="dob" onChange={handleChange} />
                                            </div>
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
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default UpdateProfile;