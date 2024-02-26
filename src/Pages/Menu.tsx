import { useContext } from "react";
import MenuCard from "../components/ArticleCard";
import { ThemeContext } from "../App";
import { useSelector } from "react-redux"
import { RootState } from "../app/store";

export default function Menu() {
    // @ts-ignore
    const { Theme } = useContext(ThemeContext);
    const { restaurant } = useSelector((state: RootState) => state.userSession)
    return (
        <div className="flex md:grid md:items-start lg:grid-cols-4 md:grid-cols-3 w-full justify-center items-center pt-40 px-6 gap-6 max-w-7xl flex-wrap">
            <div
                className='sm:hidden flex h-52 w-full absolute items-center gap-5 capitalize top-0 !bg-no-repeat !bg-cover'
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
            {(restaurant.plats instanceof Array) && restaurant?.plats.map((food, key) => <MenuCard plat={food} key={key} />)}
        </div>
    )
}
