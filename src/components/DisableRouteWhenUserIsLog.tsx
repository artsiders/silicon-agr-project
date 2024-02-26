import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

export default function DisableRouteWhenUserIsLog() {
    const navigate = useNavigate();
    const session = useSelector((state: RootState) => state.session)

    useEffect(() => {
        if (session?.connected) {
            toast.warning("Vous êtes déjà connecter !")
            navigate(`/restaurant/foods`)
        }
    }, [])
    return <Outlet />
}
