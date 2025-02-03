import Button from "@/components/UIComponent/Button"
import { useNavigate } from "react-router-dom"


const Homepage1 = () => {
    const navigate = useNavigate()
    const handleSignUp = () => {
        navigate("/signup")
    }
    const handleLogin = () => {
        navigate("/login")
    }
    return (
        <div className='flex  flex-col justify-center items-center m-auto w-full h-screen gap-10'>

            <div className="  relative rounded-full w-2/3 h-2/3 bg-gradient-to-t from-cyan-900 to-black rotate-45 transition-all duration-500 spin-in-2 opacity-50 shadow-lg shadow-slate-500 animate-pulse " />

            <div className=" absolute top-[20%] w-full h-full flex  flex-col items-center gap-10">
                <div className='barrio-regular text-6xl text-blue-300 text-center flex w-1/2'>
                    Your Virtual Hub for Collaboration and Connection!
                </div>
                <h1 className="font-mono text-7xl font-bold text-gray-500 ">Chat-Dash</h1>
                <div className=" flex flex-row gap-4">
                    <Button onclick={handleLogin}>Login</Button>
                    <Button onclick={handleSignUp}>SignUp</Button>
                </div>
                <div className="flex flex-row gap-10 mx-4 ">
                    <div className="border-r-2 border-blue-400 p-4 bg-gradient-to-b from-red-100 to-black rounded-3xl shadow-sm shadow-gray-600 w-[30%]">

                        <h1 className="text-2xl geist-regular text-gray-600 ">
                            Create Room
                        </h1>
                        <p className="text-white">
                            Create a space to collaborate with your friends effortlessly!
                            With just one click, generate your unique room key and share it instantly with your friends.
                        </p>
                    </div>
                    <div className="border-r-2 border-blue-400 p-4 bg-gradient-to-b from-red-100 to-black rounded-3xl shadow-sm shadow-gray-600 w-[30%]">

                        <h1 className="text-2xl geist-regular text-gray-600 ">
                            Join Room
                        </h1>
                        <p className="text-white">
                            Join your space and get cnnected with your peers.
                            Insert your room key, open your door.
                        </p>
                    </div>
                    <div className="border-r-2 border-blue-400 p-4 bg-gradient-to-b from-red-100 to-black rounded-3xl shadow-sm shadow-gray-600 w-[30%]">

                        <h1 className="text-2xl geist-regular text-gray-600 ">
                            Existing Room
                        </h1>
                        <p className="text-white">
                            Get access to your all spaces.
                            Join any room you want and collab with your peers
                        </p>
                    </div>
                </div>
                <div className=" flex flex-col text-2xl text-blue-300 text-center  w-1/2 mt-10 bg-gradient-to-b from-slate-500 to-black p-4 rounded-2xl">
                    <h1 className="geist-regular text-5xl my-10">
                        Why Choose Our Collaborative Chat Platform?
                    </h1>
                    <ul className=" flex flex-col gap-4">
                        <li className="text-lg"><span className="mx-2 text-gray-400 text-2xl">
                            Instant Access:
                        </span>
                            No complicated setups—just create your room and start chatting!</li>
                        <li className="text-lg"><span className="mx-2 text-gray-400 text-2xl">
                            Seamless Collaboration:</span>
                            Work together on projects, share ideas, and have fun conversations in real-time.</li>
                        <li className="text-lg"><span className="mx-2 text-gray-400 text-2xl">
                            User-Friendly Interface:
                        </span>
                            Enjoy a clean and intuitive design that makes chatting easy and enjoyable.</li>
                        <li className="text-lg"><span className="mx-2 text-gray-400 text-2xl">
                            Secure Sharing:
                        </span>
                            Your room key is private—share it only with those you want to invite!</li>
                    </ul>
                </div>
            </div>


        </div>
    )
}

export default Homepage1
