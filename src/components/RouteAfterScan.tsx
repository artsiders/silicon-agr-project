import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";


export default function RouteAfterScan() {
    const navigate = useNavigate();
    const userSession = useSelector((state: RootState) => state.userSession)

    useEffect(() => {
        if (!userSession.scanned) {
            toast.warning("Vous devez scanner le QR code sur la table du restaurant !")
            navigate(`/`)
        }
    }, [])
    return userSession.scanned ? <Outlet /> : null

}
