import { HiOutlineLogout } from "react-icons/hi";
import { BiEditAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { disconnect } from "../../feature/session.slice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import QrCodeGenerator from "../../components/QrCodeGenerator";
import { RootState } from "../../app/store";

export default function RestoAccount() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const session = useSelector((state: RootState) => state.session)
    return (
        <div className="min-h-screen w-full flex justify-center mt-24 p-5 md:p-10">

            <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-tertiary dark:border-gray-700 text-center">
                <div className="flex justify-center">
                    <QrCodeGenerator stringifiedObject={{
                        restaurantId: session.restaurant._id,
                        tableId: "1"
                    }} />
                </div>
                <h5 className="my-2 text-2xl font-semibold tracking-tight text-writing dark:text-white uppercase">La Terrasse de Yaoundé</h5>
                <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                    <b>Adresse</b> : Yaoundé
                </p>
                <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                    <b>Téléphone</b> : 6993849384
                </p>
                <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                    <b>Nombre de table</b> : 10
                </p>

                <button className="btn mt-4 !w-full !justify-center">
                    modifier <BiEditAlt className="text-xl ml-2" />
                </button>
                <button
                    className="underline flex items-center mt-10 justify-center w-full text-gray-500 dark:text-gray-400"
                    onClick={() => {
                        dispatch(disconnect())
                        toast.info("Vous êtes déconnectez !")
                        navigate("/login")
                    }}
                >
                    Se déconnecte <HiOutlineLogout className="text-xl ml-2" />
                </button>
            </div>

        </div>
    )
}
