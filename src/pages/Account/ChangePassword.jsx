import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthService from "../../service/auth.service";
import useMessageByApiCode from "../../hooks/useMessageByApiCode";

const ChangePassword = () => {
    const [data, setData] = useState({});
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState();
    const [loading, setLoading] = useState(false);
    const getMessage = useMessageByApiCode();
    const navigate = useNavigate();

    const handleChange = (name, value) => {
        setErrors({
            ...errors,
            [name]: "",
        });
        data[name] = value;
        setData(data);
    }

    const handleChangeCurrentPassword = ((e) => {
        handleChange("currentPassword", e.target.value)
    });

    const handleChangeNewPassword = ((e) => {
        handleChange("newPassword", e.target.value)
    });

    const onSubmit = async (data) => {
        const [result, error] = await AuthService.changePassword(data);
        if (error) {
            setErrorMessage(getMessage(error.code));
            toast.error(getMessage(error.code), {
                autoClose: 3000,
            });
            return;
        }
        toast.success(getMessage(result.code), {
            autoClose: 3000,
        })
        navigate("/");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await onSubmit(data);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setLoading(false);
    }

    return (
        <section className="d-flex align-items-center justify-content-center my-3">
            <div className="bg-white rounded shadow border-md mt-0 sm-max-w-md p-0">
                <div className="p-4 space-y-4 md-space-y-6" style={{width: '400px'}}>
                    <h1 className="h5 fw-bold text-gray-900">
                        Đổi mật khẩu
                    </h1>
                    <form className="space-y-4 md-space-y-6" onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="current-password" className="form-label">Mật khẩu hiện tại</label>
                            <input
                                type="password"
                                name="currentPassword"
                                id="current-password"
                                className="form-control rounded"
                                placeholder="••••••••"
                                required
                                onChange={(e) => handleChangeCurrentPassword(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="new-password" className="form-label">Mật khẩu mới</label>
                            <input
                                type="password"
                                name="newPassword"
                                id="new-password"
                                className="form-control rounded"
                                placeholder="••••••••"
                                required
                                onChange={(e) => handleChangeNewPassword(e)}
                            />
                        </div>
                        <p className="text-danger mb-4">{errorMessage}</p>
                        <button
                            type="submit"
                            className={`btn btn-primary w-100 rounded ${loading ? "disabled" : ""}`}
                            disabled={loading}
                        >
                            {loading ? "Đang xử lý..." : "Xác nhận"}
                        </button>
                        <div className="d-flex align-items-center justify-content-center">
                            <Link to="/account/profile" className="text-primary fs-2"><i class="bi bi-arrow-left-circle"></i></Link>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
    export default ChangePassword;