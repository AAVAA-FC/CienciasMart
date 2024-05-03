import React from 'react'
import { useAuth } from '../../hooks/useAuth'

function WelcomeMenu(){
    const { user } = useAuth();

    return <h1>Welcome, {user.username}! </h1>
}

export default WelcomeMenu
