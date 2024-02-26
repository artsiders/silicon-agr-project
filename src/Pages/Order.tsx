import { AiOutlineLoading } from "react-icons/ai";
import { AiFillCheckCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import axiosURL from "../axiosConfig";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { BiLoaderCircle } from "react-icons/bi";
import { clearCart } from "../feature/restoCart.slice";
import dayjs from "dayjs";
import { formatToXAF, loadState, saveState } from "../utils";
import { RootState } from "../app/store";
import { BoissonCart, Commande, PlatCart } from "../_interface";


export default function Order() {
    const { plats, boissons } = useSelector((state: RootState) => state.restoCart)
    const { restaurant } = useSelector((state: RootState) => state.userSession)
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingCurrentCommand, setIsLoadingCurrentCommand] = useState(true)
    const [currentCommand, setCurrentCommand] = useState<Commande[]>([])
    const [refreshOrder, setRefreshOrder] = useState({})
    const dispatch = useDispatch()

    useEffect(() => {
        const ids = loadState("currentCommand").join(",");

        axiosURL.get(`/commandes/current_client/${ids}`).then((response) => {
            setIsLoadingCurrentCommand(false)
            setCurrentCommand(response.data?.data)

        }).catch((error) => {
            setIsLoadingCurrentCommand(false)
            console.log(error);
        })
    }, [refreshOrder])

    let somPlats = 0
    let somBoissons = 0
    plats.forEach(plat => {
        somPlats += plat.price! * plat.quantity
    });
    boissons.forEach(boisson => {
        somBoissons += boisson.price! * boisson.quantity
    });

    const handleOrder = () => {
        setIsLoading(true)
        const commandPayload = {
            restaurantId: restaurant._id,
            price: somPlats + somBoissons, // il sera calculer par le backend pour plus de sécurité
            plats: [...plats],
            boissons: [...boissons],
            tables: {
                tableName: 0,
                capacity: 0,
                QRCode: "",
            },
            statut: 'pending',
            date: dayjs().format("YYYY-MM-DD")
        }

        axiosURL.post(`/commandes`, commandPayload)
            .then((response) => {
                setIsLoading(false)
                const commandId = response.data.data._id
                const commandIds = loadState("currentCommand")

                if (commandIds instanceof Array) {
                    const newCommandIds = [...commandIds, commandId];
                    saveState("currentCommand", newCommandIds);
                } else {
                    throw new Error()
                }

                dispatch(clearCart())
                // Handle successful response
                // dispatch(updateCommand(response.data.data))
                toast.success(response.data?.message || "La Commande a été éffectué avec succès")
            })
            .then(() => setRefreshOrder({}))
            .catch((error) => {
                toast.error("Une erreur inattendue s'est produite : réessayez plus tard !")
                console.log(error.response);
                setIsLoading(false);
            });
    }

    return (
        <div className="pt-40 md:pt-16 px-6 max-w-7xl">
            <div className="text-center mb-10">
                <p className="mt-2"><b>Plats :</b> {somPlats || 0} FCFA</p>
                <p className="mt-2"><b>Boissons :</b> {somBoissons || 0} FCFA</p>
                <p className="text-green-500 uppercase text-3xl">Votre facture s'élève à</p>
                <p className="text-2xl mt-2">{somPlats + somBoissons || 0} FCFA</p>
                {!!somPlats || !!somBoissons ?
                    <button
                        onClick={handleOrder}
                        className="btn mt-4"
                    >
                        {isLoading ? <>
                            Chargement <BiLoaderCircle className="animate-spin text-xl ml-1" />
                        </> : <>
                            Validé la commande <AiFillCheckCircle className="ml-2" />
                        </>}
                    </button>
                    : <button className="mt-4">Vous n'avez rien commander ! <NavLink to="/menu" className="text-secondary font-bold underline">Cliquez ici</NavLink> pour passer commande.</button>}
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-10 justify-center items-center md:items-start">

                {isLoadingCurrentCommand ?
                    <AiOutlineLoading className="text-4xl animate-spin" /> :
                    currentCommand.length !== 0 &&
                    currentCommand.map((command, key) =>
                        <div key={key} className="bg-white shadow-card dark:shadow-none dark:bg-tertiary p-5 rounded-lg w-full">
                            <h1 className="text-lg uppercase font-bold mb-4">Commande {key + 1}</h1>
                            <div className="mb-3 ml-3">
                                <ul className="">
                                    <li className="bg-light dark:bg-dark dark:text-white/90 px-3 py-2 list-disc ml-5 rounded-md mb-2 shadow-sm">
                                        Prix : <b>{formatToXAF(command.price)}</b>
                                    </li>
                                    <li className="bg-light dark:bg-dark dark:text-white/90 px-3 py-2 list-disc ml-5 rounded-md mb-2 shadow-sm">
                                        Date : <b>{dayjs(command.date).format("DD-MM-YYYY à hh:m")}</b>
                                    </li>
                                </ul>
                            </div>

                            <div className="mb-3 ml-3">
                                <h2 className="uppercase font-bold mb-1">plats</h2>
                                {command.plats.map((plat: PlatCart, key: number) =>
                                    <ul key={key} className="">
                                        <li className="bg-light dark:bg-dark dark:text-white/90 px-3 py-2 list-disc ml-5 rounded-md mb-2 shadow-sm">{plat.name}<b className="pl-3 ml-3 whitespace-nowrap">Quantité : {plat.quantity}</b> </li>
                                    </ul>
                                )}
                            </div>
                            <div className="mb-3 ml-3">
                                <h2 className="uppercase font-bold mb-1">Boissons</h2>
                                {command.boissons.map((boisson: BoissonCart, key: number) =>
                                    <ul key={key} className="">
                                        <li className="bg-light dark:bg-dark dark:text-white/90 px-3 py-2 list-disc ml-5 rounded-md mb-2 shadow-sm">{boisson.name}<b className="pl-3 ml-3 whitespace-nowrap">Quantité : {boisson.quantity}</b> </li>
                                    </ul>
                                )}
                            </div>
                            <div className="mt-10">
                                <h2 className="uppercase font-bold mb-1">Statut de la commande</h2>
                                <ul>
                                    {command.statut === "pending" && <p className="text-orange-500">En attente...</p>}
                                    {command.statut === "in_preparation" && <p className="text-teal-500">En cours de préparation...</p>}
                                    {command.statut === "ready" && <p className="text-green-500">Prêt à être servi !</p>}
                                    {command.statut === "served" && <p className="text-orange-400">Bon appétit !</p>}
                                    {command.statut === "paid" && <p className="text-purple-500">Facture réglée.</p>}
                                </ul>
                            </div>
                        </div>
                    )}
            </div>
        </div>
    )
}
