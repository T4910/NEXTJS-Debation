'use client'
import {useEffect} from 'react'


export default function UsernameAvailability({username, availability}) {

    return (
        <div>{username} is {availability ? 'free' : 'taken'}</div>
    )
}
