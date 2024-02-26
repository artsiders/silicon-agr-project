import { AiOutlineLoading } from "react-icons/ai";
import { BiRightArrowAlt } from "react-icons/bi";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { BoissonCart, Commande, PlatCart } from "../_interface"
import axiosURL from "../axiosConfig";
import { toast } from "sonner";

interface Props {
    command: Commande;
    setRefresh: Dispatch<SetStateAction<object>>;
    index: number;
}
export default function RestoOrderCard(props: Props) {
    const { command, index, setRefresh } = props
    const [isLoading, setIsLoading] = useState(false);

    const handelStatut = (even: ChangeEvent<HTMLInputElement>) => {
        setIsLoading(true)
        const currentStatut = even.currentTarget.value
        console.log(currentStatut, command._id);

        axiosURL.patch(`/commandes/statut`, { commandId: command._id, statut: currentStatut })
            .then((response) => {
                setIsLoading(false)
                if (response.data.data) {
                    setRefresh({})
                }
            })
            .catch((error) => {
                setIsLoading(false)
                setRefresh({})
                toast.error("Une erreur inattendue s'est produite : réessayez plus tard !")
                console.log(error.response);
            });
    }
    return (
        <div className="bg-white shadow-card dark:shadow-none dark:bg-tertiary p-5 rounded-lg w-full md:h-full">
            <div className="mb-3">
                <h2 className="text-lg uppercase font-bold mb-1">plats</h2>
                {command.plats.map((plat: PlatCart, key: number) =>
                    <ul key={key} className="">
                        <li className="bg-light dark:bg-dark/50 px-2 py-1 list-disc ml-5 rounded-md mb-2 shadow-sm">{plat.name}<b className="pl-3 ml-3 whitespace-nowrap">Quantité : {plat.quantity}</b> </li>
                    </ul>
                )}
            </div>
            <div className="mb-3">
                <h2 className="text-lg uppercase font-bold mb-1">Boissons</h2>
                {command.boissons.map((boisson: BoissonCart, key: number) =>
                    <ul key={key} className="">
                        <li className="bg-light dark:bg-dark/50 px-2 py-1 list-disc ml-5 rounded-md mb-2 shadow-sm">{boisson.name}<b className="pl-3 ml-3 whitespace-nowrap">Quantité : {boisson.quantity}</b> </li>
                    </ul>
                )}
            </div>
            <div className="relative flex flex-col">
                {isLoading && <div className="absolute h-full w-full bg-gray-300/50 dark:bg-dark/40 flex justify-center items-center rounded-lg">
                    <AiOutlineLoading className="text-4xl animate-spin" />
                </div>}
                <label htmlFor={`pending-${index}`} className="uppercase mt-3 text-orange-500 bg-light dark:bg-dark/50 p-2 rounded-md hover:bg-gray-200 border-b-2 border-gray-400">
                    <input className="mr-3" defaultChecked={command.statut == "pending"} defaultValue="pending" onChange={handelStatut} type="radio" name={`statut-${index}`} id={`pending-${index}`} />
                    En attente...
                </label>
                <label htmlFor={`in_preparation-${index}`} className="uppercase mt-3 text-teal-500 bg-light dark:bg-dark/50 p-2 rounded-md hover:bg-gray-200 border-b-2 border-gray-400">
                    <input className="mr-3" defaultChecked={command.statut == "in_preparation"} defaultValue="in_preparation" onChange={handelStatut} type="radio" name={`statut-${index}`} id={`in_preparation-${index}`} />
                    En cours de préparation...
                </label>
                <label htmlFor={`ready-${index}`} className="uppercase mt-3 text-green-500 bg-light dark:bg-dark/50 p-2 rounded-md hover:bg-gray-200 border-b-2 border-gray-400">
                    <input className="mr-3" defaultChecked={command.statut == "ready"} defaultValue="ready" onChange={handelStatut} type="radio" name={`statut-${index}`} id={`ready-${index}`} />
                    Prêt à être servi !
                </label>
                <label htmlFor={`served-${index}`} className="uppercase mt-3 text-orange-400 bg-light dark:bg-dark/50 p-2 rounded-md hover:bg-gray-200 border-b-2 border-gray-400">
                    <input className="mr-3" defaultChecked={command.statut == "served"} defaultValue="served" onChange={handelStatut} type="radio" name={`statut-${index}`} id={`served-${index}`} />
                    Bon appétit !
                </label>
                <label htmlFor={`paid-${index}`} className="uppercase mt-3 text-purple-500 bg-light dark:bg-dark/50 p-2 rounded-md hover:bg-gray-200 border-b-2 border-gray-400">
                    <input className="mr-3" defaultChecked={command.statut == "paid"} defaultValue="paid" onChange={handelStatut} type="radio" name={`statut-${index}`} id={`paid-${index}`} />
                    Facture réglée.
                </label>
            </div>
            <div className="m-4 mb-0 flex justify-center">
                <button className="btn-secondary">Plus de détails <BiRightArrowAlt className="text-xl" /></button>
            </div>

        </div>
    )
}
