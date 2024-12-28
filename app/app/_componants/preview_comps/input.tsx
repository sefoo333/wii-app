import React, { useContext, useEffect, useState } from 'react'
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '@/app/_config/confg';
import { Contex } from '@/app/preview/[preview_id]/page';

function Input_pre(props: any) {

    let [checked, setCheck] = useState(false)





    let [req, setRequ] = useState(false)
    let [Title, setTitle] = useState("")

    useEffect(() => {
        const getDa = async () => {
            let questions: any = (await getDoc(doc(db, "forms", `${props.name}`))).data()
            let filter1 = questions.contentQuestion.filter((e: { id: string }) => e.id === props.id);
            setRequ(filter1[0].isrequired)
            setCheck(filter1[0].isrequired)
            setTitle(filter1[0].Title)
        }


        return () => {
            getDa()
        }
    }, [])

    const { valuee, setValue }: any = useContext(Contex);
    const { requ, setReq }: any = useContext(Contex);

    let [r, setR] = useState(false)

    return (
        <div className="text flex flex-col my-[15px] px-[15px] border-b-[#ccc] border-b-[1px] ">
            <div className="title mb-[15px]">
                <h2 className='text-[25px] font-[600] w-full'>{Title} {req ? (<span className='text-red-500'>*</span>) : null}</h2>
            </div>
            <div className="decription">
                <textarea onBlur={(e: any) => {
                    let arr = [...valuee]
                    arr.push({
                        kind: "input",
                        solution: e.target.value,
                        id_Question: props.id,
                        NameQuestion: Title,
                        isrequired: req,
                    })

                    if (props.isrequired) {
                        if (props.isrequired && e.target.value !== "" && !r) {
                            setR(true)
                            setReq(parseInt(requ) + 1)
                            console.log(requ)
                        } else {
                            console.log(requ, "t", props.isrequired)
                            setReq(parseInt(requ) - 1)
                            setR(false)
                            console.log(r)
                        }
                    }
                    setValue(arr)
                }} name="" className='w-[450px] max-md:w-fit p-[10px] text-[15px]' placeholder="Solution" id=""></textarea>
            </div>


        </div>
    )
}

export default Input_pre
