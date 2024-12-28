"use client"


import React, { useContext, useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";
import { CiStar, CiHeart } from "react-icons/ci";
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '@/app/_config/confg';
import { Contex } from '@/app/preview/[preview_id]/page';
import { useFormState } from 'react-dom';

function Question_pre(props: { kind: string, id: string, name: string, isrequired: boolean, points: number }) {
    let [type, setType] = useState("radio")


    let [checked, setCheck] = useState(false)
    let [solutions, setSol]: any = useState([])


    // for questions






    let [title, setTitle] = useState("Question")




    let [req, setRequ] = useState(false)



    useEffect(() => {
        const getDa = async () => {
            let questions: any = (await getDoc(doc(db, "forms", `${props.name}`))).data()
            let filter1 = questions.contentQuestion.filter((e: { id: string }) => e.id === props.id);
            setSol(filter1[0].solutions)
            setCheck(filter1[0].isrequired)
            setType(filter1[0].kind)
            setTitle(filter1[0].Title)
            setRequ(filter1[0].isrequired)
        }


        return () => {
            getDa()
        }

    }, [])
    const { valuee, setValue }: any = useContext(Contex);
    const { requ, setReq }: any = useContext(Contex);
    let [r, setR] = useState(false)


    console.log(solutions)
    return (
        <>
            <div className="question border-b-[#ccc] border-b-[1px]">
                <div className="edit_title_quetion flex justify-between px-[15px]">
                    <h2 className='text-[25px] font-[600] w-full'>{title} {req ? (<span className='text-red-500'>*</span>) : null}</h2>
                </div>
                <div className="radios px-[20px] mt-[15px]">

                    <>
                        {solutions.map((e: any) => (
                            <div className="elkbeer flex items-center">
                                <div className="radio  flex items-center mb-[10px]">
                                    <input onClick={(a: any) => {
                                        let arr = [...valuee]
                                        arr.push({
                                            kind: "que",
                                            solution: e.name,
                                            id: e.id,
                                            id_Question: props.id,
                                            ischeacked: a.target.checked,
                                            NameQuestion: title,
                                            isrequired: req,
                                            type: type,
                                            iscorrect: e.iscorrect || e.iscorrect !== undefined ? true : false,
                                            points: e.iscorrect || e.iscorrect !== undefined ? props.points : 0
                                        })
                                        setValue(arr)
                                        console.log("h")
                                        if (props.isrequired) {
                                            if (props.isrequired && a.target.checked && !r) {
                                                setR(true)
                                                setReq(parseInt(requ) + 1)
                                            } else if (type === "checkbox") {
                                                setR(false)
                                                setReq(parseInt(requ) - 1)
                                            }
                                        }
                                    }} type={type} className='w-[20px] h-[20px]  mr-[10px]' name='solution' value="Solution 1" id='so1' />
                                    <span>{e.name}</span>
                                </div>
                            </div>
                        ))}
                    </>

                </div>


            </div>




        </>
    )
}

export default Question_pre
