import React, { useState, useContext } from "react";
import { ThemeContext } from "./Theme";

const UserSettingsPage = () => {
    const { theme } = useContext(ThemeContext);
    const [username, setUsername] = useState("currentUsername");
    const [email, setEmail] = useState("user@example.com");
    const [password, setPassword] = useState("");
    const [imagePreview, setImagePreview] = useState(null);

    // Handle image file selection and preview
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) setImagePreview(URL.createObjectURL(file));
        else setImagePreview(null);
    };

    return (
        <div
            className={`max-w-md mx-auto mt-10 p-6 rounded-lg shadow-md ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
                }`}
        >
            <h2 className="text-2xl font-semibold mb-6 select-none">User Settings</h2>

            <form className="space-y-5">
                {/* Username */}
                <div>
                    <label htmlFor="username" className="block mb-1 font-medium">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter new username"
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none ${theme === "dark"
                            ? "bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:border-indigo-500"
                            : "bg-gray-100 border-gray-300 placeholder-gray-600 text-gray-900 focus:border-indigo-600"
                            }`}
                    />
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="email" className="block mb-1 font-medium">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter new email"
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none ${theme === "dark"
                            ? "bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:border-indigo-500"
                            : "bg-gray-100 border-gray-300 placeholder-gray-600 text-gray-900 focus:border-indigo-600"
                            }`}
                    />
                </div>

                {/* Password */}
                <div>
                    <label htmlFor="password" className="block mb-1 font-medium">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter new password"
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none ${theme === "dark"
                            ? "bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:border-indigo-500"
                            : "bg-gray-100 border-gray-300 placeholder-gray-600 text-gray-900 focus:border-indigo-600"
                            }`}
                    />
                </div>

                {/* Profile Image Upload */}
                <div>
                    <label className="block mb-1 font-medium">Profile Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className={`w-full ${theme === "dark" ? "text-gray-300" : "text-gray-700"
                            }`}
                    />
                    {imagePreview && (
                        <img
                            src={imagePreview}
                            alt="Profile Preview"
                            className="mt-3 h-24 w-24 object-cover rounded-full border"
                        />
                    )}
                </div>

                {/* Save Changes Button */}
                <button
                    type="submit"
                    className={`w-full py-2 rounded-md text-white font-semibold transition-colors ${theme === "dark"
                        ? "bg-indigo-600 hover:bg-indigo-700"
                        : "bg-indigo-500 hover:bg-indigo-600"
                        }`}
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default UserSettingsPage;
