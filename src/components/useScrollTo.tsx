import { useEffect } from "react"
export const useScrollTo = (x: number = 0, y: number = 0) => {
    useEffect(() => {
        window.scrollTo(x, y)
    }, [])
}