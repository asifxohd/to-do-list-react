import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';


function Task() {
    const location = useLocation();
    const username = new URLSearchParams(location.search).get('username');

    const [tasks, setTasks] = useState([])
    const [lastTask, setLastTask] = useState()
    const [taskEdit, setTaskEdit] = useState({ taskName: '' });
    const [editting, setEditting] = useState('')

    const handleEnter = (e)=> {e.key === "Enter" ? addTask() : e}

    

    // function for adding task 
    function addTask() {
        
        if (lastTask.trim() !== '') {
            const isDuplicate = tasks.some(task => (task.taskName).toUpperCase() === (lastTask.trim()).toUpperCase() ) ;

            if (!isDuplicate){
                setTasks(t => [...t, { taskName: lastTask, compleatd: false }])
                setLastTask('')
            }else{
                alert("task already exists")
            }
            
        } 
    }
    const inputChange = (e) => setLastTask(e.target.value)

    //function for compleating individual task
    function testCompleated(index) {
        console.log(index)
        let arr = tasks.map((emt, idx) => idx === index ? { ...emt, compleatd: !emt.compleatd } : emt)
        setTasks(arr)
    }


    // function for editing task
    function editTask(index) {
        setTaskEdit(index)
        setEditting(tasks[index].taskName)
    }

    function handleEditChange(e) {
        setEditting (e.target.value );
    }

    function saveEditChange() {
        if (editting.trim() !== '') {
            setTasks((t) => t.map((task, index) => index === taskEdit ? { ...task, taskName: editting } : task) );
            setTaskEdit(null);
        }
        
    }


    function deleteTask(index){
        setTasks( (t) => t.filter((task, idx)=> idx !== index) )

    }

    //showing the TO DO LIST animation at initial stage
    useEffect(() => {
        const spans = document.querySelectorAll('.word span');

        spans.forEach((span, idx) => {
            span.addEventListener('click', (e) => {
                e.target.classList.add('active');
            });
            span.addEventListener('animationend', (e) => {
                e.target.classList.remove('active');
            });

            setTimeout(() => {
                span.classList.add('active');
            }, 750 * (idx + 1));
        });
    }, []);

    return (
        <>
            <div className="mt-9">
                <h1 className='headertag text-center mx-auto'>
                    <span className="water-animation word text-white">
                        <span>T</span>
                        <span>O</span>
                        <span> </span>
                        <span> </span>
                        <span>D</span>
                        <span>O</span>
                        <span> </span>
                        <span> </span>
                        <span>L</span>
                        <span>I</span>
                        <span>S</span>
                        <span>T</span>
                    </span>
                </h1>
            </div>
            <div className="flex mt-10 justify-center">
                <div className="w-full max-w-3xl bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h2 className="text-2xl mb-4 text-center"><b>{username}'s</b> TODO LIST	&#128394;</h2>
                    <div onKeyDown={(e) => handleEnter(e)} className="flex items-center border-b border-teal-600 py-2">
                        <input onChange={(e) => inputChange(e)} className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" value={lastTask} type="text" placeholder="Task name" aria-label="Task name" />
                        <button onClick={addTask} className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-md border-4 text-white py-1 px-2 rounded" type="button">
                            Add
                        </button>
                        <button onClick={() => setLastTask('')} className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-md py-1 px-2 rounded" type="button">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex justify-center pb-20">
                <table className="w-full max-w-3xl bg-white shadow-md rounded px-8 pt-6 pb-8 py-8 ">
                    <tbody>
                        {tasks.map((task, index) => (
                            <tr key={index} className={taskEdit === index ? "editing" : ""}>
                                <td className="border-b w-10 px-4">
                                    <div className="inline-flex items-center">
                                        <label
                                            className="relative flex items-center p-3 rounded-full cursor-pointer"
                                            htmlFor={`checkbox-${index}`}
                                        >
                                            <input
                                                type="checkbox"
                                                id={`checkbox-${index}`}
                                                checked={task.compleatd}
                                                onChange={() => testCompleated(index)}
                                                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                                            />
                                            <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-3.5 w-3.5"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    stroke="currentColor"
                                                    strokeWidth="1"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                        clipRule="evenodd"
                                                    ></path>
                                                </svg>
                                            </span>
                                        </label>
                                    </div>
                                </td>
                                <td className={`border-b py-5 ${task.compleatd ? 'completed' : ''}`}>
                                    {taskEdit === index ? (
                                        <input
                                            type="text"
                                            value={editting}
                                            onChange={(e) => handleEditChange(e)}
                                            className="border w-full ml-2 border-gray-400 p-2"
                                        />
                                    ) : (
                                        task.compleatd ? <del>{task.taskName}</del> : task.taskName
                                    )}
                                </td>
                                <td className="border-b py-5 flex justify-end pr-7">
                                    {taskEdit === index ? (
                                        <>
                                            <button
                                                onClick={() => saveEditChange(index)}
                                                className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                            >
                                                Save
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => editTask(index)}
                                                className="editBtn mr-2"
                                            >
                                                <svg height="1em" viewBox="0 0 512 512">
                                                    <path
                                                        d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32z"
                                                    ></path>
                                                </svg>

                                            </button>
                                            <button onClick={() => deleteTask(index)} className="delete-button">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 69 14"
                                                    className="svgIcon bin-top"
                                                >
                                                    <path
                                                        fill="black"
                                                        d="M20.8232 2.62734L19.9948 4.21304C19.8224 4.54309 19.4808 4.75 19.1085 4.75H4.92857C2.20246 4.75 0 6.87266 0 9.5C0 12.1273 2.20246 14.25 4.92857 14.25H64.0714C66.7975 14.25 69 12.1273 69 9.5C69 6.87266 66.7975 4.75 64.0714 4.75H49.8915C49.5192 4.75 49.1776 4.54309 49.0052 4.21305L48.1768 2.62734C47.3451 1.00938 45.6355 0 43.7719 0H25.2281C23.3645 0 21.6549 1.00938 20.8232 2.62734ZM64.0023 20.0648C64.0397 19.4882 63.5822 19 63.0044 19H5.99556C5.4178 19 4.96025 19.4882 4.99766 20.0648L8.19375 69.3203C8.44018 73.0758 11.6746 76 15.5712 76H53.4288C57.3254 76 60.5598 73.0758 60.8062 69.3203L64.0023 20.0648Z"
                                                    ></path>
                                                </svg>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 69 57"
                                                    className="svgIcon bin-bottom"
                                                >
                                                    <path
                                                        fill="black"
                                                        d="M20.8232 -16.3727L19.9948 -14.787C19.8224 -14.4569 19.4808 -14.25 19.1085 -14.25H4.92857C2.20246 -14.25 0 -12.1273 0 -9.5C0 -6.8727 2.20246 -4.75 4.92857 -4.75H64.0714C66.7975 -4.75 69 -6.8727 69 -9.5C69 -12.1273 66.7975 -14.25 64.0714 -14.25H49.8915C49.5192 -14.25 49.1776 -14.4569 49.0052 -14.787L48.1768 -16.3727C47.3451 -17.9906 45.6355 -19 43.7719 -19H25.2281C23.3645 -19 21.6549 -17.9906 20.8232 -16.3727ZM64.0023 1.0648C64.0397 0.4882 63.5822 0 63.0044 0H5.99556C5.4178 0 4.96025 0.4882 4.99766 1.0648L8.19375 50.3203C8.44018 54.0758 11.6746 57 15.5712 57H53.4288C57.3254 57 60.5598 54.0758 60.8062 50.3203L64.0023 1.0648Z"
                                                    ></path>
                                                </svg>
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>


                </table>
            </div>
        </>
    );
}

export default Task;




