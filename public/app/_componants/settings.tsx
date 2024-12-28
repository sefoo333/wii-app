"use client"
import { doc, DocumentData, getDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { MdCancel } from "react-icons/md";
import { db } from '../_config/confg';

interface information {
    Name: string
}

function Settings(props: information) {
    let [active, setActive] = useState(false)
    let [Name, setName] = useState("")

    const update = async () => {
        await updateDoc(doc(db, "forms", `${props.Name}`), {
            ProjectName: Name,
        })
    }


    let [timeron, SetTimer] = useState(false)
    const timer = async (timervalue: boolean) => {
        await updateDoc(doc(db, "forms", `${props.Name}`), {
            Timer: timervalue ? false : true
        })
    }

    const testmode = async (value: boolean) => {
        await updateDoc(doc(db, "forms", `${props.Name}`), {
            testmode: value ? false : true
        })
    }

    let [testmodebool, settestmodebool] = useState(false)

    useEffect(() => {
        const getData = async () => {
            let data: any = (await getDoc(doc(db, "forms", `${props.Name}`))).data();
            SetTimer(data.Timer)
            settestmodebool(data.testmode)
        }

        getData()
    }, [])

    return (
        <div className="window w-full h-full bg-[#00000087] fixed left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]" style={active ? { display: "none" } : { display: "block" }}>
            <div className="window_2 bg-slate-300  p-[25px] rounded-[15px] w-[400px]  absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]">
                <div className="main border-b-gray-400 border-b-[1px] text-[30px] uppercase font-bold flex justify-between items-center">
                    <h1>Settings</h1>
                    <div className="cancel cursor-pointer" onClick={() => setActive(true)}>
                        <MdCancel />
                    </div>
                </div>

                <div className="section_one my-[15px]">
                    <form action="" onSubmit={(e) => {
                        update()
                        setTimeout(() => {
                            location.reload()
                        }, 1500)
                        e.preventDefault()
                    }}>
                        <div>
                            <label htmlFor="UserEmail" className="blockfont-medium  text-[20px] mb-[5px] font-bold"> ProjectName </label>

                            <input
                                type="text"
                                id="UserEmail"
                                placeholder="Edit Here"
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm  mb-[20px] p-[15px]"
                            />
                            <input type="submit" value="Edit" className='cursor-pointer inline-block rounded bg-[#4F75FF] px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-[#4d64b8]' />

                        </div>
                    </form>
                </div>
                <div className="clock my-[15px] flex justify-between">
                    <div className="main">
                        <h1 className='blockfont-medium  text-[20px] mb-[5px] font-bold'>open Timer</h1>
                        <p className='text-gray-700'>Open Timer on Form</p>
                    </div>
                    <label
                        htmlFor="seff"
                        className="relative inline-block h-8 w-14 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-green-500"
                    >
                        <input type="checkbox" onChange={() => {
                            timeron ? SetTimer(false) : SetTimer(true)
                            timer(timeron)
                        }} id="seff" className="peer sr-only" checked={timeron} />

                        <span
                            className="absolute inset-y-0 start-0 m-1 size-6 rounded-full bg-white transition-all peer-checked:start-6"
                        ></span>
                    </label>
                </div>
                <div className="clock my-[15px] flex justify-between">
                    <div className="main">
                        <h1 className='blockfont-medium  text-[20px] mb-[5px] font-bold'>make it a test</h1>
                        <p className='text-gray-700'>make this form as a test by points</p>
                    </div>
                    <label
                        htmlFor="seff2"
                        className="relative inline-block h-8 w-14 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-green-500"
                    >
                        <input checked={testmodebool} type="checkbox" id="seff2" className="peer sr-only" onChange={() => {
                            testmodebool ? settestmodebool(false) : settestmodebool(true)
                            testmode(testmodebool)
                        }} />

                        <span
                            className="absolute inset-y-0 start-0 m-1 size-6 rounded-full bg-white transition-all peer-checked:start-6"
                        ></span>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default Settings
