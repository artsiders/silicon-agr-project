import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Topbar from './Topbar'

export default function Layout() {
    return (
        <div>
            <Topbar />
            <Navbar />
            <main className='w-full flex justify-center mb-24'>
                <Outlet />
            </main>
        </div>
    )
}
