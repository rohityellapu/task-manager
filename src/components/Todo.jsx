import axios from 'axios';
import React, { useState } from 'react'
const apiUrl = 'http://localhost:3005/todos/';
function Todo({ todo, isOngoing, setisOngoing, setongoingErr }) {

    const [task, settask] = useState({ ...todo, startTime: 0, endTime: 0 })
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
    function handleStart(e) {

        if (isOngoing) {
            setongoingErr(true);
            return setTimeout(() => setongoingErr(false), 5000)
        }
        let now = (new Date()).getTime()
        settask(prev => (
            { ...prev, startTime: now, status: 'Ongoing' }
        ))
        setisOngoing(true);

    }
    async function handlePauseAndResume(e) {


        if (isOngoing) {

            let now = (new Date()).getTime();
            let timeTook = now - task.startTime;
            await axios.put(apiUrl + task._id, { todo: { ...task, timeTaken: timeTook } }).then(res => {
                settask(prev => ({ ...prev, timeTaken: res.data.updated.timeTaken, startTime: 0 }))
                setisOngoing(false);
            }).catch(console.log);


        }
        else {
            if (isOngoing) {
                setongoingErr(true);
                return setTimeout(() => setongoingErr(false), 5000)
            }
            let now = (new Date()).getTime()
            settask(prev => (
                { ...prev, startTime: now, status: 'Ongoing' }
            ))
            setisOngoing(true);
        }

    }
    async function handleEnd(e) {


        let now = (new Date()).getTime();
        let timeTook = task.startTime > 0 ? now - task.startTime : 0;
        await axios.put(apiUrl + task._id, { todo: { ...task, timeTaken: timeTook, status: 'Completed' } }).then(res => {
            settask(prev => ({ ...prev, timeTaken: res.data.updated.timeTaken, startTime: 0, status: 'Completed' }))
            setisOngoing(false);
        }).catch(console.log);


    }

    return (
        <tr className='m-2 p-2 text-start px-10 text-semibold'>
            <th className='p-2 border-2'>{ task.activity }</th>
            <th className='p-2 border-2'>{ task.status }</th>
            <th className='p-2 border-2'>{ getTimeTaken(task.timeTaken) }</th>
            <th className='p-2 border-2'>{ task.status == 'Pending' ? <button className='p-2 rounded-md bg-green-500 hover:saturate-200' onClick={ handleStart }>Start</button> : task.status == 'Ongoing' ?
                <p className='flex justify-between gap-2'><button className='p-2 rounded-md bg-red-600 hover:saturate-200' onClick={ handleEnd }>End</button><button className='p-2 bg-gray-600 rounded-md hover:saturate-200' onClick={ handlePauseAndResume }>{ isOngoing ? "Pause" : "Resume" }</button></p> : '' }</th>
        </tr>
    )
}

export default Todo