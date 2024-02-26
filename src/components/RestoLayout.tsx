import { Outlet } from 'react-router-dom'
import Topbar from './Topbar'
import RestoNavbar from './RestoNavbar'

export default function RestoLayout() {
    return (
        <div>
            <Topbar />
            <RestoNavbar />
            <main className='w-full flex justify-center mb-24'>
                <Outlet />
            </main>
        </div>
    )
}
