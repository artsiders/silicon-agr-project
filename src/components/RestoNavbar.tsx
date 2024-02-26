import { BiUser } from "react-icons/bi";
import { MdRestaurantMenu } from "react-icons/md";
import { MdTableBar } from "react-icons/md";
import { MdDateRange } from "react-icons/md";
import { BiDrink } from "react-icons/bi";
import { createElement } from "react";
import { NavLink } from "react-router-dom";

export default function RestoNavbar() {
  const nav = [
    {
      link: "/restaurant/today",
      icon: MdDateRange,
    },
    {
      link: "/restaurant/foods",
      icon: MdRestaurantMenu,
    },
    {
      link: "/restaurant/drinks",
      icon: BiDrink,
    },
    {
      link: "/restaurant/tables",
      icon: MdTableBar,
      bulleNotif: true
    },
    {
      link: "/restaurant/account",
      icon: BiUser,
    },
  ];

  return (
    <div className="flex justify-center w-full">
      <nav
        id="navbar"
        className="fixed z-20 w-screen sm:w-fit justify-evenly flex items-center xs:gap-3 gap-2 bg-white dark:bg-tertiary px-4 py-2 md:px-2 md:py-2 dark:backdrop-blur-md rounded-t-3xl sm:rounded-full text-dark_primary border-2 border-white dark:border-secondary/30 duration-300 bottom-0 sm:bottom-10"
      >
        {nav.map((item, key) => (
          <NavLink
            key={key}
            to={item.link}
            className={`relative text-xl p-2.5 rounded-full sm:cursor-pointer hover:bg-primary hover:text-white transition-all`}
          >
            {createElement(item.icon)}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};