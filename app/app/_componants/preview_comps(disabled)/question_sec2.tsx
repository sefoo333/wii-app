"use client"


import React, { useContext, useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";
import { CiStar, CiHeart } from "react-icons/ci";
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '@/app/_config/confg';
import { Contex } from '@/app/preview/[preview_id]/page';
import { useFormState } from 'react-dom';

interface question {
    kind: string,
    id: string,
    name: string,
    isrequired: boolean,
    title: string,
    ischeacked: boolean,
    idsol: number,
    count: number,
    soly: string[],
    correct: boolean,
}

function Question_pre_dis(props: question) {
    let [type, setType] = useState("radio")
    let [solutions, setSol]: any = useState([])
    const getDa = async () => {
        let questions: any = (await getDoc(doc(db, "forms", `${props.name}`))).data()
        let filter1 = questions.contentQuestion.filter((e: { id: string }) => e.id === props.id);
        const edit = filter1[0].solutions.map((e) => {
            if (props.idsol === e.id) {
                return {
                    name: e.name,
                    ischeacked: props.ischeacked,
                    iscorrect: e.iscorrect
                }
            } else {
                return {
                    name: e.name,
                    ischeacked: false,
                    iscorrect: e.iscorrect
                }
            }
        })
        setSol(edit)

        console.log("filter1", filter1)
    }
    useEffect(() => {
        getDa()
    }, [])
    useEffect(() => {
        getDa()
    }, [props.count])
    const [valuee, setValue]: any = useState("");
    let [r, setR] = useState(false)


    console.log(valuee)
    return (
        <>
            <div className="question border-b-[#ccc] border-b-[1px]">
                <div className="edit_title_quetion flex justify-between px-[15px]">
                    <h2 className='text-[25px] font-[600] w-full'>{props.title} {props.isrequired ? (<span className='text-red-500'>*</span>) : null}</h2>
                </div>
                <div className="radios px-[20px] mt-[15px]">

                    <>
                        {solutions.map((e: any) => (
                            <div className="elkbeer flex items-center rounded-lg" style={e.iscorrect && e.ischeacked ? { backgroundColor: "#00ff002b", padding: "10px 0" } : e.iscorrect == false || e.iscorrect == undefined && e.ischeacked ? { backgroundColor: "rgb(255 0 0 / 17%)", padding: "10px 0" } : {}}>
                                <div className="radio  flex items-center mb-[10px]">
                                    <input disabled checked={e.ischeacked} type={props.kind} className='w-[20px] h-[20px]  mr-[10px]' name='solution' value="Solution 1" id='so1' />
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

export default Question_pre_dis
