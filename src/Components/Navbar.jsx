import { Sun, Moon, Settings, User, LogOut, User2 } from "lucide-react";
import { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router";
import { ThemeContext } from "./Theme";
import { UserDataContext } from "./GlobalData";
import { getAuth, signOut } from "firebase/auth";
import { Firebase } from "./Firebase";
import { toast } from "react-toastify";

const Navbar = () => {

    const { theme, setTheme } = useContext(ThemeContext)
    const { user } = useContext(UserDataContext)
    const navigate = useNavigate()

    async function handleLogOut() {
        if (confirm("Do you want to log out ? ")) {
            const auth = getAuth(Firebase);
            await signOut(auth);
            toast.info("Logout Successful");
            navigate('/');
        }
    }

    return (
        <>
            <nav
                className={`flex flex-col md:flex-row md:items-center md:justify-between px-6 py-4 border-b ${theme === "dark" ? "bg-gray-900 border-gray-700 text-white" : "bg-white border-gray-200 text-gray-900"
                    }`}
            >
                {/* Left side: Logo */}
                <div className="flex items-center space-x-2 mb-3 md:mb-0">
                    <User2 className="w-8 h-8 text-indigo-600" />
                    <span className="font-bold text-xl select-none">Firebase Auth</span>
                </div>

                {/* Center: Nav links */}
                <ul className="flex flex-wrap items-center space-x-6 mb-3 md:mb-0">

                    <li>
                        <Link to='/user'
                            className={`hover:underline ${theme === "dark" ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-gray-900"
                                }`}
                        >
                            User
                        </Link>
                    </li>

                    <li className={`${user?.email === "admin123@gmail.com" ? "block" : "hidden"}`}>
                        {/* <li > */}
                        <Link to='/admin'
                            className={`hover:underline ${theme === "dark" ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-gray-900"
                                }`}
                        >
                            Admin
                        </Link>
                    </li>

                    {/* <li>
                        <Link to='/settings'
                            className={`hover:underline ${theme === "dark" ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-gray-900"
                                }`}
                        >
                            User Settings
                        </Link>
                    </li> */}
                </ul>

                {/* Right side: Theme toggle and user settings */}
                <div className="flex items-center space-x-4">
                    {/* Theme Toggle */}
                    <button
                        onClick={() => setTheme(theme === "dark" ? 'light' : 'dark')}
                        className={`p-2 rounded-md hover:bg-gray-200 ${theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-200"
                            }`}
                        aria-label="Toggle Theme"
                    >
                        {theme === "dark" ? (
                            <Sun className="w-6 h-6 text-yellow-400" />
                        ) : (
                            <Moon className="w-6 h-6 text-gray-800" />
                        )}
                    </button>

                    {/* User Settings - icon only */}
                    <button
                        aria-label="User Settings"
                        className={`p-2 rounded-md hover:bg-gray-200 ${theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-200"
                            }`}
                        onClick={handleLogOut}
                    >
                        <LogOut className={theme === "dark" ? "text-white w-6 h-6" : "text-gray-900 w-6 h-6"} />
                    </button>
                </div>
            </nav >

            <Outlet />
        </>
    );
};

export default Navbar;
