import React from 'react'
import { useNavigate } from 'react-router-dom';

function SideBar({ todos }) {
    const navigate = useNavigate()
    function getTimeTaken(ms) {
        if (ms == 0) return '';
        let str = '';
        let seconds = parseInt(ms / 1000);
        let minutes = parseInt(ms / 60000);
        let hour = parseInt(ms / 3600000);
        str += hour > 9 ? hour : '0' + hour;
        str += minutes > 9 ? `:${minutes}` : `:0${minutes}`;
        str += seconds > 9 ? `:${seconds}` : `:0${seconds}`
        return str;
    }
    return (
        <div className='hidden lg:flex flex-col justify-between h-screen fixed z-5 left-0 top-0 w-72 bg-orange-500 p-4 '>

            <div className="history h-5/6">
                <h1 className='text-4xl font-bold text-center my-4'>Task Manager</h1>
                <h2 className='text-2xl font-semibold p-4'>History</h2>
                <ul className='flex w-full p-8 flex-col gap-2 overflow-y-auto h-5/6'>
                    <li className='flex my-2 gap-2 gap-x-8 justify-between'><span className='font-bold text-lg'>Activity</span><span className='font-bold text-lg'>TimeTook</span></li>
                    { todos.filter(todo => todo.status == 'Completed').map((todo, i) => (
                        <li key={ i } className='flex gap-2 gap-x-8 justify-between'><span>{ todo.activity }</span><span>{ getTimeTaken(todo.timeTaken) }</span></li>
                    )) }
                </ul>
            </div>
            <button className='bg-red-600 rounded-md px-4 p-2 hover:saturate-200' onClick={ () => {
                localStorage.removeItem('todoUser');
                navigate('/login');
            } }>Log Out</button>
        </div>
    )
}

export default SideBar