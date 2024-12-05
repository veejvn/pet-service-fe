import { useEffect, useState } from "react";
import UserService from "../../service/user.service";
import UploadService from "../../service/upload.service";
import useMessageByApiCode from "../../hooks/useMessageByApiCode";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const UpdateProfile = () => {

    const [data, setData] = useState({});
    const [avatar, setAvatar] = useState(null);
    const [errorMessage, setErrorMessage] = useState();
    const getMessage = useMessageByApiCode();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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

    const handleUploadFile = async () => {
        const hasAvatarFile = avatar instanceof File;
        let newUpload = {};
        if (hasAvatarFile) {
            const [deleteAvatarResult, deleteAvatarError] = await UploadService.deleteFile(data.avatar);
            const [uploadAvatarResult, uploadAvatarError] = await UploadService.uploadImage(avatar);
            if (!uploadAvatarError) {
                newUpload.avatar = uploadAvatarResult.data;
            }
        } else {
            newUpload.avatar = data.avatar;
        }
        return newUpload;
    }

    const onSubmit = async () => {
        const { avatar } = await handleUploadFile();
        const [result, error] = await UserService.updateInfo({
            displayName: data.displayName,
            dob: data.dob,
            phoneNumber: data.phoneNumber,
            avatar,
        });
        if (error) {
            setErrorMessage(getMessage(error.code));
            toast.error(getMessage(error.code), {
                autoClose: 3000,
            });
            return;
        }
        toast.success(getMessage(result.code), {
            autoClose: 3000,
        });
        navigate("/account/profile");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await onSubmit(data);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setLoading(false);
    }

    return (
        <section className="" style={{ backgroundColor: "#f4f5f7" }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col mb-4 mb-lg-0">
                        <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
                            <form className="row g-0" onSubmit={handleSubmit}>
                                <div
                                    className="col-md-4 gradient-custom text-center text-white"
                                    style={{
                                        borderTopLeftRadius: ".5rem",
                                        borderBottomLeftRadius: ".5rem",
                                    }}
                                >
                                    <img
                                        src={data?.avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH-bmqm7mCI2OBNsFo6PDo9QD3NPzXnpn9vA&s"}
                                        alt="Avatar"
                                        className="my-5 rounded-circle"
                                        style={{ width: "80px", height: "80px" }}
                                    />
                                    <p className="text-dark">Ảnh đại diện</p>
                                    <input className="row mx-auto" style={{ width: '100%', maxWidth: '300px', color: '#555' }} type="file" name="avatar"
                                        onChange={handleChangeFile} />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body p-4">
                                        <h4>Chỉnh sửa thông tin cá nhân</h4>
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
                                    </div>
                                </div>
                                <p className="text-danger mb-4">{errorMessage}</p>
                                <div className="row">
                                    <Link to={"/account/profile"} className={`col-1 btn btn-primary rounded ms-auto me-2 mb-3 ${loading ? "disabled" : ""}`}
                                        style={{ width: '150px' }} disabled={loading}>
                                        Trở lại
                                    </Link>
                                    <button
                                        type="submit"
                                        className={`col-1 btn btn-primary rounded me-auto ms-2 mb-3 ${loading ? "disabled" : ""}`}
                                        disabled={loading}
                                        style={{ width: '150px' }}
                                    >
                                        {loading ? "Đang xử lý..." : "Cập nhật"}
                                    </button>
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