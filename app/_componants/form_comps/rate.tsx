"use client"


import React, { useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";
import { CiStar, CiHeart } from "react-icons/ci";
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '@/app/_config/confg';

function Rate(props: { kind: string, id: string, name: string }) {
    let [kind, setKind] = useState("star")
    let [count, setCount] = useState(5);
    let [checked, setCheck] = useState(false)

    const De = async () => {
        let questions: any = (await getDoc(doc(db, "forms", `${props.name}`))).data()
        let filter = questions.contentQuestion.filter((e: { id: string }) => e.id !== props.id)
        console.log(filter)
        await updateDoc(doc(db, "forms", `${props.name}`), {
            contentQuestion: filter || []
        })
    }





    // for rates

    const changes2 = async (targ: string, kind?: any) => {
        let questions: any = (await getDoc(doc(db, "forms", `${props.name}`))).data()
        let filter = questions.contentQuestion.map((e: any) => {
            if (e.id === props.id && e.type === "rates") {
                if (targ === "count") {
                    return {
                        id: e.id,
                        type: e.type,
                        Title: e.Title,
                        rate_count: parseInt(kind),
                        rate_kind: e.rate_kind,
                        isrequired: e.isrequired,
                    }
                } else if (targ === "kind") {
                    return {
                        id: e.id,
                        type: e.type,
                        Title: e.Title,
                        rate_count: e.rate_count,
                        rate_kind: kind,
                        isrequired: e.isrequired,
                    }
                } else if (targ === "requ") {
                    return {
                        id: e.id,
                        type: e.type,
                        Title: e.Title,
                        rate_count: e.rate_count,
                        rate_kind: e.rate_kind,
                        isrequired: kind,
                    }
                } else if (targ === "title") {
                    return {
                        id: e.id,
                        type: e.type,
                        Title: kind,
                        rate_count: e.rate_count,
                        rate_kind: e.rate_kind,
                        isrequired: e.isrequired,
                    }
                }
            }
            else {
                return e
            }
        })

        console.log(filter)

        await updateDoc(doc(db, "forms", `${props.name}`), {
            contentQuestion: filter || []
        })
    }



    let [value, setValue] = useState("")

    useEffect(() => {
        const getDa = async () => {
            let questions: any = (await getDoc(doc(db, "forms", `${props.name}`))).data()
            let filter1 = questions.contentQuestion.filter((e: { id: string }) => e.id === props.id);
            setCheck(filter1[0].isrequired)
            setKind(filter1[0].rate_kind)
            setCount(filter1[0].rate_count)
            setValue(filter1[0].Title)
        }

        return () => {
            getDa()
        }
    }, [])
    return (
        <>

            <div className="rate  py-[20px] border-t-[1px] border-t-[#ddd]" draggable>
                <div className="edit_title_quetion flex justify-between px-[15px]">
                    <input type="text" className='p-[15px] rouded-[15px] w-[400px] border-l-[#798645] border-l-[5px]' placeholder={value} onChange={(e) => {
                        changes2("title", e.target.value)
                    }} />
                </div>
                <div className="stars">
                    {kind === "star" ? (
                        <div className="stars flex text-[40px] pl-[15px] my-[20px]">
                            {Array.from(Array(count), (e, i) => (
                                <CiStar />
                            ))}
                        </div>
                    ) : (
                        <div className="heart flex text-[40px] pl-[15px] my-[20px]">
                            {Array.from(Array(count), (e, i) => (
                                <CiHeart />
                            ))}
                        </div>
                    )}
                </div>
                <div className="two flex my-[25px] pl-[15px]">
                    <div className="level">
                        <h1>Levels</h1>
                        <select
                            name="HeadlineAct"
                            id="HeadlineAct"
                            className="mt-1.5 w-[200px] rounded-lg border-gray-300 text-gray-700 sm:text-sm  p-[10px]"
                            onChange={(e) => {
                                setCount(parseInt(e.target.value))
                                changes2("count", e.target.value)
                            }}
                            value={count.toString()}
                        >
                            <option value="5">Please select</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                    </div>
                    <div className="kind ml-[15px]">
                        <div className="level">
                            <h1>Type</h1>
                            <select
                                name="HeadlineAct"
                                id="HeadlineAct"
                                className="mt-1.5 w-[200px] rounded-lg border-gray-300 text-gray-700 sm:text-sm p-[10px]"
                                onChange={(e) => {
                                    if (e.target.value === "star") {
                                        setKind("star")
                                        changes2("kind", "star")
                                    } else if (e.target.value === "heart") {
                                        setKind("heart")
                                        changes2("kind", "heart")
                                    }
                                }}
                                value={kind}
                            >
                                <option value="">Please select</option>
                                <option value="star">star ⭐</option>
                                <option value="heart">Heart ❤</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="tools flex justify-between px-[20px] pb-[15px] items-center">
                    <div className="delete text-[20px]">
                        <a
                            className="inline-block rounded bg-red-600 px-5 py-2 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-red-500"
                            href="#"
                            onClick={() => {
                                De()
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
                                checked ? changes2("requ", false) : changes2("requ", true)
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

        </>
    )
}

export default Rate
