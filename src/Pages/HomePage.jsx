import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { toAddTask, toCancelTask, toCompleteTask, toDeleteTask, toGetTaskList } from '../API/userRequest';
import Navbar from '../Components/NavBar';
const HomePage = () => {
    const Navigate = useNavigate()
    const token = window.localStorage.getItem("token")
    const [showOptions, setShowOptions] = useState(false);
    const [id, setID] = useState('');
    const [newTask, setNewTask] = useState("")
    const [tasks, setTasks] = useState([])
    const [value, setValue] = useState('')
    const [update, seUpdated] = useState(false)

    function handleDivClick(id) {
        setShowOptions(!showOptions);
        setID(id);
    }

    const addTask = async () => {
        if (token) {
            const response = await toAddTask({ task: newTask, priority: value }, token)
            if (response.status === 200) {
                seUpdated(!update)
                setNewTask('')
                setValue('')
            }
        } else {
            Navigate('/login')
        }

    }


    const fetchTask = async (token) => {
        const response = await toGetTaskList(token)
        if (response.status === 200) {
            setTasks(response?.data?.tasks)
        }
    }

    const deleteTask = async (id) => {
        const response = await toDeleteTask(token, id)
        if (response.status === 200) {
            seUpdated(!update)
        }
    }

    const completeTask = async (id) => {
        const response = await toCompleteTask(token, id)
        if (response.status === 200) {
            seUpdated(!update)
        }
    }


    const cancelTask = async (id) => {
        const response = await toCancelTask(token, id)
        if (response.status === 200) {
            seUpdated(!update)
        }
    }

    useEffect(() => {
        fetchTask(token)
    }, [update])

    return (
        <>
            <Navbar />
            <div onClick={() => showOptions && setShowOptions(false)} className="flex h-[100vh] w-[100vw] justify-center items-center bg-gradient-to-b to-[#0b090a] from-[#92e9a5]">
                <div className=" bg-white rounded md:min-w-[600px]">
                    {tasks.length ?
                        <div className=' p-5'>
                            {tasks.map((task) => (
                                <div onClick={() => task.status === "Pending" && handleDivClick(task?._id)} key={task?._id} className={`mt-2 ${task.status === "Pending" ? 'cursor-pointer' : ''}  relative rounded  flex justify-between items-center px-5 py-2 w-full border`}>
                                    <p className="capitalize"> <span className="mr-4">👉</span> {task.task}    <span className='text-red-800 font-bold'>({task.priority})</span>  </p>
                                    {task.status === "Completed" ? <Completed /> : task.status === "Cancelled" ? <Cancel /> : ''}
                                    {(showOptions && id === task._id) && (
                                        <div className="absolute bg-gray-100 border z-20  top-[40px] left-5">
                                            <p className='border cursor-pointer py-1 px-4 hover:opacity-70 text-green-500' onClick={() => completeTask(task._id)}>Completed</p>
                                            <p className='border cursor-pointer py-1 px-4 hover:opacity-70 text-yellow-400' onClick={() => cancelTask(task._id)}>Cancel</p>
                                            <p className='border px-4 py-1 cursor-pointer hover:opacity-70 text-red-600' onClick={() => deleteTask(task._id)} >Delete</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div> : <h3 className='text-center font-bold pt-1'>List Your Plans</h3>
                    }
                    <div className='bg-gray-200 p-5 mt-2 relative'>
                        <input type="text" placeholder='New task' value={newTask} onChange={(e) => setNewTask(e.target.value)} className='bg-white  border-blue-700 border-2 w-full rounded-full py-1 px-4' />
                        <span className='absolute top-[25px] cursor-pointer  right-10' onClick={() => (newTask && value) && addTask()}>➕</span>
                        {newTask && <Priority value={value} setValue={setValue} />}
                    </div>
                </div>
            </div>
        </>
    )
}
export default HomePage

const Completed = () => (
    <span className="ml-5 text-xl">[<span className="text-lg">✅</span>]</span>
)

const Cancel = () => (
    <span className="ml-5 text-xl">[<span className="text-lg">❌</span>]</span>
)

const Priority = ({ setValue, value }) => (
    <>
        <div className='flex justify-evenly pt-2 '>
            <p className='text-red-500 mt-2'>Select Your Priority </p>
            <select
                onChange={(e) => setValue(e.target.value)}
                defaultValue={value}
                className="py-1 w-20 mt-1 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
                <option disabled value=""></option>
                {[...Array(9)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                        {i + 1}
                    </option>
                ))}
            </select>
        </div>
    </>
)
