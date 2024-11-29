import bg from "../../../assets/img/bg-auth.png"

const AuthLayout = ({ children }) => {
    return (
        <div className="position-relative min-vh-100 overflow-hidden">
            <img
                src={bg}
                alt="background"
                className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
            />
            <div className="position-relative">{children}</div>
        </div>
    );
}

export default AuthLayout;