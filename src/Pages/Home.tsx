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
        className='flex h-64 md:h-96 w-full absolute items-center justify-center gap-5 capitalize top-0 !bg-no-repeat !bg-cover'
        style={{
          background: `linear-gradient(
                        to bottom, 
                        rgb(0 0 0 / .6), rgb(0 0 0 / 0)
                    ), url(/images/jan-kopriva-LTMaAwxanGk-unsplash.webp)`,
        }}
      >
        <p className="text-xl text-white font-bold tracking-widest">Sivay</p>
      </div>

      <div className="flex flex-col gap-4 mt-24">
        <section className="overflow-hidden pt-20 pb-12 lg:pt-[120px] lg:pb-[90px] bg-light dark:bg-dark max-w-7xl">
          <div className="container mx-auto">
            <div className="flex flex-wrap items-center justify-between -mx-4">
              <div className="w-full px-4 lg:w-1/2 xl:w-5/12">
                <div className="mt-10 lg:mt-0">
                  <h2 className="mb-5 text-3xl font-bold text-dark dark:text-white sm:text-[40px]/[48px]">
                    NOS FORMATIONS AGRICOLES À DISTANCE
                  </h2>
                  <p>
                    Lutte contre le changement climatique, préservation des ressources naturelles, alimentation saine... Les défis de l'agriculture moderne sont nombreux. Rejoignez notre communauté d'agriculteurs engagés et développez les compétences nécessaires pour une agriculture durable et résiliente.
                  </p>
                </div>
              </div>
              <div className="w-full px-4 lg:w-6/12">
                <div className="flex flex-col gap-4 md:flex-row justify-center items-center">
                  {articles.filter((_element, index) => index < 2).map((article: Article, key: number) => <ArticleCard key={key} article={article} />)}
                </div>
                <NavLink to="/formations" className="btn-secondary m-auto mt-4">
                  Affichez plus →
                </NavLink>
              </div>

            </div>
          </div>
        </section>
      </div>

      <AboutSection />

      <Footer />
    </div>
  )
};
