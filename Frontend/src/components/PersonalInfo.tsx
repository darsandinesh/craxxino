import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosInformationCircle } from "react-icons/io";
import { PersonalInformation } from "../interface/IAccount";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import userService from "../constraints/apiService";
import { toast } from "react-toastify";
import { addPersonalInfo } from "../redux/slice";

function PersonalInfo() {
    const [title, setTitle] = useState('');
    const [fullName, setFullName] = useState('');
    const [dob, setDob] = useState('');
    const [address, setAddress] = useState('');
    const [duration, setDuration] = useState('');
    const [about, setAbout] = useState('');
    const [submit, setSubmit] = useState(false);

    const [titleError, setTitleError] = useState('');
    const [fullNameError, setFullNameError] = useState('');
    const [dobError, setDobError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [durationError, setDurationError] = useState('');
    const [aboutError, setAboutError] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userId = useSelector((state: RootState) => state.user._id || '')

    const validateTitle = (title: string) => {
        if (!title) {
            return "Title is required";
        }
        return "";
    };

    const validateFullName = (fullName: string) => {
        if (!fullName) {
            return "Full Name is required";
        }
        return "";
    };

    const validateDob = (dob: string) => {
        if (!dob) {
            return "Date of Birth is required";
        }
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();

        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        if (age < 18) {
            return "You must be at least 18 years old to create an account"
        }
        return "";
    };

    const validateAddress = (address: string) => {
        if (!address) {
            return "Current address is required";
        }
        return "";
    };

    const validateDuration = (duration: string) => {
        if (!duration) {
            return "Duration is required";
        }
        return "";
    };

    const validateAbout = (about: string) => {
        if (!about) {
            return "This field is required";
        }
        return "";
    };

    const handleSubmit = async () => {
        const titleError = validateTitle(title);
        const fullNameError = validateFullName(fullName);
        const dobError = validateDob(dob);
        const addressError = validateAddress(address);
        const durationError = validateDuration(duration);
        const aboutError = validateAbout(about);

        setTitleError(titleError);
        setFullNameError(fullNameError);
        setDobError(dobError);
        setAddressError(addressError);
        setDurationError(durationError);
        setAboutError(aboutError);

        if (titleError || fullNameError || dobError || addressError || durationError || aboutError) {
            return;
        }
        try {
            const data: PersonalInformation = {
                id: userId,
                title,
                fullName,
                dob,
                address,
                duration,
                about
            }

            setSubmit(true);
            const result = await userService.addPersonalInformation(data);
            if (result?.data.success) {
                toast.success(result.data.message);
                dispatch(addPersonalInfo(result.data.data));
                navigate('/financial');
            } else {
                setSubmit(false);
                toast.error(result?.data.message);
            }
        } catch (error) {

        }
    };

    return (
        <div className='flex justify-center p-6'>
            <div className='max-w-md'>
                <div className='flex justify-center gap-x-6 mb-4'>
                    <div className='rounded-full w-8 h-8 bg-blue-500 text-white pl-3 pt-1'>1</div>
                    <div className='rounded-full w-8 h-8 bg-gray-400 text-white pl-3 pt-1'>2</div>
                </div>
                <div className='flex flex-col justify-center items-center mb-3'>
                    <h1 className='text-3xl font-bold mb-4'>Personal information</h1>
                    <h4 className='text-sm text-gray-500'>Please answer question as accurately as possible.</h4>
                </div>
                <div className='flex justify-start flex-col mb-2'>
                    <div className='flex gap-2 w-full mb-3'>
                        <select onChange={(e) => setTitle(e.target.value)} className='w-1/4 p-3 border border-gray-400 rounded-md'>
                            <option value="Mr">Mr</option>
                            <option value="Mrs">Mrs</option>
                        </select>
                        {titleError && <span className="text-red-500 text-sm">{titleError}</span>}
                        <input onChange={(e) => setFullName(e.target.value)} className='w-full p-3 border border-gray-400 rounded-md' type="text" placeholder='Full Name as per your passport' />
                        {fullNameError && <span className="text-red-500 text-sm">{fullNameError}</span>}
                    </div>
                    <div className='relative mb-3'>
                        <input onChange={(e) => setDob(e.target.value)} className='w-full p-3 border border-gray-400 rounded-md text-gray-500' type="date" placeholder='Date of birth' />
                        {dobError && <span className="text-red-500 text-sm">{dobError}</span>}
                    </div>
                    <div className='mb-3'>
                        <input onChange={(e) => setAddress(e.target.value)} className='w-full p-3 border border-gray-400 rounded-md' type="text" placeholder='Current address' />
                        {addressError && <span className="text-red-500 text-sm">{addressError}</span>}
                    </div>
                    <div className='mb-3'>
                        <input onChange={(e) => setDuration(e.target.value)} className='w-full p-3 border border-gray-400 rounded-md' type="text" placeholder='How long have you lived at this address?' />
                        {durationError && <span className="text-red-500 text-sm">{durationError}</span>}
                    </div>
                    <div className='mb-3'>
                        <textarea onChange={(e) => setAbout(e.target.value)} className='w-full p-3 border border-gray-400 rounded-md' rows={3} placeholder='Tell us a bit about yourself (What are you like a person, do you have any hobbies, etc.)'></textarea>
                        {aboutError && <span className="text-red-500 text-sm">{aboutError}</span>}
                    </div>
                    <div className="flex gap-1">
                        <IoIosInformationCircle size={24} className="text-gray-600" />
                        <p className='mb-5 text-gray-400 text-lg'>
                            All information can be edited once you have created your account
                        </p>
                    </div>
                    <button onClick={handleSubmit} disabled={submit} className='w-full bg-blue-500 rounded-md text-white p-3 hover:bg-blue-600'>
                        {submit ? 'Submitting...' : 'Create your account'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PersonalInfo;