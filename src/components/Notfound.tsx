import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export default function Notfound() {
    const navigate = useNavigate()
    const goBack = () => {
        navigate(-1)
    }
    return (
        <div className="flex text-center px-5 gap-4 flex-col justify-center items-center h-screen -mb-24">
            <h1 className="text-3xl font-bold text-primary">OUPS!</h1>
            <p>La page demandée n'existe pas ! Mais pas de panique, vous pouvez revenir en arrière !</p>
            <button className="btn-gray" onClick={goBack}><BiArrowBack className="mr-2 text-xl" /> Retour en arrière</button>
        </div>
    )
}
