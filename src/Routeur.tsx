import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import Notfound from "./components/Notfound";
import Home from "./Pages/Home";
import Formations from "./Pages/Formations";
import MarketPlace from "./Pages/MarketPlace";
import Layout from "./components/Layout";
import ScanQr from "./Pages/ScanQr";

const Routeur = () => {

    return (
        <>
            <Routes>
                <Route element={<PrivateRoute />}>

                </Route>

                <Route path="/login" element={<Login />} />

                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/formations" element={<Formations />} />
                    <Route path="/market-place" element={<MarketPlace />} />
                    <Route path="/scan" element={<ScanQr />} />

                    <Route path="*" element={<Notfound />} />
                </Route>
            </Routes>
        </>
    )
}

export default Routeur
