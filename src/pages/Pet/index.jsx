import { useParams } from "react-router-dom";
import ListPet from "./ListPet";
import CreatePet from "./CreatePet";
import UpdatePet from "./UpdatePet";


const page = {
    "list-pet": ListPet,
    "create-pet": CreatePet,
    "update-pet": UpdatePet,
}

const Pet = () => {
    const params = useParams();
    const Page = page[params.page] || ListPet;
    return <Page></Page>
}

export default Pet;