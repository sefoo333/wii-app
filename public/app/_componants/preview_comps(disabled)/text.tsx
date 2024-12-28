"use client"

import React, { useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";
import { CiStar, CiHeart } from "react-icons/ci";
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '@/app/_config/confg';

function Text_pre(props: any) {


    let [checked, setCheck] = useState(false)
    let [description, setDisc] = useState("")
    let [title, setTitle] = useState("")


    useEffect(() => {

        const getDa = async () => {
            let questions: any = (await getDoc(doc(db, "forms", `${props.name}`))).data()
            let filter1 = questions.contentQuestion.filter((e: { id: string }) => e.id === props.id);
            setTitle(filter1[0].Title)
            setDisc(filter1[0].description)
        }


        return () => {
            getDa()
        }
    }, [])


    return (
        <div className="text flex flex-col my-[15px] px-[15px]  border-b-[#ccc] border-b-[1px] py-[15px]">
            <div className="title mb-[15px]">
                <h2 className='text-[30px] font-[600] w-full'>{title}</h2>
            </div>
            <div className="decription">
                <p className='text-[17px]'>{description}</p>
            </div>

        </div>
    )
}

export default Text_pre
