import { MdHelpOutline } from "react-icons/md";

const Header = () => {
    return (
        <div className="flex justify-between p-3 w-full h-auto border-b-gray-200 border-b-2">
            <div className="flex gap-2">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT87h9d1Mmc4T7os0Js9LVBGjpUN3ZIYSi01Q&s" alt="Logo" className="h-11 w-14 mt-2" />
                <div className="felx flex-col ">
                <h1 className="text-xl font-bold text-pink-500">CRAXI<span className="bg-gradient-to-r from-pink-500 to-yellow-500 text-transparent bg-clip-text">NNO</span></h1>
                    <h2 className="text-md text-pink-500">TECHNOLO<span className="bg-gradient-to-r from-pink-500 to-yellow-500 text-transparent bg-clip-text">GIES</span> </h2>
                </div>
            </div>
            <MdHelpOutline size={30} className=" text-gray-600 mr-5 mt-1" />
        </div>
    )
}

export default Header
