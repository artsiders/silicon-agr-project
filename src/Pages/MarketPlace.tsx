// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import Footer from "../components/Footer";
import { useScrollTo } from "../components/useScrollTo";
import { tools } from '../articles';
import { Tools } from '../_interface';
import ProductCard from '../components/ProductCard';

export default function MarketPlace() {
    useScrollTo()

    return (
        <div className="text-center flex w-full flex-col justify-center items-center h-fit pt-72">

            <div
                className='sm:hidden flex h-64 w-full absolute items-center gap-5 capitalize top-0 !bg-no-repeat !bg-cover'
                style={{
                    background: `linear-gradient(
                        to bottom, 
                        rgb(0 0 0 / .6), rgb(0 0 0 / 0)
                    ), url(/images/agri-tools.jpg)`,
                }}
            ></div>
            {tools.map((product: Tools, key: number) => <ProductCard key={key} product={product} />)}


            <Footer />
        </div>
    )
};
