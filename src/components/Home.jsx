import React, { useEffect, useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom';
import Nav from './Nav';
import SideBar from './SideBar';
const apiUrl = 'http://localhost:3005/todos/';
import axios from 'axios';
import Todo from './Todo';
function Home() {
    let user = {};
    if (localStorage.getItem('todoUser')) {

        let data = JSON.parse(localStorage.getItem('todoUser'));
        user.id = data.userId
        user.name = data.username;
    }
    const [todos, settodos] = useState([])
    const [isOngoing, setisOngoing] = useState(false);
    const [ongoingErr, setongoingErr] = useState(false)
    let [addActivity, setActivity] = useState('')

    async function getTodos() {

        let res = await axios.get(apiUrl + user.id).then(res => {
            settodos(res.data.todos)
            let ongoing = res.data.todos.filter(todo => todo.status == 'Ongoing')
            setisOngoing(ongoing.length > 0);
        }).catch(console.log);


    }
    useEffect(() => {
        getTodos();
    }, [])
    async function handleAdd() {
        let res = await axios.post(apiUrl + user.id, { activity: addActivity }).catch(console.log);

        setActivity('');
        getTodos();
    }

    return (
        <>  { !localStorage.getItem('todoUser') ? <Navigate to='/login' /> :
            <div className="home">
                <Nav user={ user } />
                <SideBar todos={ todos } />
                <main className='ml-56 pl-28 mt-48'>
                    { ongoingErr && <p className='text-center text-red-500'>Finish or Pause the ongoing task first.</p> }
                    <div className="addtask flex gap-4 justify-center m-4">
                        <input className='p-2 rounded-md focus:outline-green-500' type="text" value={ addActivity } onChange={ (e) => setActivity(e.target.value) } name="activity" id="" placeholder='Task Name' />
                        <button disabled={ addActivity.length == 0 } className='p-2 bg-violet-500 hover:bg-violet-800 rounded-md disabled:bg-violet-500 disabled:cursor-not-allowed' onClick={ handleAdd }>Add activity</button>
                    </div>
                    <div className="tasks flex justify-center">
                        <table className='table-auto'>
                            <thead>
                                <tr className='m-2 p-2 bg-gray-600'>
                                    <th className='w-24 lg:w-56 text-2xl p-2 m-2 border-2'>Activity</th>
                                    <th className='w-24 lg:w-56 text-2xl p-2 m-2 border-2'>Status</th>
                                    <th className='w-24 lg:w-56 text-2xl p-2 m-2 border-2'>Time Taken</th>
                                    <th className='w-24 lg:w-56 text-2xl p-2 m-2 border-2'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                { todos.map((todo, i) => (
                                    <Todo isOngoing={ isOngoing } setisOngoing={ setisOngoing } key={ i } todo={ todo } setongoingErr={ setongoingErr } />
                                )) }
                            </tbody>

                        </table>
                    </div>
                </main>
            </div>
        }
        </>
    )
}

export default Home;