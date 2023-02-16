'use client';
import { ClerkProvider, useUser, SignIn, UserButton, SignedOut } from '@clerk/nextjs'
import {useState} from 'react'
import {useRouter} from 'next/router'
const PopUp = ({popupOpen, setPopupOpen}) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96  rounded-lg shadow-lg">
                    <SignIn routing='virtual' />
                </div>
        </div>    )
}



export default function Topbar({loggedIn}) {
    const [popupOpen, setPopupOpen] = useState(false)
    const router = useRouter()


    const {user} = useUser()
    return (
    <nav className="bg-white border-gray-200 border-b-2 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
            <a href="/" className="flex items-center">
                My Courses    
            </a>
            {popupOpen && <PopUp popupOpen={popupOpen} setPopupOpen={setPopupOpen} />}
            {user ?
                <UserButton showName={true} signInUrl={router.asPath} afterSignOutUrl={router.asPath} /> :
                <button onClick={() => setPopupOpen(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Sign In
                </button>
            }

        </div>
        </nav>)
}