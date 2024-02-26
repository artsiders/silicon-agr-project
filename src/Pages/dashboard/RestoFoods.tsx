import { BiChevronLeft } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import RestoFoodCard from "../../components/RestoFoodCard";
import { useState } from "react";
import ModalScreen from "../../components/ModalScreen";
import AddFoodForm from "../../components/ArticleDetail";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

export default function RestoFoods() {
  const [visible, setVisible] = useState(false)

  const { restaurant } = useSelector((state: RootState) => state.session)

  return (
    <div className="min-h-screen w-full flex justify-center mt-24 md:mt-0">
      <div className="flex flex-col justify-center items-center">
        <div>
          <button onClick={() => setVisible(true)} className="btn mb-5">
            <span>ajouter un plat</span> <AiOutlinePlus className="ml-2 text-xl" />
          </button>
          {visible && <ModalScreen setVisible={setVisible}>
            <div>
              <div className="flex items-center px-5 mb-10 bg-white dark:bg-tertiary py-4">
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setVisible(false);
                  }}
                  className="mr-5 btn-secondary !py-0 !px-2"
                >
                  <BiChevronLeft className="text-3xl" />
                </div>
                <h2 className="text-lg">Ajouter un plat</h2>
              </div>
              <div className="flex items-center justify-center w-full">
                <AddFoodForm setVisible={setVisible} />
              </div>

            </div>
          </ModalScreen>}
        </div>
        {(restaurant.plats instanceof Array) && <div className="flex md:grid md:items-start md:gap-20 lg:grid-cols-4 md:grid-cols-3 w-full justify-center items-center px-10 gap-6 max-w-7xl flex-wrap">
          {restaurant?.plats.map((food, key) => <RestoFoodCard food={food} key={key} />)}
        </div>}

      </div>
    </div>
  )
}
