import { useContext, useState } from "react"
import { ThemeContext } from "./Theme"
import { Mail } from "lucide-react";
import { toast } from "react-toastify";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Firebase } from "./Firebase";
import { useNavigate } from "react-router";

export function ForgetPassword() {

    const { theme } = useContext(ThemeContext)
    const [email, setEmail] = useState('');
    const navigate = useNavigate()

    async function handleFormSubmit(e) {
        e.preventDefault();

        if (!email) {
            toast.error("Enter email");
            return;
        }

        try {
            const auth = getAuth(Firebase);
            await sendPasswordResetEmail(auth, email);
            toast.success("Reset email has been sent. Check your inbox.");
            // navigate('/');
        } catch (err) {
            toast.error("❌ " + err.message);
        }
    }

    return (
        <>
            <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#212121] text-white' : 'bg-gradient-to-br from-green-50 via-blue-50 to-purple-50'} text-[#212121] flex justify-center p-4 py-20`}>
                <div className="w-full max-w-md sm:max-w-lg md:max-w-md">
                    <h1 className="text-center mt-4 text-3xl">Forget Password</h1>

                    <form action="" className="mt-5" onSubmit={handleFormSubmit}>

                        {/* Email input */}
                        <div>
                            <label className="block text-sm sm:text-base font-medium mb-2">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={`w-full pl-10 pr-4 py-3 sm:py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${theme === 'dark' ? 'placeholder:text-gray-400' : 'placeholder:text-gray-600'}`}
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        {/* Submit button */}
                        <button
                            type="submit"
                            className={`w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 sm:py-4 px-4 rounded-lg hover:from-green-700 hover:to-blue-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 font-medium mt-5`}
                        >
                            Send Reset Email
                        </button>

                        {/* Back to Login button */}
                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="w-full mt-4 bg-gray-500 hover:bg-gray-600 text-white py-3 sm:py-4 px-4 rounded-lg transition-all duration-200 font-medium"
                        >
                            Back to Login
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}