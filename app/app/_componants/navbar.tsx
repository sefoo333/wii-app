"use client"

import React, { useContext, useEffect, useState } from 'react'
import Search from './search'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../_config/confg'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import Link from 'next/link'

function Nav() {
    let [photo, setPhoto] = useState("")

    useEffect(() => {
        const getphoto = onAuthStateChanged(auth, (user: any) => {
            setPhoto(user?.photoURL)
        })
        return () => {
            getphoto()
        }
    }, [])

    let [open, setOpen] = useState(false)
    return (
        <nav className='flex justify-between items-center px-[25px] py-[20px] h-[100px] bg-slate-50 shadow-navbar'>
            <h1 className='text-[30px] font-bold'>Wii</h1>

            <Search />

            <div className="user_image relative cursor-pointer" onClick={() => open ? setOpen(false) : setOpen(true)}>
                <img src={photo} className='image w-[50px] h-[50px] rounded-full bg-black ' alt="" />

                <div className="window absolute left-[-180px] top-[42px] w-[200px] bg-slate-100 text-black duration-500 transition z-50" style={open ? { display: "block" } : { display: "none" }}>
                    <div onClick={() => {
                        signOut(auth)
                        window.open("/", "_parent")
                    }} className="sec-3 px-[8px] py-[12px] border-b-[1px] border-b-[#ddd] cursor-pointer duration-300 hover:bg-blue-700  hover:text-white">Logout</div>
                </div>
            </div>
        </nav>
    )
}

export default Nav
