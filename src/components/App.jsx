import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Home from './Home';
function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/login' element={ <Login /> } />
                    <Route path='/register' element={ <Register /> } />
                    <Route path='/' element={ <Home /> } />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App