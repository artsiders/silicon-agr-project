import { BsTrash } from "react-icons/bs";
import { CiImageOff } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { adjustDrinkQuantity, removeDrinkFromCart } from "../feature/restoCart.slice";
import { useEffect, useState } from "react";
import { BoissonCart } from "../_interface";

interface Props {
    boisson: BoissonCart;
}
export default function DrinkInCartCard(props: Props) {
    const { boisson } = props
    const [quantity, setQuantity] = useState(boisson.quantity || 1);
    const dispatch = useDispatch()
    const increment = () => {
        if (quantity <= 19) {
            setQuantity(() => quantity + 1)
        }
    }
    const decrement = () => {
        if (quantity >= 2) {
            setQuantity(() => quantity - 1)
        }
    }

    useEffect(() => {
        dispatch(adjustDrinkQuantity({ ...boisson, quantity }))
    }, [quantity])
    return (
        <div className="w-full min-w-[280px] lg:min-h-full flex gap-3 flex-col relative bg-white p-2 rounded-2xl dark:bg-tertiary border-2 dark:border-primary/50">
            <div className="h-28 overflow-hidden w-full">
                {boisson.image ? <img
                    className="w-full rounded-2xl"
                    src={`${import.meta.env.VITE_REACT_APP_API_URL}/uploads/plats/${boisson.image}`}
                    alt=""
                /> : <div className="h-28 bg-slate-300 dark:bg-dark rounded-2xl flex justify-center items-center">
                    <CiImageOff className="text-3xl" />
                </div>}
            </div>
            <div className="px-2">
                <p className="font-bold text-lg">{boisson.name}</p>
                <p className="font-bold text-lg">{boisson.price} FCFA</p>
                <p className="">{boisson.description}</p>
            </div>

            <div className="px-2 mt-3">
                <p className="font-bold text-lg bg-green-100 dark:bg-green-500/20 py-1 px-3 rounded">Total : {boisson.price && boisson.price * quantity}</p>
            </div>

            <div className="flex justify-between gap-2 px-2 pb-2">
                <div className="flex items-center justify-center">
                    <div className="">
                        <button
                            className="bg-gray-300 dark:bg-dark hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
                            onClick={decrement}
                        >
                            -
                        </button>
                        <input
                            type="text"
                            className="border-gray-300 dark:bg-tertiary border dark:border-primary/20 py-2 px-4 w-16 text-center"
                            value={quantity}
                            readOnly
                        />
                        <button
                            className="bg-gray-30 dark:bg-dark hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
                            onClick={increment}
                        >
                            +
                        </button>
                    </div>
                </div>
                <button onClick={() => dispatch(removeDrinkFromCart(boisson))} className="text-red-600">
                    <BsTrash size={22} />
                </button>
            </div>
        </div>
    )
}
