import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";


export default function PrivateRoute() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!true) {
            toast.warning("Vous n'êtes pas connecter !")
            navigate(`/login`)
        }
    }, [])
    return true ? <Outlet /> : null

}
