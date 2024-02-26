import { TbMoodEmpty } from "react-icons/tb";
import { CgFileDocument } from "react-icons/cg";
import { useSelector } from "react-redux";
import FoodInCartCard from "../components/FoodInCartCard";
import { NavLink } from "react-router-dom";
import DrinkInCartCard from "../components/DrinkInCartCard";
import { RootState } from "../app/store";
import { useContext } from "react";
import { ThemeContext } from "../App";

export default function Cart() {
    const { plats, boissons } = useSelector((state: RootState) => state.restoCart)
    // @ts-ignore
    const { Theme } = useContext(ThemeContext);

    return (
        <div className="flex justify-center flex-col items-center pt-40 px-6 ">
            <div
                className='sm:hidden flex h-36 rounded-b-2xl w-full absolute items-center gap-5 capitalize top-0 !bg-no-repeat !bg-cover'
                style={Theme === "light" ? {
                    background: `linear-gradient(
                        to bottom, 
                        rgb(255 255 255 / .5), rgb(255 255 255 / 0)
                    ), url(/images/foods-illustration.webp)`,
                } : {
                    background: `linear-gradient(
                        to bottom, 
                        rgb(0 0 0 / .5), rgb(255 255 255 / 0)
                    ), url(/images/foods-illustration.webp)`,
                }}
            >
            </div>

            {(plats.length === 0 && boissons.length === 0) ? <>
                <p><TbMoodEmpty className="text-5xl text-gray-400" /></p>
                <p className="text-center">
                    Votre panier est vide. <NavLink to="/menu" className="text-secondary font-bold underline">cliquez ici</NavLink> pour voir le menu.
                </p>
            </> : <>
                {plats.length > 0 && <>
                    <h1 className="text-xl mb-4 font-bold">Liste de plats que vous avez sélectionné</h1>
                    <div className="mb-20 flex md:grid lg:grid-cols-4 md:grid-cols-3 w-full justify-center items-center gap-6 max-w-7xl flex-wrap">
                        {plats.map((plat, key) => <FoodInCartCard plat={plat} key={key} />)}
                    </div>
                </>}
                {boissons.length > 0 && <>
                    <h1 className="text-xl mb-4 font-bold border-t-4 border-gray-300 dark:border-tertiary pt-4">Liste de boissons que vous avez sélectionné</h1>
                    <div className="mb-10 flex md:grid lg:grid-cols-4 md:grid-cols-3 w-full justify-center items-center gap-6 max-w-7xl flex-wrap">
                        {boissons.map((boisson, key) => <DrinkInCartCard boisson={boisson} key={key} />)}
                    </div>
                </>}
            </>}
            <div>
                <NavLink to='/order' className="btn block mt-5">
                    facture <CgFileDocument className="text-xl ml-2" />
                </NavLink>
            </div>
        </div>
    )
}
