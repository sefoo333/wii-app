"use client"

import React, { useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";
import { CiStar, CiHeart } from "react-icons/ci";
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '@/app/_config/confg';

function Text_comp(props: any) {


    let [checked, setCheck] = useState(false)

    const De = async () => {
        let questions: any = (await getDoc(doc(db, "forms", `${props.name}`))).data()
        let filter = questions.contentQuestion.filter((e: { id: string }) => e.id !== props.id)
        console.log(filter)
        await updateDoc(doc(db, "forms", `${props.name}`), {
            contentQuestion: filter
        })
    }

    const changes = async (targ: string, kind?: string | object | boolean) => {
        let questions: any = (await getDoc(doc(db, "forms", `${props.name}`))).data()
        let filter2 = questions.contentQuestion.map((e: any) => {
            if (e.id === props.id) {
                if (targ === "Title") {
                    return {
                        Title: kind,
                        id: e.id,
                        type: "text",
                        description: e.description,
                    }
                } else if (targ === "description") {
                    return {
                        Title: e.Title,
                        id: e.id,
                        type: e.type,
                        description: kind,

                    }

                }
            } else {
                return e
            }
        })


        await updateDoc(doc(db, "forms", `${props.name}`), {
            contentQuestion: filter2
        })
    }

    let [Title, setTitle] = useState("")
    let [type, setType] = useState("")
    let [desc, setDesc] = useState("")
    useEffect(() => {
        const getDa = async () => {
            let questions: any = (await getDoc(doc(db, "forms", `${props.name}`))).data()
            let filter1 = questions.contentQuestion.filter((e: { id: string }) => e.id === props.id);
            setType(filter1[0].kind)
            setTitle(filter1[0].Title)
            setDesc(filter1[0].description)
        }


        return () => {
            getDa()
        }
    }, [])


    return (
        <div className="text flex flex-col my-[15px] px-[15px] " draggable>
            <div className="title mb-[15px]">
                <input type="text" className='p-[15px] rouded-[15px] w-[400px] border-l-[#798645] border-l-[5px]' placeholder={Title} onBlur={(e: any) => {
                    changes("Title", e.target.value)
                }} />
            </div>
            <div className="decription">
                <input type="text" className='p-[15px] rouded-[15px] w-[450px] border-l-[#798645] border-l-[5px]' placeholder={desc} onBlur={(e: any) => {
                    changes("description", e.target.value)
                }} />
            </div>
            <div className="tools flex justify-between px-[20px] pb-[15px] items-center mt-[20px]">
                <div className="delete text-[20px]">
                    <a
                        className="inline-block rounded bg-red-600 px-5 py-2 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-red-500"
                        href="#"
                        onClick={() => {
                            De()
                            console.log(props.id)
                        }}
                    >
                        Delete
                    </a>
                </div>

            </div>
        </div>
    )
}

export default Text_comp
