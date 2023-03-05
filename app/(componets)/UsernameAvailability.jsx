'use client'
import {useEffect} from 'react'


export default function UsernameAvailability({username, availability}) {
    if (availability === 'warn') return <div>PLS fill up required feilds</div> 
    if (username === '') return 
    switch(availability){
        case 'free':
            return <div>{username} is FREE</div>
        case 'taken':
            return <div>{username} is TAKEN</div>
        default:
            return <div>Loading...</div>
    }
}
