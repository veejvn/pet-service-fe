import { useParams } from "react-router-dom";
import Profile from "./Profile";
import UpdateProfile from "./UpdateProfile";
import ChangePassword from "./ChangePassword";

const page = {
    profile: Profile,
    "update-profile": UpdateProfile,
    "change-password": ChangePassword
}

const Account = () => {
    const params = useParams();
    const Page = page[params.page] || Profile;
    return <Page></Page>
}

export default Account;