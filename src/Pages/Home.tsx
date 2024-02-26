import { MdOutlinePerson3 } from "react-icons/md";
import { MdOutlineFactory } from "react-icons/md";
import { GiPlantRoots } from "react-icons/gi";
import { GiCow } from "react-icons/gi";
import { Article } from "../_interface";
import ArticleCard from "../components/ArticleCard";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import Footer from "../components/Footer";
import AboutSection from "../components/AboutSection";
import { useScrollTo } from "../components/useScrollTo";
import { articles } from "../articles";
import { NavLink } from "react-router-dom";

export default function Home() {
  useScrollTo()

  return (
    <div className="text-center flex w-full flex-col justify-center items-center h-fit pt-72">

      <div
        className='sm:hidden flex h-64 w-full absolute items-center gap-5 capitalize top-0 !bg-no-repeat !bg-cover'
        style={{
          background: `linear-gradient(
                        to bottom, 
                        rgb(255 255 255 / .5), rgb(255 255 255 / 0)
                    ), url(/images/african-farm-2.jpg)`,
        }}
      ></div>

      <div className="flex flex-col gap-4">

        <Swiper
          slidesPerView={"auto"}
          spaceBetween={10}
          className="drink-card h-fit w-screen px-5 custom-1480px:justify-center !-mx-6"
        >
          <SwiperSlide className='!w-fit'>
            <label className="flex justify-center items-center gap-2 uppercase whitespace-nowrap rounded-full bg-primary text-white border-transparent dark:bg-tertiary px-3 py-1 border-2 dark:border-secondary/60">
              <GiCow className="text-xl" />
              Élevage
            </label>
          </SwiperSlide>

          <SwiperSlide className='!w-fit'>
            <label className="flex justify-center items-center gap-2 uppercase whitespace-nowrap rounded-full bg-white dark:bg-tertiary px-3 py-1 border-2 border-white dark:border-secondary/60">
              <GiPlantRoots className="text-xl" />
              Sol et cultures
            </label>
          </SwiperSlide>

          <SwiperSlide className='!w-fit'>
            <label className="flex justify-center items-center gap-2 uppercase whitespace-nowrap rounded-full bg-white dark:bg-tertiary px-3 py-1 border-2 border-white dark:border-secondary/60">
              <MdOutlineFactory className="text-xl" />
              Pilotage de l'entreprise
            </label>
          </SwiperSlide>

          <SwiperSlide className='!w-fit'>
            <label className="flex justify-center items-center gap-2 uppercase whitespace-nowrap rounded-full bg-white dark:bg-tertiary px-3 py-1 border-2 border-white dark:border-secondary/60">
              <MdOutlinePerson3 className="text-xl" />
              Ressources humaines
            </label>
          </SwiperSlide>
        </Swiper>
        <h2 className="font-bold mb-3">NOS FORMATIONS AGRICOLES À DISTANCE</h2>
        {articles.filter((_element, index) => index < 2).map((article: Article, key: number) => <ArticleCard key={key} article={article} />)}
        <NavLink to="/formations" className="btn-secondary m-auto">
          Affichez plus →
        </NavLink>
      </div>
      <AboutSection />

      <Footer />
    </div>
  )
};
