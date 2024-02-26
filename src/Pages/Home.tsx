import { Article } from "../_interface";
import ArticleCard from "../components/ArticleCard";
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
        className='sm:hidden flex h-64 w-full absolute items-center justify-center gap-5 capitalize top-0 !bg-no-repeat !bg-cover'
        style={{
          background: `linear-gradient(
                        to bottom, 
                        rgb(0 0 0 / .6), rgb(0 0 0 / 0)
                    ), url(/images/african-farm-2.jpg)`,
        }}
      >
        <p className="text-xl text-white font-bold">green ARG</p>
      </div>

      <div className="flex flex-col gap-4">
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
