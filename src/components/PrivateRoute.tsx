import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";


export default function PrivateRoute() {
    const navigate = useNavigate();
    const session = useSelector((state: RootState) => state.session)

    useEffect(() => {
        if (!session.connected) {
            toast.warning("Vous n'êtes pas connecter !")
            navigate(`/login`)
        }
    }, [])
    return session.connected ? <Outlet /> : null

}
