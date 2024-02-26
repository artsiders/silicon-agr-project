import { BiCalendar } from "react-icons/bi";
import { AiOutlineLoading } from "react-icons/ai";
import { useSelector } from "react-redux";
import axiosURL from "../../axiosConfig";
import { RootState } from "../../app/store";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import dayjs from "dayjs";
import { Commande } from "../../_interface";
import RestoOrderCard from "../../components/RestoOrderCard";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

export default function RestoOrders() {
    const [isLoading, setIsLoading] = useState(true);
    const [todayOrders, setTodayOrders] = useState<Commande[]>([]);
    const { restaurant } = useSelector((state: RootState) => state.session)
    const today = dayjs().format("YYYY-MM-DD")
    const [refresh, setRefresh] = useState({});


    useEffect(() => {
        axiosURL.get(`/commandes/${restaurant._id}/${today}`)
            .then((response) => {
                setIsLoading(false)
                setTodayOrders(response.data.data);
            })
            .catch((error) => {
                toast.error("Une erreur inattendue s'est produite : réessayez plus tard !")
                console.log(error.response);
                setIsLoading(false)
            });
    }, [refresh])

    return (
        <div className="flex flex-col pt-20 px-6 max-w-7xl">
            <Swiper
                slidesPerView={"auto"}
                spaceBetween={10}
                className="drink-card h-fit w-screen p-5 md:p-10 mb-7 custom-1480px:justify-center !-mx-6"
            >
                <SwiperSlide className='!w-fit'>
                    <label className="flex justify-center items-center gap-2 uppercase whitespace-nowrap text-orange-500 rounded-full bg-white dark:bg-tertiary px-3 py-1 border-2 border-white dark:border-secondary/60">
                        <BiCalendar className="text-xl" />
                        {dayjs().format("DD-MM-YYYY")}
                    </label>
                </SwiperSlide>
                <SwiperSlide className='!w-fit'>
                    <label htmlFor={`pending`} className="block uppercase whitespace-nowrap text-orange-500 rounded-full bg-gray-100 dark:bg-tertiary px-3 py-1 hover:bg-white border-2 border-white dark:border-transparent dark:hover:border-secondary/60">
                        <input className="mr-3" defaultValue="pending" type="radio" name={`statut`} id={`pending`} />
                        En attente...
                    </label>
                </SwiperSlide>
                <SwiperSlide className='!w-fit'>
                    <label htmlFor={`in_preparation`} className="block uppercase whitespace-nowrap text-teal-500 rounded-full bg-gray-100 dark:bg-tertiary px-3 py-1 hover:bg-white border-2 border-white dark:border-transparent dark:hover:border-secondary/60">
                        <input className="mr-3" defaultValue="in_preparation" type="radio" name={`statut`} id={`in_preparation`} />
                        En cours de préparation...
                    </label>
                </SwiperSlide>
                <SwiperSlide className='!w-fit'>
                    <label htmlFor={`ready`} className="block uppercase whitespace-nowrap text-green-500 rounded-full bg-gray-100 dark:bg-tertiary px-3 py-1 hover:bg-white border-2 border-white dark:border-transparent dark:hover:border-secondary/60">
                        <input className="mr-3" defaultValue="ready" type="radio" name={`statut`} id={`ready`} />
                        Prêt à être servi !
                    </label>
                </SwiperSlide>
                <SwiperSlide className='!w-fit'>
                    <label htmlFor={`served`} className="block uppercase whitespace-nowrap text-orange-400 rounded-full bg-gray-100 dark:bg-tertiary px-3 py-1 hover:bg-white border-2 border-white dark:border-transparent dark:hover:border-secondary/60">
                        <input className="mr-3" defaultValue="served" type="radio" name={`statut`} id={`served`} />
                        Bon appétit !
                    </label>
                </SwiperSlide>
                <SwiperSlide className='!w-fit'>
                    <label htmlFor={`paid`} className="block uppercase whitespace-nowrap text-purple-500 rounded-full bg-gray-100 dark:bg-tertiary px-3 py-1 hover:bg-white border-2 border-white dark:border-transparent dark:hover:border-secondary/60">
                        <input className="mr-3" defaultValue="paid" type="radio" name={`statut`} id={`paid`} />
                        Facture réglée.
                    </label>
                </SwiperSlide>
            </Swiper>
            <div className="flex md:grid md:grid-cols-2 xl:grid-cols-3 w-full justify-center items-center gap-6 flex-wrap">
                {/* <h2 className="text-xl mb-5 font-bold">Liste des commandes du jour.</h2> */}
                {isLoading ? <AiOutlineLoading className="text-4xl animate-spin" /> : todayOrders.map((command: Commande, key: number) =>
                    <RestoOrderCard setRefresh={setRefresh} key={key} index={key} command={command} />
                )}

            </div>
        </div>
    )
}
