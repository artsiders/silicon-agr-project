import { Tools } from "../_interface";
import { useState } from "react";
import ModalScreen from "./ModalScreen";
import { BiChevronLeft } from "react-icons/bi";
import { BsCartPlus } from "react-icons/bs";

interface Props {
    product: Tools;
}
export default function ProductCard(props: Props) {
    const { product } = props
    const [visible, setVisible] = useState(false)

    return (
        <div className="w-[90vw] grid grid-cols-5 mb-5 text-left z-10 sm:w-60 shadow-card dark:shadow-none rounded-2xl bg-white dark:bg-tertiary">
            <div className="col-span-2 relative overflow-hidden bg-cover bg-no-repeat bg-light rounded-2xl">
                <img
                    className="rounded-2xl h-full"
                    src={product.image}
                    alt=""
                />
                <span onClick={() => setVisible(true)}>
                    <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-white/10 bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100">
                    </div>
                </span>
            </div>
            <div className="p-3 col-span-3">
                <h3 className="mb-2 font-bold leading-tight">
                    {product.title}
                </h3>
                <p className="mb-4 text-lg line-clamp-2">{product.price}</p>
                <div className="flex justify-between items-center">
                    <h5 className="font-medium leading-tight">
                        <a onClick={() => setVisible(true)} href="#" className="text-primary hover:underline">Voir plus →</a>
                    </h5>
                    <div className="flex justify-center">
                        <button className="btn-secondary text-primary">
                            <BsCartPlus />
                        </button>
                    </div>
                </div>
            </div>

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
                        {/* <ArticleDetail setVisible={setVisible} article={article} /> */}
                    </div>

                </div>
            </ModalScreen>}
        </div>
    )
}
