import { useContext } from "react";
import { ThemeContext } from "./Theme";
import { UserDataContext } from "./GlobalData";

export const HomePage = () => {
    const { theme } = useContext(ThemeContext);
    const { user } = useContext(UserDataContext)

    return (
        <div className={`min-h-screen bg-amber-200 py-5 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
            }`}>
            <div
                className={`max-w-4xl text-center mx-auto p-6 rounded-lg border shadow-md ${theme === "dark" ? "bg-gray-900 text-white" : "bg-[#EFF8FC] text-gray-900"
                    }`}
            >
                <h1 className="text-4xl font-bold mb-4 select-none">Welcome to Firebase Auth Project</h1>

                <h3>User Dashboard</h3>

                <div className="max-w-lg mx-auto text-center p-6  rounded-xl shadow-lg">

                    {/* Profile Photo */}
                    {user.photoURL
                        ? <img
                            src={user?.photoURL?.trim()}
                            alt="Profile"
                            className="w-24 h-24 mx-auto rounded-full border-4 border-blue-500 shadow-md"
                        />
                        : ''
                    }

                    {/* User Info */}
                    <h2 className="text-2xl font-semibold mt-4">
                        {user?.displayName || "No Name Set"}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">{user?.email}</p>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
