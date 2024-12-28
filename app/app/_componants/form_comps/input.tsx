
import React, { useContext, useEffect, useState } from 'react'
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '@/app/_config/confg';
import { Da } from '@/app/preview/[preview_id]/page';

function Input_comp(props: any) {


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
                        isrequired: e.isrequired,
                        type: e.type,
                        solution_content: e.solution_content,
                    }
                } else if (targ === "solution_content") {
                    return {
                        Title: e.Title,
                        id: e.id,
                        isrequired: e.isrequired,
                        type: e.type,
                        solution_content: kind,

                    }
                } else if (targ === "required") {
                    return {
                        Title: e.Title,
                        id: e.id,
                        isrequired: kind,
                        type: e.type,
                        solution_content: e.solution_content,

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

    let [sol, setSol] = useState("")
    let [Title, setTitle] = useState("")

    useEffect(() => {
        const getDa = async () => {
            let questions: any = (await getDoc(doc(db, "forms", `${props.name}`))).data()
            let filter1 = questions.contentQuestion.filter((e: { id: string }) => e.id === props.id);
            setSol(filter1[0].solution_content)
            setCheck(filter1[0].isrequired)
            setTitle(filter1[0].Title)
        }


        return () => {
            getDa()
        }
    }, [])

    return (
        <div className="text flex flex-col my-[15px] px-[15px] " draggable>
            <div className="title mb-[15px]">
                <input type="text" className='p-[15px] rouded-[15px] w-[400px] border-l-[#798645] border-l-[5px]' placeholder={Title !== "" ? Title : "Title"} onBlur={(e: any) => {
                    changes("Title", e.target.value)
                }} />
            </div>
            <div className="decription">
                <textarea name="" className='w-[450px] p-[10px] text-[15px]' placeholder="Solution" readOnly id=""></textarea>
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
                <div className="important flex items-center">
                    <span>Requierd</span>
                    <label
                        className="relative ml-[10px] inline-block h-5 w-12 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-green-500"
                    >
                        <input type="checkbox" id="AcceptConditions" className="peer sr-only" onClick={() => {

                            checked ? setCheck(false) : setCheck(true)
                            checked ? changes("required", false) : changes("required", true)
                            console.log(checked)

                        }}
                            checked={checked}
                        />


                        <span
                            className="absolute inset-y-0 start-0 m-1 size-3 rounded-full bg-white transition-all peer-checked:start-6"
                        ></span>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default Input_comp
