import { useState } from "react";
import image from "./assets/opening.png";
import {useNavigate } from "react-router-dom";

function ToDoList() {
    const [userName, setUserName] = useState('')
    const navigate = useNavigate();

    function changeUser(e){
        setUserName(e.target.value)
    }

    function addUser(){
        if (userName.trim() !== ''){
            navigate(`/landing?username=${encodeURIComponent(userName.trim())}`);            
       }else{
        alert("please provide a username")
       }
    }


    return (
        <div className="flex items-center  justify-center min-h-screen main-body-image">
            <div className="bg-white border rounded-xl shadow-sm sm:flex white:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
                <div className="flex-shrink-0 relative w-full rounded-t-xl overflow-hidden pt-[40%] sm:rounded-s-xl sm:max-w-[15rem] md:rounded-se-none md:max-w-xs">
                    <img
                        className=" h-full w-full absolute top-0 start-0 object-cover"
                        src={image}
                        alt="Image Description"
                    />
                </div>
                <div className="flex flex-wrap alig w-full justify-center">
                    <div className="p-4 flex flex-col text-center items-center h-full mt-8 sm:p-7">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-black">
                            &#128522; Hi Welcome ...
                        </h2>

                        <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-[810px]">
                            Manage your tasks, stay organized, and boost your productivity with our ToDoList app.
                            Whether it's work, study, or personal tasks, we've got you covered!
                        </p>
                        <div className="mt-4">
                            <div class="w-full max-w-sm ">
                                <div class="flex items-center border-b border-teal-500 mt-2 py-2 w-[350px]">
                                        <input onChange={(e)=> changeUser(e)} value={userName} class="appearance-none bg-transparent border-none w-full text-black py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Enter Your Name" aria-label="Full name" />
                                            <button onClick={addUser} class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
                                                Enter
                                            </button>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ToDoList;
