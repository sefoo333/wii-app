"use client"


import React, { useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";
import { CiStar, CiHeart } from "react-icons/ci";
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '@/app/_config/confg';
import { MdOutlineDone } from "react-icons/md";
import { FaDeleteLeft } from "react-icons/fa6";

function Question(props: { kind: string, id: string, name: string, testmode: boolean }) {
    let [type, setType] = useState("radio")


    let [checked, setCheck] = useState(false)
    let [solutions, setSol]: any = useState([])


    // for questions

    const De = async () => {
        let questions: any = (await getDoc(doc(db, "forms", `${props.name}`))).data()
        let filter = questions.contentQuestion.filter((e: { id: string }) => e.id !== props.id)
        console.log(filter)
        await updateDoc(doc(db, "forms", `${props.name}`), {
            contentQuestion: filter
        })
    }

    let [points, setPoints] = useState(0)

    const changes = async (targ: string, kind?: string | object | boolean | number) => {
        let questions: any = (await getDoc(doc(db, "forms", `${props.name}`))).data()
        let filter2 = questions.contentQuestion.map((e: any) => {
            if (e.id === props.id) {
                if (targ === "type") {
                    return {
                        Title: e.Title,
                        id: e.id,
                        isrequired: e.isrequired,
                        kind: kind,
                        solutions: e.solutions,
                        type: e.type
                    }
                } else if (targ === "solutions") {
                    return {
                        Title: e.Title,
                        id: e.id,
                        isrequired: e.isrequired,
                        kind: e.kind,
                        solutions: kind,
                        type: e.type

                    }
                } else if (targ === "required") {
                    return {
                        Title: e.Title,
                        id: e.id,
                        isrequired: kind,
                        kind: e.kind,
                        solutions: e.solutions,
                        type: e.type

                    }
                } else if (targ === "title") {
                    return {
                        Title: kind,
                        id: e.id,
                        isrequired: e.isrequired,
                        kind: e.kind,
                        solutions: e.solutions,
                        type: e.type

                    }
                } else if (targ === "points") {
                    return {
                        Title: e.Title,
                        id: e.id,
                        isrequired: e.isrequired,
                        kind: e.kind,
                        solutions: e.solutions,
                        type: e.type,
                        points: kind,

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

    const editsolution = async (value: object) => {
        let questions: any = (await getDoc(doc(db, "forms", `${props.name}`))).data()
        let filter = questions.contentQuestion.map((e: any) => {
            if (e.id === props.id) {
                return {
                    Title: e.Title,
                    id: e.id,
                    isrequired: e.isrequired,
                    kind: e.kind,
                    solutions: value,
                    type: e.type
                }
            } else {
                return e
            }
        })
        await updateDoc(doc(db, "forms", `${props.name}`), {
            contentQuestion: filter
        })
    }


    let [title, setTitle] = useState("Question")







    useEffect(() => {
        const getDa = async () => {
            let questions: any = (await getDoc(doc(db, "forms", `${props.name}`))).data()
            let filter1 = questions.contentQuestion.filter((e: { id: string }) => e.id === props.id);
            setSol(filter1[0].solutions)
            setCheck(filter1[0].isrequired)
            setType(filter1[0].kind)
            setTitle(filter1[0].Title)
            setPoints(filter1[0]?.points)
        }


        return () => {
            getDa()
        }
    }, [])


    const updateObject = (array: object[] | any, id: number, newValues: object) => {

        const checker = array.filter((e) => {
            return e.iscorrect
        })
        const updatedArray = checker.length == 0 ? array.map(obj =>
            obj.id === id ? { ...obj, ...newValues } : obj
        ) : array

        updatedArray.sort((a, b) => a.id - b.id);
        return updatedArray;
    };
    const updateObject2 = (array: object[] | any, id: number, newValues: object) => {


        const updatedArray = array.map(obj =>
            obj.id === id ? { ...obj, ...newValues } : obj
        )

        updatedArray.sort((a, b) => a.id - b.id);
        return updatedArray;
    };


    return (
        <>

            <div className="question" draggable>
                <div className="edit_title_quetion flex justify-between px-[15px] max-md:flex-col">
                    <input type="text" className='p-[15px] rouded-[15px] w-[400px] border-l-[#798645] border-l-[5px]' placeholder={title} onBlur={(e: any) => {
                        changes("title", e.target.value)
                    }} />

                    <select
                        name="HeadlineAct"
                        id="HeadlineAct"
                        className="mt-1.5 w-[200px] rounded-lg border-gray-300 text-gray-700 sm:text-sm p-[10px]"
                        onChange={(e) => {
                            if (e.target.value === "radio") {
                                setType("radio")
                                changes("type", "radio")
                            } else if (e.target.value === "checkBox") {
                                setType("checkbox")
                                changes("type", "checkbox")
                            }

                        }}
                    >
                        <option value="">Please select</option>
                        <option value="radio">Radio 📻</option>
                        <option value="checkBox">CheckBox ✅</option>
                    </select>


                </div>
                <div className="radios px-[20px] mt-[20px]">
                    <form action="">

                        <>
                            {solutions.map((e: any) => (
                                <div className="elkbeer flex items-center">
                                    <div className="radio  flex items-center mb-[10px]">
                                        <input type={type} className='w-[20px] h-[20px]  mr-[10px]' name='solution' value="Solution 1" id='so1' />
                                        <input type="text" placeholder={e.name} className='border-b-[3px] border-b-[#ddd] p-[5px] pb-0' style={e.iscorrect ? { borderBottomColor: "green" } : {}} onChange={(a: any) => {
                                            let ma = solutions.map((ie: any) => {
                                                if (ie.id === e.id) {
                                                    return {
                                                        name: a.target.value,
                                                        id: ie.id
                                                    }
                                                } else {
                                                    return {
                                                        name: ie.name,
                                                        id: ie.id
                                                    }
                                                }
                                            })
                                            setSol(ma)
                                            editsolution(ma)
                                        }} />
                                    </div>
                                    <div className="two flex">
                                        <div className="delete text-red-600 text-[24px] ml-[30px] cursor-pointer" onClick={(a: any) => {
                                            let name2 = e.id
                                            let filterr = solutions.filter((e: { id: string }) => e.id !== name2)
                                            setSol(filterr)
                                            changes("solutions", filterr)

                                        }}>
                                            <MdDelete />
                                        </div>
                                        {props.testmode ? (
                                            <>
                                                {e.iscorrect ? (
                                                    <div className="correct text-red-500 text-[24px] ml-[15px] cursor-pointer" style={e.iscorrect ? { color: "red" } : {}} onClick={() => {
                                                        let arr = updateObject2(solutions, e.id, {
                                                            iscorrect: false,
                                                        })
                                                        setSol(arr)
                                                        changes("solutions", arr)
                                                    }}>
                                                        <FaDeleteLeft />
                                                    </div>
                                                ) : (
                                                    <div className="correct text-green-500 text-[24px] ml-[15px] cursor-pointer" style={e.iscorrect ? { color: "red" } : {}} onClick={() => {
                                                        let arr = updateObject(solutions, e.id, {
                                                            iscorrect: true,
                                                        })
                                                        setSol(arr)
                                                        changes("solutions", arr)
                                                    }}>
                                                        <MdOutlineDone />
                                                    </div>
                                                )}
                                            </>
                                        ) : null}
                                    </div>
                                </div>
                            ))}
                        </>
                        <span className='text-[#00CCDD] mb-[10px] flex items-center  cursor-pointer' onClick={() => {
                            solutions.push({
                                name: "write your solution",
                                iscorrect: false,
                                id: Date.now(),
                            })
                            setSol(solutions)


                            changes("solutions", solutions)
                        }}><span className='text-[25px] mr-[7px]'>+</span> Add Solution</span>
                    </form>
                </div>

                <div className="tools flex justify-between px-[20px] pb-[15px] items-center max-md:flex-col max-md:items-start max-md:gap-[20px]">
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
                    <div className="two flex gap-2 flex-row-reverse">
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
                        {props.testmode ? (
                            <div className="points">
                                <div className="flex items-center gap-1">
                                    <input
                                        type="number"
                                        min={1}
                                        placeholder={points}
                                        onChange={(e: any) => {
                                            changes("points", parseInt(e.target.value))
                                        }}
                                        className="h-10 p-[10px] w-24 rounded border-gray-200  sm:text-sm  "
                                    />
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>




        </>
    )
}

export default Question
