import React from 'react'
import { useAuth } from '../context/AuthContext';

function Dashboard() {
    const { user, logout } = useAuth();

    if (!user) {
        return <p>Please log in to access the dashboard.</p>;
    }
    console.log(user)
    return (
        <div>
            <p className='text-center font-bold text-3xl'>Hii {user.firstname + " " + user.lastname}</p>
            <button onClick={logout} className='bg-red-500 text-white px-4 py-2 rounded mt-4'>
                Logout
            </button>         
        </div>
    )
}

export default Dashboard
