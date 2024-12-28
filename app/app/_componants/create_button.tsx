"use client"


import { arrayUnion, doc, setDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react'
import { IoIosAdd } from "react-icons/io";
import { MdQuiz } from "react-icons/md";
import { RiSurveyFill } from "react-icons/ri";
import { db } from '../_config/confg';

function C_button(props: { id: string }) {
    let [active, setActive] = useState(false)
    let [active1, setActive1] = useState(false)
    let [active2, setActive2] = useState(false)


    let words = ["a", "b", "z", "k", "s", "r", "q", "f", "o", "i", "f", "w"];
    let random: string[] = []
    for (let i = 0; i < 10; i++) {
        random.push(words[Math.round(Math.random() * 2)])
    }


    const createForm = async () => {
        await setDoc(doc(db, "forms", `${random.join("")}`), {

            ProjectName: `project_${random.join("")}`,
            MainForm: {
                Title: "New Project",
                description: "New Project by You :)"
            },
            userEditor: `${props.id}`,
            projectId: random.join(""),
            contentQuestion: [],
            background: "linear-gradient(45deg, #11998e, #38ef7d)",
            testmode: false,
        })
        await setDoc(doc(db, "form_solution", `${random.join("")}`), {

            ProjectName: `project_${random.join("")}`,
            solutions: [],
            userEditor: `${props.id}`,
            projectId: random.join(""),
        })
    }


    return (
        <div className="par">
            <div className="button text-white cursor-pointer w-[50px] h-[50px] fixed left-[25px] bottom-[25px] rounded-full transition hover:bg-[#4d64b8] bg-[#4F75FF] flex justify-center items-center text-[40px]"
                onClick={() => {
                    active ? setActive(false) : setActive(true)
                }}
            >
                <IoIosAdd />
            </div>
            {active ? (
                <div className="other_buttons ">
                    <div className="form  text-white cursor-pointer w-[50px] h-[50px] fixed left-[25px] bottom-[80px] rounded-full transition hover:bg-slate-500 bg-slate-700 flex justify-center items-center text-[25px]"

                        onMouseOver={() => {
                            setActive2(true)
                        }}
                        onMouseLeave={() => {
                            setActive2(false)
                        }}

                        onClick={() => {
                            createForm()

                            setTimeout(() => {
                                location.reload()
                            }, 2000)
                        }}


                    >
                        <RiSurveyFill />
                        {active2 ? (<span className='absolute left-[58px]  bg-gray-900 text-[#ddd] rounded-[4px] text-[14px] p-[4px]'>Form</span>) : null}
                    </div>
                </div>
            ) : null}
        </div>
    )
}

export default C_button
