import { useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../constraints/apiService";
import { FinancailInformation } from "../interface/IAccount";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { addFinancialInfo, removeData } from "../redux/slice";

function FinancialInfo() {
    const navigate = useNavigate();
    const [employmentStatus, setEmploymentStatus] = useState("");
    const [savings, setSavings] = useState("");
    const [errors, setErrors] = useState({ employmentStatus: "", savings: "" });
    const [showModal, setShowModal] = useState(false);
    const [url, setUrl] = useState("");

    const userId = useSelector((state: RootState) => state.user._id || '');
    const dispatch = useDispatch();

    const validate = () => {
        let valid = true;
        let errors = { employmentStatus: "", savings: "" };

        if (!employmentStatus) {
            errors.employmentStatus = "Employment status is required.";
            valid = false;
        }

        if (!savings) {
            errors.savings = "Additional savings/investments are required.";
            valid = false;
        }

        setErrors(errors);
        return valid;
    };

    const handleSubmit = async () => {
        if (validate()) {
            try {
                const data: FinancailInformation = {
                    id: userId,
                    employmentStatus,
                    savings
                }
                const result = await userService.addFinancialInformation(data)
                if (result?.data.success) {
                    toast.success(result.data.message);
                    dispatch(addFinancialInfo(result.data.data));
                    setUrl(result.data.data.url);
                    setShowModal(true);
                } else {
                    toast.error(result?.data.message);
                }
            } catch (error) {
                toast.error("An error occurred while saving the data.");
            }
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(url);
        toast.success("URL copied to clipboard!");
    };

    const handelModal = () => {
        dispatch(removeData());
        navigate('/');
        setShowModal(false)
    }
    return (
        <div className='flex justify-center p-6'>
            <div className='max-w-lg'>
                <div className='flex justify-center gap-x-6 mb-4'>
                    <div className='rounded-full w-8 h-8 bg-gray-500 text-white pl-3 pt-1'>1</div>
                    <div className='rounded-full w-8 h-8 bg-blue-500 text-white pl-3 pt-1'>2</div>
                </div>
                <div className='flex flex-col justify-center items-center mb-3'>
                    <h1 className='text-3xl font-bold mb-4'>Financial information</h1>
                    <h4 className='text-sm text-gray-500'>All your information is stored securely.</h4>
                </div>
                <div className='flex justify-start flex-col mb-2'>
                    <div className='flex flex-col gap-2 w-full mb-3'>
                        <select
                            className='w-full p-3 border border-gray-400 rounded-md'
                            value={employmentStatus}
                            onChange={(e) => setEmploymentStatus(e.target.value)}
                        >
                            <option value="" disabled>
                                What is your current employment status?
                            </option>
                            <option value="employed">Employed</option>
                            <option value="unemployed">Unemployed</option>
                            <option value="student">Student</option>
                            <option value="retired">Retired</option>
                        </select>
                        {errors.employmentStatus && (
                            <span className="text-red-500 text-sm">{errors.employmentStatus}</span>
                        )}
                    </div>
                    <div className='flex flex-col gap-2 relative mb-3'>
                        <input
                            className='w-full p-4 border border-gray-400 rounded-md '
                            type="text"
                            placeholder='Additional savings/investments'
                            value={savings}
                            onChange={(e) => setSavings(e.target.value)}
                        />
                        {errors.savings && (
                            <span className="text-red-500 text-sm">{errors.savings}</span>
                        )}
                    </div>
                    <button
                        className='w-full bg-blue-500 rounded-md text-white p-3 hover:bg-blue-600'
                        onClick={handleSubmit}
                    >
                        Save and continue
                    </button>
                </div>
            </div>
            {showModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-md w-1/3">
                        <h2 className="text-xl font-bold mb-4">Data Saved Successfully</h2>
                        <p className="mb-4">Here is your URL:</p>
                        <div className="flex items-center mb-4">
                            <input
                                className="w-full p-2 border border-gray-400 rounded-md"
                                type="text"
                                value={url}
                                readOnly
                            />
                            <button
                                className="ml-2 bg-blue-500 text-white p-2 rounded-md"
                                onClick={copyToClipboard}
                            >
                                Copy
                            </button>
                        </div>
                        <button
                            className="w-full bg-red-500 text-white p-2 rounded-md"
                            onClick={handelModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FinancialInfo;
