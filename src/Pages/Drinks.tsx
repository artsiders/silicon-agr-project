import { useContext } from "react";
import { ThemeContext } from "../App";
import DrinkCard from "../components/DrinkCard";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

export default function Drinks() {
    const { restaurant } = useSelector((state: RootState) => state.userSession)
    // @ts-ignore
    const { Theme } = useContext(ThemeContext);
    return (
        <div className="flex w-full justify-center items-center pt-32 md:pt-16 px-0 gap-6 max-w-7xl flex-wrap">
            <div
                className='sm:hidden flex h-64 w-full absolute items-center gap-5 capitalize top-0 !bg-no-repeat !bg-cover'
                style={Theme === "light" ? {
                    background: `linear-gradient(
                        to bottom, 
                        rgb(255 255 255 / .5), rgb(255 255 255 / 0)
                    ), url(/images/drinks-illustration.webp)`,
                } : {
                    background: `linear-gradient(
                        to bottom, 
                        rgb(0 0 0 / .5), rgb(255 255 255 / 0)
                    ), url(/images/drinks-illustration.webp)`,
                }}
            ></div>

            <Swiper
                slidesPerView={"auto"}
                spaceBetween={30}
                className="drink-card h-full w-full p-5 md:p-10 custom-1480px:justify-center"
            >
                {(restaurant.boissons instanceof Array) && restaurant?.boissons.map((drink, key) =>
                    <SwiperSlide key={key} className='!w-[90vw] xxs:!w-64'>
                        <DrinkCard drink={drink} />
                    </SwiperSlide>
                )}
            </Swiper>

        </div>
    )
}
