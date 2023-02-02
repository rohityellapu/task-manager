import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import Loading from './Loading';

const apiUrl = 'https://todo-api-d05y.onrender.com/register';

function Register() {

    let [formData, setForm] = useState({ email: '', password: '', confirmPass: '' });
    let [errMsg, setErr] = useState({ email: '', password: '', confirmPass: '', err: '' });
    const [onLoad, setonLoad] = useState(false);
    let navigate = useNavigate();
    function handleChange(e) {
        let { name, value } = e.target;
        setForm(prev => (
            { ...prev, [name]: value }
        ))
        setErr({ email: '', password: '', confirmPass: '', err: '' })
    }
    async function handleSubmit(e) {
        e.preventDefault();
        e.stopPropagation();
        if (formData.email == '') {
            return setErr(prev => ({ ...prev, email: 'Please enter your email.' }))
        } else if (formData.password == '' || formData.password.length < 6) {
            return setErr(prev => ({ ...prev, password: 'Must be more than 6 characters.' }))
        } else if (formData.password != formData.confirmPass) {
            return setErr(prev => ({ ...prev, confirmPass: 'Both passwords must match.' }))
        }
        console.log(formData);
        setonLoad(true);
        let data = await axios.post(apiUrl, { ...formData }).then(res => {
            let { data } = res;
            let store = { token: data.token, userId: data.user._id, username: data.user.username };
            localStorage.setItem('todoUser', JSON.stringify(store));
            navigate('/');

        }).catch(err => {
            console.log(err);
            if (err.response.status == 409) setErr(prev => ({ ...prev, err: 'User already exists. Sign in' }));
            else if (err.response.status != 200) setErr(prev => ({ ...prev, err: "Something went wrong. Try again." }))
        });
        setonLoad(false);
        console.log(data);
    }

    return (
        <div className='text-center text-lg h-screen bg-blue-400 flex flex-col justify-center gap-10 items-center'>
            <div className="card flex flex-col gap-2 p-4 bg-green-400 rounded-lg shadow-2xl shadow-blue-700">
                <h1 className='font-bold text-3xl m-2 p-2'>Sign Up</h1>
                <form action="" className='flex flex-col gap-4 m-2 p-2' onSubmit={ handleSubmit }>
                    <div className="email">

                        <input className='p-2 border-none rounded-md bg-green-300 focus:outline-none' onChange={ handleChange } value={ formData.email } type="email" name="email" id="email" placeholder='Email' />
                        <p className='text-red-500 pl-2 text-sm text-start'>{ errMsg.email }</p>
                    </div>
                    <div className="password">

                        <input className='p-2 border-none rounded-md bg-green-300 focus:outline-none' onChange={ handleChange } value={ formData.password } type="password" name="password" id="password" placeholder='Password' />
                        <p className='text-red-500 pl-2 text-sm text-start'>{ errMsg.password }</p>
                    </div>
                    <div className="confirmPass">

                        <input className='p-2 border-none rounded-md bg-green-300 focus:outline-none' onChange={ handleChange } value={ formData.confirmPass } type="password" name="confirmPass" id="password" placeholder='Confirm Password' />
                        <p className='text-red-500 pl-2 text-sm text-start'>{ errMsg.confirmPass }</p>
                    </div>
                    { onLoad && <Loading /> }
                    <p className='text-red-500 pl-2 text-sm text-start'>{ errMsg.err }</p>
                    <input className='p-2 px-4 rounded-md bg-green-600 hover:bg-green-300 hover:cursor-pointer' type="submit" value="Register" />
                </form>

            </div>
            <p className='text-blue-700'><Link to='/login'>Sign In</Link></p>
        </div>
    )
}

export default Register