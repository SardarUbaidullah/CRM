import React from 'react'
import {
    Inertia
} from '@inertiajs/react'


const Home = () => {

    const handleNavigate = () => {
        Inertia.get('/profile')

    }
    return (
        <div onClick={handleNavigate}>Home</div>
    )
}

export default Home