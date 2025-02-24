import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import userService from '../constraints/apiService';

interface FinancialInfo {
    employmentStatus: string;
    savings: string;
    createdAt: string;
    updatedAt: string;
}

interface PersonalInfo {
    title: string;
    fullName: string;
    dob: string;
    address: string;
    duration: string;
    about: string;
}

interface UserInfo {
    _id: string;
    email: string;
    mobile: string;
    password: string;
    createdAt: string;
    updatedAt: string;
    financialInfo: FinancialInfo;
    personalInfo: PersonalInfo;
}

function Home() {
    const { id } = useParams<{ id: string }>();
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const result = await userService.getUserById(id);
                if (result?.data.success) {
                    setUserInfo(result.data.data);
                } else {
                    console.error(result?.data.message);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [id]);

    if (!userInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex justify-center items-center p-5 ">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
                <h1 className="text-4xl font-bold mb-6 text-center text-blue-600 underline">User Information</h1>
                <div className="text-center mb-6">
                    <div className="mb-2">
                        <strong className="text-gray-700">Email:</strong>
                        <span className="text-gray-900 ml-2">{userInfo.email}</span>
                    </div>
                    <div className="mb-2">
                        <strong className="text-gray-700">Mobile:</strong>
                        <span className="text-gray-900 ml-2">{userInfo.mobile}</span>
                    </div>
                    <div className="mb-2">
                        <strong className="text-gray-700">Created At:</strong>
                        <span className="text-gray-900 ml-2">{new Date(userInfo.createdAt).toLocaleDateString('en-GB')}</span>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h2 className="text-3xl font-bold mt-8 mb-4 text-blue-600 underline">Personal Information</h2>
                        <div className="mb-2">
                            <strong className="text-gray-700">Full Name:</strong>
                            <span className="text-gray-900 ml-2">{userInfo.personalInfo.title}. {userInfo.personalInfo.fullName}</span>
                        </div>
                        <div className="mb-2">
                            <strong className="text-gray-700">Date of Birth:</strong>
                            <span className="text-gray-900 ml-2">{new Date(userInfo.personalInfo.dob).toLocaleDateString('en-GB')}</span>
                        </div>
                        <div className="mb-2">
                            <strong className="text-gray-700">Address:</strong>
                            <span className="text-gray-900 ml-2">{userInfo.personalInfo.address}</span>
                        </div>
                        <div className="mb-2">
                            <strong className="text-gray-700">Duration:</strong>
                            <span className="text-gray-900 ml-2">{userInfo.personalInfo.duration}</span>
                        </div>
                        <div className="mb-2">
                            <strong className="text-gray-700">About:</strong>
                            <span className="text-gray-900 ml-2">{userInfo.personalInfo.about}</span>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold mt-8 mb-4 text-blue-600 underline">Financial Information</h2>
                        <div className="mb-2">
                            <strong className="text-gray-700">Employment Status:</strong>
                            <span className="text-gray-900 ml-2">{userInfo.financialInfo.employmentStatus}</span>
                        </div>
                        <div className="mb-2">
                            <strong className="text-gray-700">Savings:</strong>
                            <span className="text-gray-900 ml-2">{userInfo.financialInfo.savings}</span>
                        </div>
                        <div className="mb-2">
                            <strong className="text-gray-700">Created At:</strong>
                            <span className="text-gray-900 ml-2">{new Date(userInfo.financialInfo.createdAt).toLocaleDateString('en-GB')}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
