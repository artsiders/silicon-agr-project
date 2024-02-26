import { NavLink } from "react-router-dom";
import { Article } from "../_interface";

interface Props {
    article: Article;
}
export default function ArticleCard(props: Props) {
    const { article } = props

    return (
        <div
            className="w-[90vw] text-left z-10 sm:w-60 block shadow-card dark:shadow-none rounded-2xl bg-white dark:bg-tertiary">
            <div className="relative overflow-hidden bg-cover bg-no-repeat bg-light rounded-2xl">
                <img
                    className="rounded-2xl"
                    src={article.image}
                    alt=""
                />
                <NavLink to={`/food/${article._id}`}>
                    <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-white/10 bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100">
                    </div>
                </NavLink>
            </div>
            <div className="p-3">
                <h3 className="mb-2 font-bold leading-tight">
                    {article.title}
                </h3>
                <p className="mb-4 text-lg line-clamp-2">{article.description}</p>
                <div className="flex justify-between items-center">
                    <h5 className="font-medium leading-tight">
                        <a href="#" className="text-primary hover:underline">Voir plus →</a>
                    </h5>
                    {/* <div className="flex justify-center">
                        <button onClick={handleAddToCart} className="btn text-primary">
                            <BsCartPlus />
                        </button>
                    </div> */}
                </div>
            </div>
        </div>
    )
}
