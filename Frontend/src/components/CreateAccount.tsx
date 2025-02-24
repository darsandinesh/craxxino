import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { IoIosInformationCircle } from "react-icons/io";
import userService from "../constraints/apiService";
import { Account } from "../interface/IAccount";
import { addAccount } from "../redux/slice";

function CreateAccount() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [emailError, setEmailError] = useState('');
    const [mobileError, setMobileError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validateEmail = (email: string) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!email) {
            return "Email is required";
        }
        if (!emailPattern.test(email)) {
            return "Invalid email address.";
        }
        return "";
    };

    const validateMobile = (mobile: string) => {
        if (!mobile) {
            return "Mobile number is required";
        }
        if (!/^\d{10}$/.test(mobile)) {
            return "Mobile number must be 10 digits";
        }
        return "";
    };

    const validatePassword = (password: string) => {
        if (!password) {
            return "Password is required";
        }
        if (!/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password)) {
            return "Password must be alphanumeric, min 6 characters, with at least one uppercase and one number";
        }
        return "";
    };

    const validateConfirmPassword = (password: string, confirmPassword: string) => {
        if (!confirmPassword) {
            return "Confirm Password is required";
        }
        if (password !== confirmPassword) {
            return "Passwords do not match";
        }
        return "";
    };

    const handleSubmit = async () => {
        const emailError = validateEmail(email);
        const mobileError = validateMobile(mobile);
        const passwordError = validatePassword(password);
        const confirmPasswordError = validateConfirmPassword(password, confirmPassword);

        setEmailError(emailError);
        setMobileError(mobileError);
        setPasswordError(passwordError);
        setConfirmPasswordError(confirmPasswordError);

        if (emailError || mobileError || passwordError || confirmPasswordError) {
            return;
        }

        let data: Account = {
            email, mobile, password
        };
        try {
            setSubmit(true);
            console.log('handleSubmit clicked');
            const result = await userService.createAccount(data);
            console.log(result);
            if (result?.data.success) {
                toast.success(result.data.message);
                dispatch(addAccount(result.data.user))
                navigate('/information');
            } else {
                setSubmit(false);
                toast.error(result?.data.message);
            }
        } catch (error) {
            setSubmit(false);
            toast.error('Internal server Error')
        }
    };

    return (
        <div className='flex justify-center p-6'>
            <div className='max-w-md'>
                <div className='flex flex-col justify-center items-center mb-4'>
                    <h1 className='text-3xl font-bold mb-4'>Create your account</h1>
                    <h4 className='text-sm text-gray-400'>Set-up your RentlyPass in as little as 2 minutes.</h4>
                </div>
                <div className='flex justify-start flex-col gap-5 mb-5 '>
                    <h2 className='text-lg text-gray-400 font-bold'>Contact details</h2>
                    <div className="relative w-full">
                        <input onChange={(e) => setEmail(e.target.value)} className='w-full p-3 border border-gray-500 rounded-md ' type="email" placeholder='Email Address' />
                        {emailError && <span className="text-red-500 text-sm">{emailError}</span>}
                        {email && <label htmlFor="" className="absolute left-3 -top-1/3 bg-white text-sm text-blue-400 p-2">Email Address</label>}
                    </div>

                    <div className="relative w-full">
                        <input onChange={(e) => setMobile(e.target.value)} className='w-full p-3 border border-gray-500 rounded-md' type="number" placeholder='Mobile Number' />
                        <IoIosInformationCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer" />
                        {mobileError && <span className="text-red-500 text-sm">{mobileError}</span>}
                        {mobile && <label htmlFor="" className="absolute left-3 -top-1/3 bg-white text-sm text-blue-400 p-2">Mobile Number</label>}
                    </div>
                </div>
                <div className='flex justify-start flex-col gap-5 mb-5'>
                    <h2 className='text-lg text-gray-400 font-bold'>Set a password</h2>
                    <div className="relative w-full">
                        <input onChange={(e) => setPassword(e.target.value)} className='w-full p-3 border border-gray-500 rounded-md' type={`${showPassword ? 'text' : 'password'}`} placeholder='Create a password' />
                        {passwordError && <span className="text-red-500 text-sm">{passwordError}</span>}
                        {password && <label htmlFor="" className="absolute left-3 -top-1/3 bg-white text-sm text-blue-400 p-2">Password</label>}
                        {showPassword
                            ? <FaRegEye onClick={() => setShowPassword(false)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer" />
                            : <FaRegEyeSlash onClick={() => setShowPassword(true)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer" />
                        }
                    </div>
                    <div className="relative w-full">
                        <input onChange={(e) => setConfirmPassword(e.target.value)} className='w-full p-3 border border-gray-500 rounded-md' type={`${showConfirmPassword ? 'text' : 'password'}`} placeholder='Confirm your password' />
                        {confirmPasswordError && <span className="text-red-500 text-sm">{confirmPasswordError}</span>}
                        {confirmPassword && <label htmlFor="" className="absolute left-3 -top-1/3 bg-white text-sm text-blue-400 p-2">Confirm Password</label>}
                        {showConfirmPassword
                            ? <FaRegEye onClick={() => setShowConfirmPassword(false)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer" />
                            : <FaRegEyeSlash onClick={() => setShowConfirmPassword(true)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer" />
                        }
                    </div>
                </div>
                <div className="flex gap-1">
                    <IoIosInformationCircle size={23} className="text-gray-600" />
                    <p className='mb-5 text-gray-400 text-sm'>
                        We need a password to keep information safe. But don't
                        worry, we'll also send your custom RentlyPass URL via email.
                    </p>
                </div>
                <button onClick={handleSubmit} className={`w-full bg-blue-500 rounded-md text-white p-2 hover:bg-blue-600 ${submit ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={submit}>Create your account</button>
                <p className="text-gray-400 text-sm p-2 space-x-1">By Clicking 'Create your account', you are agreeing to our <span className="underline cursor-pointer">Terms & Conditions</span> and <span className="underline cursor-pointer">Privacy Policy</span></p>
            </div>
        </div>
    )
}

export default CreateAccount;