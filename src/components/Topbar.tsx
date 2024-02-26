import { TbPlant2 } from "react-icons/tb";
import { BiChevronDown } from "react-icons/bi";
import { useState, useEffect, useContext, useRef } from "react";
import { BiMoon, BiSun } from "react-icons/bi";
import { ThemeContext } from "../App";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import fr from "../assets/langs-img/fr.png";
import en from "../assets/langs-img/en.png";
import { NavLink } from "react-router-dom";

const Topbar = () => {
  const { t, i18n } = useTranslation();
  const [scrollClass, setScrollClass] = useState("");
  const [lang, setLang] = useState(i18n.language);
  const selectLang = useRef<HTMLDivElement>(null);

  // @ts-ignore
  const { Theme, SetTheme } = useContext(ThemeContext);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrollClass(
          "backdrop-blur-xl bg-light/40 dark:bg-dark/10"
        );
      } else {
        setScrollClass("");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const switchTheme = () => {
    if (document.documentElement.classList.contains("dark")) {
      Cookies.set("theme", "light");
      SetTheme("light");
    } else {
      Cookies.set("theme", "dark");
      SetTheme("dark");
    }
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="flex justify-center w-full">
      <div
        className={`h-16 fixed top-0 z-40 ${scrollClass} flex justify-between items-center px-3 md:px-6 w-screen`}
      >
        <NavLink to="/" className="font-bold flex items-center gap-2 bg-[#f7f7f7]/90 dark:bg-dark/80 border-2 border-white dark:border-transparent rounded-xl py-1 px-3">
          <TbPlant2 className="text-3xl" />
          <h1 className="hidden xxs:block">Green Agr</h1>
        </NavLink>

        <div className="flex items-center gap-3">
          <div
            className="relative"
            onClick={() => {
              selectLang.current?.classList.toggle("hidden");
            }}
          >
            <button className="capitalize text-xs leading-5 font-semibold bg-[#f7f7f7]/90 dark:bg-dark/80 border-2 border-white dark:border-transparent rounded-xl py-2 px-3 flex items-center space-x-2 hover:shadow-card dark:highlight-white/5">
              {lang === "en" ? <img src={fr} className="h-5" alt="fr" /> : <img src={en} className="h-5" alt="en" />}
              <BiChevronDown size={20} />
            </button>
            <div
              ref={selectLang}
              className="hidden capitalize absolute top-full right-px mt-1 py-2 w-40 rounded-lg bg-[#f7f7f7] shadow-none ring-1 ring-slate-900/5 text-sm leading-6 font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:highlight-white/5 border-2 border-white dark:border-transparent"
            >
              <span
                className={`cursor-pointer hover:text-primary/60 flex items-center gap-2 px-3 py-1 ${lang === "fr" ? "text-primary dark:text-primary" : ""
                  }`}
                onClick={() => {
                  setLang("fr");
                  i18n.changeLanguage("fr");
                }}
              >
                <img src={fr} className="h-5" alt="fr" />
                {t("french")}
              </span>
              <span
                className={`cursor-pointer hover:text-primary/60 flex items-center gap-2 px-3 py-1 ${lang === "en" ? "text-primary dark:text-primary" : ""
                  }`}
                onClick={() => {
                  setLang("en");
                  i18n.changeLanguage("en");
                }}
              >
                <img src={en} className="h-5" alt="en" />
                {t("english")}
              </span>
            </div>
          </div>

          <div
            className="sm:cursor-pointer right-4 z-[999] rounded-xl bg-[#f7f7f7] dark:bg-tertiary/80 p-3 hover:shadow-card border-[1px] border-white dark:border-transparent"
            onClick={switchTheme}
          >
            {Theme === "dark" ? <BiSun size={16} /> : <BiMoon size={16} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
