import { useContext, useEffect, useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Building, Sun, Moon, Github, Chrome, ChromeIcon, AlignStartHorizontal } from 'lucide-react';
import { ThemeContext } from './Theme';
import { NavLink, useNavigate } from 'react-router';
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, GithubAuthProvider } from 'firebase/auth';
import { Firebase } from './Firebase';
import { toast } from 'react-toastify';

export const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { theme, setTheme } = useContext(ThemeContext)
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
    }, [])

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        // rememberMe: false
    });

    const [error, setError] = useState({
        email: '',
        password: '',
    });

    const [check, setCheck] = useState({
        email: false,
        password: false,
        // rememberMe: false
    });

    const [disabled, setDisabled] = useState({
        google: false,
        github: false,
        signInButton: false
    })

    const navigate = useNavigate()

    // handle form change
    function handleChange(e) {
        const { name, value } = e.target

        setFormData((prev) => ({ ...prev, [name]: value }));

        // email validation
        if (name == 'email') {
            const emailRegex = /^[a-zA-Z0-9+-._]+@[a-zA-Z0-9+-]+\.[a-zA-Z]{1,}$/;
            if (value.trim() == '') {
                setError((prev) => ({ ...prev, email: "Enter your Email" }));
                setCheck((prev) => ({ ...prev, email: false }));
            }
            else if (!emailRegex.test(value.trim())) {
                setError((prev) => ({ ...prev, email: "Invalid Email" }));
                setCheck((prev) => ({ ...prev, email: false }));
            }
            else {
                setError((prev) => ({ ...prev, email: "" }));
                setCheck((prev) => ({ ...prev, email: true }));
            }
        }

        // password validation
        if (name == 'password') {
            if (value.trim() == '') {
                setError((prev) => ({ ...prev, password: 'Enter your password' }));
                setCheck((prev) => ({ ...prev, password: false }));
            }
            else if (String(value.length) < 6) {
                setError((prev) => ({
                    ...prev, password: 'Password must be of atleast 6 digits'
                }));
                setCheck((prev) => ({ ...prev, password: false }));
            }
            else {
                setError((prev) => ({ ...prev, password: '' }));
                setCheck((prev) => ({ ...prev, password: true }));
            }
        }
    }

    // Google Sign Up
    function handleGoogleSignUp() {
        setLoading(true);
        setDisabled((prev => ({ ...prev, google: true })));
        const auth = getAuth(Firebase);
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then(() => {
                toast.success("Login Successful")
                navigate('/user');
                setLoading(false);
            }).catch((error) => {
                if (error.code == "auth/cancelled-popup-request") {
                    toast.error("Process canceled by user")
                    setLoading(false);
                }
                else {
                    toast.error(error.code);
                    setLoading(true)
                }
            }).finally(() => {
                setLoading(false);
                setDisabled((prev => ({ ...prev, google: false })));
            })
    }

    // Github Sign up
    function handleGithubSignUp() {
        const auth = getAuth(Firebase);
        const provider = new GithubAuthProvider();
        setLoading(true);
        setDisabled((prev => ({ ...prev, github: true })));
        signInWithPopup(auth, provider)
            .then(async () => {
                toast.success("Login Successful")
                navigate('/user');
            }).catch(async (error) => {
                if (error.code == "auth/cancelled-popup-request") {
                    setLoading(false);
                }
                else if (error.code == "auth/account-exists-with-different-credential") {
                    toast.error(
                        "An account already exists with a different sign-in method. Please log in with the original provider."
                    );
                    setLoading(false);
                }
                console.log(error);
                // else {
                //     alert('Something went wrong', error.message);
                //     setLoading(false);
                // }
            }).finally(() => {
                setLoading(false);
                setDisabled((prev => ({ ...prev, github: false })));
            })
    }

    // handle form submit
    function handleFormSubmit(e) {
        e.preventDefault();
        const isValid = Object.entries(check).every(v => v != true);
        if (!isValid) {
            Object.entries(check).map(v => {
                if (v[1] == false) {
                    setError((prev) => ({ ...prev, [v[0]]: `Enter ${v[0]}` }))
                }
            })
            return;
        }
        else {
            setLoading(true);
            setDisabled(prev => ({ ...prev, signInButton: true }));
            const auth = getAuth(Firebase);
            signInWithEmailAndPassword(auth, formData.email, formData.password)
                .then(() => {
                    toast.success("Login Successful");
                    setFormData({ email: '', password: '' });
                    navigate('/user');
                })
                .catch((error) => {
                    if (error.code == 'auth/user-not-found') {
                        toast.error("User not found. Register yourself");
                    }
                    else if (error.code == 'auth/wrong-password') {
                        toast.error("Password is wrong");
                    }
                })
                .finally(() => {
                    setLoading(false);
                    setDisabled(prev => ({ ...prev, signInButton: false }));
                })
        }
    }

    function handleAutoFill() {
        setFormData({ email: 'admin123@gmail.com', password: 'admin2', });
        setCheck({ email: true, password: true, });
        setError({ email: '', password: '', });
    }

    function handleResetButton() {
        setFormData({ email: '', password: '', });
        setCheck({ email: false, password: false, });
        setError({ email: '', password: '', });
    }

    return (
        <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#212121] text-white' : 'bg-gradient-to-br from-green-50 via-blue-50 to-purple-50'} text-[#212121] flex items-center justify-center p-4`}>
            <div className="w-full max-w-md sm:max-w-lg md:max-w-md lg:max-w-lg xl:max-w-xl">
                <div className="rounded-2xl shadow-xl p-6 sm:p-8 border w-full">
                    <div className="text-center mb-8 relative">
                        <h1 className="text-xl sm:text-2xl font-bold">Welcome Back</h1>

                        {/* theme toggle */}
                        <div onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className='absolute top-1 right-1 sm:top-2 sm:right-2 cursor-pointer'>
                            {theme === 'dark' ? <Sun /> : <Moon />}
                        </div>
                    </div>

                    {/* Demo Credentials Box */}
                    <div className={`mb-6 p-3 sm:p-4 rounded-lg border-2 border-dashed ${theme === 'dark' ? 'border-gray-600 bg-gray-800/50' : 'border-gray-300 bg-gray-50'}`}>
                        <div className="text-center mb-2 sm:mb-3">
                            <h3 className={`text-xs sm:text-sm font-semibold ${theme === 'dark' ? 'text-yellow-400' : 'text-orange-600'} flex items-center justify-center`}>
                                <AlignStartHorizontal className="w-4 h-4 mr-2" />
                                Demo Credentials
                            </h3>
                        </div>
                        <div className="space-y-2 sm:space-y-3">
                            <div className={`p-2 sm:p-3 rounded-md ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-white'} border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'}`}>

                                <div className="flex items-center justify-between mb-1 sm:mb-2">
                                    <span className={`text-xs sm:text-sm font-medium ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                                        👑 Admin Access
                                    </span>
                                    <button onClick={handleAutoFill} className={`px-2 py-1 rounded-md ${theme === 'dark' ? 'bg-blue-400 ' : 'text-blue-600'}`}>Click to fill</button>
                                </div>

                                <div className={`text-xs sm:text-sm mt-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                                    <div className="flex justify-between">
                                        <span>Email:</span>
                                        <span className="font-mono">admin123@gmail.com</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Password:</span>
                                        <span className="font-mono">admin2</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Social sign in buttons */}
                    <div className='flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-3 items-center w-full mb-8 px-4'>

                        <button
                            onClick={handleGoogleSignUp}
                            disabled={loading}
                            className={`w-full sm:w-auto whitespace-nowrap group relative flex justify-center items-center py-3 px-4 border border-transparent rounded-lg text-sm sm:text-base font-medium transition-all duration-200 text-white ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-[#4285F4] to-[#357ae8]'}`}
                        >
                            {disabled.google ? (
                                <div className='flex items-center space-x-2'>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    <div>Creating account...</div>
                                </div>
                            ) : (
                                <div className='flex items-center space-x-2'>
                                    <ChromeIcon className="w-5 h-5 sm:w-6 sm:h-6 mr-3" />
                                    <div>Sign up with Google</div>
                                </div>
                            )}
                        </button>

                        <button
                            onClick={handleGithubSignUp}
                            disabled={loading}
                            className={`w-full sm:w-auto whitespace-nowrap group relative flex justify-center items-center py-3 px-4 border border-transparent rounded-lg text-sm sm:text-base font-medium transition-all duration-200 bg-gradient-to-r from-gray-800 to-black text-white ${loading ? 'cursor-not-allowed opacity-70' : ''}`}
                        >
                            {disabled.github ? (
                                <div className='flex items-center space-x-2'>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    <div>Signing in...</div>
                                </div>
                            ) : (
                                <div className='flex items-center space-x-2'>
                                    <Github className="w-5 h-5 sm:w-6 sm:h-6 mr-3" />
                                    <div>Sign in with GitHub</div>
                                </div>
                            )}
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="relative mt-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className={`w-full border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}></div>
                        </div>
                        <div className="relative flex justify-center text-sm sm:text-base">
                            <span className={`px-2 ${theme === 'dark' ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500'}`}>
                                Or login with email
                            </span>
                        </div>
                    </div>

                    {/* Email/password form */}
                    <form className="space-y-6 mt-6 sm:mt-8" onSubmit={handleFormSubmit}>

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
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full pl-10 pr-4 py-3 sm:py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${theme === 'dark' ? 'placeholder:text-gray-400' : 'placeholder:text-gray-600'}`}
                                    placeholder="Enter your email"
                                />
                            </div>
                            <span className="text-red-500 text-xs sm:text-sm">{error.email}</span>
                        </div>

                        {/* Password input */}
                        <div>
                            <label className="block text-sm sm:text-base font-medium mb-2">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`w-full pl-10 pr-12 py-3 sm:py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${theme === 'dark' ? 'placeholder:text-gray-400' : 'placeholder:text-gray-600'}`}
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                    )}
                                </button>
                            </div>
                            <span className="text-red-500 text-xs sm:text-sm">{error.password}</span>
                        </div>

                        <div className='flex items-center space-x-6'>

                            {/* Reset button */}
                            <button
                                type="reset"
                                disabled={loading}
                                onClick={handleResetButton}
                                className={`w-full border text-md border-green-600  py-3 sm:py-4 px-4 rounded-lg focus:ring-1 focus:ring-blue-100 transition-all duration-200 font-medium ${loading ? 'opacity-50 pointer-events-none' : ''}`}
                            >
                                {disabled.signInButton ? (
                                    <div className='flex items-center justify-center space-x-2'>
                                        <div className='animate-spin text-white border-l-2 py-3 px-3 rounded-full'></div>
                                        <div>Reset</div>
                                    </div>
                                ) : (
                                    'Reset'
                                )}
                            </button>

                            {/* Submit button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 sm:py-4 px-4 rounded-lg hover:from-green-700 hover:to-blue-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 font-medium ${loading ? 'opacity-50 pointer-events-none' : ''}`}
                            >
                                {disabled.signInButton ? (
                                    <div className='flex items-center justify-center space-x-2'>
                                        <div className='animate-spin text-white border-l-2 py-3 px-3 rounded-full'></div>
                                        <div>Sign In</div>
                                    </div>
                                ) : (
                                    'Sign In'
                                )}
                            </button>
                        </div>
                    </form>

                    <div className='flex justify-between'>
                        {/* Register link */}
                        <div className="mt-8 text-center text-sm sm:text-base">
                            <p>
                                Don't have an account?{' '}
                                <NavLink to="/register" className="text-green-600 hover:text-green-500 font-medium">
                                    Sign up
                                </NavLink>
                            </p>
                        </div>

                        <div className="mt-8 text-center text-sm sm:text-base cursor-pointer">
                            <p>
                                {/* Forget Password ?{' '} */}
                                <NavLink to="/forgetPassword" className="text-green-600 hover:text-green-500 font-medium">
                                    Forget Password
                                </NavLink>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};