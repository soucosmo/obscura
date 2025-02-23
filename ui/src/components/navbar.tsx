import { useObscuraStore } from "../utils/obscura-store"
import { useAuthStore } from "../utils/auth-store"
import { Camera } from "lucide-react"

export const Navbar = () => {
    const auth = useAuthStore()
    const { navigateToConfigMaps } = useObscuraStore()

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h8m-8 6h16" />
                    </svg>
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                    {/*<li><a onClick={navigateToConfigMaps}>ConfigMaps</a></li>*/}
                </ul>
                </div>
                <div className="flex items-center gap-2 cursor-pointer" onClick={navigateToConfigMaps}>
                    <Camera size={40} /> <span className="text-2xl font-bold">Obscura</span>
                </div>
            </div>
            {/*<div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><a onClick={navigateToConfigMaps}>ConfigMaps</a></li>
                </ul>
            </div>*/}
            <div className="navbar-end">
                <a className="text-red-500 cursor-pointer" onClick={auth.logout}>Disconnect</a>
            </div>
        </div>
    )
}