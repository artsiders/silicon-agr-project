import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { AiOutlinePlus } from "react-icons/ai";
import ModalScreen from "../../components/ModalScreen";
import { BiChevronLeft } from "react-icons/bi";
import RestoTableCard from "../../components/RestoTableCard";
import AddTableForm from "../../components/AddTableForm";

export default function RestoTables() {
    const [visible, setVisible] = useState(false)

    const { restaurant } = useSelector((state: RootState) => state.session)
    console.log(restaurant.tables);
    return (
        <div className="flex justify-center items-center pt-20 px-6 gap-6 max-w-7xl flex-wrap">
            <div className="flex flex-col justify-center items-center">
                <div>
                    <button onClick={() => setVisible(true)} className="btn mb-5">
                        <span>ajouter une table</span> <AiOutlinePlus className="ml-2 text-xl" />
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
                                <h2 className="text-lg">Ajouter une table</h2>
                            </div>
                            <div className="flex items-center justify-center w-full">
                                <AddTableForm setVisible={setVisible} />
                            </div>

                        </div>
                    </ModalScreen>}
                </div>
                {(restaurant.tables instanceof Array) && <div className="flex md:grid md:items-start md:gap-20 md:grid-cols-2 w-full justify-center items-center px-10 gap-6 max-w-7xl flex-wrap">
                    {restaurant?.tables.map((table, key) => <RestoTableCard table={table} key={key} />)}
                </div>}

            </div>
        </div>
    )
}
