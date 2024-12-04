import { useParams } from "react-router-dom";
import ListPet from "./ListPet";
import UpdatePet from "./UpdatePet";
import AddPet from "./AddPet";


const page = {
    "list-pet": ListPet,
    "add-pet": AddPet,
    "update-pet": UpdatePet,
}

const Pet = () => {
    const params = useParams();
    const Page = page[params.page] || ListPet;
    return <Page></Page>
}

export default Pet;