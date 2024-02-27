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
                className='flex h-64 md:h-96 w-full absolute items-center justify-center gap-5 capitalize top-0 !bg-no-repeat !bg-cover'
                style={{
                    background: `linear-gradient(
                        to bottom, 
                        rgb(0 0 0 / .6), rgb(0 0 0 / 0)
                    ), url(/images/agri-tools.jpg)`,
                }}
            >
                <p className="text-xl text-white font-bold tracking-widest">Services & produits</p>
            </div>
            <div className='flex flex-col md:grid md:grid-cols-2 md:gap-4'>
                {tools.map((product: Tools, key: number) => <ProductCard key={key} product={product} />)}
            </div>


            <Footer />
        </div>
    )
};
