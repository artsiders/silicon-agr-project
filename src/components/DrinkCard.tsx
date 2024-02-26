import { CiImageOff } from "react-icons/ci";
import { BsCartPlus } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addDrinkToCart } from "../feature/restoCart.slice";
import { Boisson } from "../_interface";

interface Props {
    drink: Boisson;
}

export default function DrinkCard(props: Props) {
    const { drink } = props
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addDrinkToCart({ ...drink, quantity: 1 }));
    };
    return (
        <div className="w-full z-10 sm:w-60 block shadow-card dark:shadow-none rounded-2xl bg-white dark:bg-tertiary">
            <div className="relative overflow-hidden bg-cover bg-no-repeat bg-light rounded-2xl">
                {drink.image ? <img
                    className="rounded-2xl"
                    src={`${import.meta.env.VITE_REACT_APP_API_URL}/uploads/plats/${drink.image}`}
                    alt=""
                /> : <div className="h-28 bg-slate-300 dark:bg-dark rounded-2xl flex justify-center items-center">
                    <CiImageOff className="text-3xl" />
                </div>}
                <NavLink to={`/drink/${drink._id}`}>
                    <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-white/10 bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100">
                    </div>
                </NavLink>
            </div>
            <div className="p-3">
                <h3 className="mb-2 font-bold text-xl leading-tight">
                    {drink.name}
                </h3>
                <p className="font-bold text-lg">{drink.price}</p>
                <div className="flex justify-between items-center">
                    <h5 className="font-medium leading-tight">
                        <a href="#" className="text-primary hover:underline">Voir plus →</a>
                    </h5>
                    <div className="flex justify-center">
                        <button onClick={handleAddToCart} className="btn text-primary">
                            <BsCartPlus />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
