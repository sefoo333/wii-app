import React, { useEffect, useState } from 'react'
import { MdOutlineInput, MdTextFields } from "react-icons/md";
import { TiStarFullOutline } from "react-icons/ti";
import { CgRadioChecked } from "react-icons/cg";
import { TbSectionFilled } from "react-icons/tb";
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../_config/confg';
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';

function Sidemenu(props: { name: string }) {


    let split = props.name


    const create_Question = async () => {
        await updateDoc(doc(db, "forms", `${split}`), {
            contentQuestion: arrayUnion({
                type: "question",
                id: `${Date.now()}`,
                Title: "",
                kind: "radio",
                solutions: [],
                isrequired: false,
                points: 0,
            })
        })
    }
    const create_Rate = async () => {
        await updateDoc(doc(db, "forms", `${split}`), {
            contentQuestion: arrayUnion({
                id: `${Date.now()}`,
                type: "rates",
                Title: "",
                rate_count: 5,
                rate_kind: "star",
                isrequired: false,
            })
        })
    }
    const Text = async () => {
        await updateDoc(doc(db, "forms", `${split}`), {
            contentQuestion: arrayUnion({
                id: `${Date.now()}`,
                type: "text",
                Title: "",
                description: "",
            })
        })
    }
    const Input = async () => {
        await updateDoc(doc(db, "forms", `${split}`), {
            contentQuestion: arrayUnion({
                id: `${Date.now()}`,
                type: "input",
                Title: "",
                solution_content: "",
                isrequired: false,
            })
        })
    }





    return (
        <div className="flex hide_print py-[20px] shadow-forms w-16 flex-col h-[300px] fixed md:top-1/2 md:translate-y-[-50%] rounded-[10px] max-md:rounded-none max-md:p-[20px] border-[1px] border-gray-100 justify-center  border-e bg-white max-md:bottom-0 max-md:top-auto max-md:w-full max-md:items-center max-md:left-1/2 max-md:translate-x-[-50%] max-md:h-[50px]">
            <ul className="space-y-1 pt-4 max-md:pt-0 max-md:items-center  max-md:flex max-md:gap-[20px] max-md:p-[0px]">
                <li className='max-md:mt-[0px]'>
                    <a
                        href="#"
                        className="group relative text-[25px] mb-[15px] max-md:mb-[0px] flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                        onClick={() => create_Question()}
                    >
                        <CgRadioChecked />

                        <span
                            className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
                        >
                            Question
                        </span>
                    </a>
                </li>
                <li className='max-md:mt-[0px]'>
                    <a
                        href="#"
                        className="group relative text-[25px] mb-[15px]  max-md:mb-[0px] flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                        onClick={() => {
                            create_Rate()
                        }}
                    >
                        <TiStarFullOutline />

                        <span
                            className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
                        >
                            Rate
                        </span>
                    </a>
                </li>
                <li className='max-md:mt-[0px]'>
                    <a
                        href="#"
                        className="group relative text-[25px] mb-[15px] max-md:mb-[0px] flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                        onClick={() => Text()}
                    >
                        <MdTextFields />

                        <span
                            className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
                        >
                            Text
                        </span>
                    </a>
                </li>
                <li className='max-md:mt-[0px]'>
                    <a
                        href="#"
                        className="group relative text-[25px] mb-[15px] max-md:mb-[0px] flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                        onClick={() => {
                            Input()
                        }}
                    >
                        <MdOutlineInput />

                        <span
                            className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
                        >
                            Input
                        </span>
                    </a>
                </li>
            </ul>
        </div>

    )
}

export default Sidemenu
