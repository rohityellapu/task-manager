import React from 'react'

function Nav({ user }) {
    return (
        <nav className='h-36 w-screen fixed top-0 bg-blue-500 flex flex-row p-6 justify-between items-center'>
            <div className="logo">

            </div>
            <div className="user text-center text-2xl font-bold">
                Username: { user.name }
            </div>
        </nav>
    )
}

export default Nav