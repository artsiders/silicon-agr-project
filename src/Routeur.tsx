import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Drinks from "./Pages/Drinks";
import Cart from "./Pages/Cart";
import Order from "./Pages/Order";
import Login from "./Pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import RestoDrinks from "./Pages/dashboard/RestoDrinks";
import RestoTables from "./Pages/dashboard/RestoTables";
import RestoAccount from "./Pages/dashboard/RestoAccount";
import RestoLayout from "./components/RestoLayout";
import DisableRouteWhenUserIsLog from "./components/DisableRouteWhenUserIsLog";
import Notfound from "./components/Notfound";
import RestoOrders from "./Pages/dashboard/RestoOrders";
import RestoFoods from "./Pages/dashboard/RestoFoods";
import Home from "./Pages/Home";
import Formations from "./Pages/Formations";
import MarketPlace from "./Pages/MarketPlace";

const Routeur = () => {

    return (
        <>
            <Routes>
                <Route element={<PrivateRoute />}>
                    <Route element={<RestoLayout />}>
                        <Route path="/restaurant/today" element={<RestoOrders />}></Route>
                        <Route path="/restaurant/foods" element={<RestoFoods />}></Route>
                        <Route path="/restaurant/drinks" element={<RestoDrinks />}></Route>
                        <Route path="/restaurant/tables" element={<RestoTables />}></Route>
                        <Route path="/restaurant/account" element={<RestoAccount />}></Route>
                    </Route>
                </Route>

                <Route element={<DisableRouteWhenUserIsLog />}>
                    <Route path="/login" element={<Login />} />
                </Route>

                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/formations" element={<Formations />} />
                    <Route path="/market-place" element={<MarketPlace />} />
                    <Route path="/drinks" element={<Drinks />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/order" element={<Order />} />

                    <Route path="*" element={<Notfound />} />
                </Route>
            </Routes>
        </>
    )
}

export default Routeur
