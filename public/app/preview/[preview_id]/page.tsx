"use client"

import React, { createContext, useEffect, useRef, useState } from 'react'
import { IoIosColorPalette } from "react-icons/io";
import { IoEyeOutline, IoPrintSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import Sidemenu from '../../_componants/sidemenu';
import "../../styles/style1.css"
import { CiStar, CiHeart } from "react-icons/ci";
import Element from '../../_componants/form_comps/question';
import { arrayUnion, doc, getDoc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../_config/confg';
import Rate from '../../_componants/form_comps/rate';
import Question from '../../_componants/form_comps/question';
import Selector from '../../_componants/form_comps/selector';
import Text_comp from '../../_componants/form_comps/text';
import Input_comp from '../../_componants/form_comps/input';
import Question_pre from '@/app/_componants/preview_comps/question';
import { SnackbarProvider, closeSnackbar, enqueueSnackbar } from 'notistack'

import { Lato } from "next/font/google";
import Input_pre from '@/app/_componants/preview_comps/input';
import Text_pre from '@/app/_componants/preview_comps/text';
import Rate_pre from '@/app/_componants/preview_comps/rate';

const inter = Lato({
    subsets: ["latin"],
    weight: ["100", "300", "400", "700", "900"]
});


export let Contex = createContext(null);



function page({ params }: any) {



    let [Name, setName] = useState("")

    let [data, setData]: any = useState([]);

    console.log(params)

    let [counter, setCount] = useState(0)


    useEffect(() => {
        const questions = onSnapshot(doc(db, "forms", `${params.preview_id}`), (doc: any) => {
            let da = doc.data().contentQuestion.map((e: any) => {
                if (e.type === "rates") {
                    return {
                        kind: "rate",
                        id: e.id,
                        isrequired: e.isrequired
                    }
                } else if (e.type === "question") {
                    return {
                        kind: "que",
                        id: e.id,
                        isrequired: e.isrequired,
                        points: e.points

                    }
                } else if (e.type === "text") {
                    return {
                        kind: "text",
                        id: e.id,
                        isrequired: e.isrequired

                    }
                } else if (e.type === "input") {
                    return {
                        kind: "input",
                        id: e.id,
                        isrequired: e.isrequired

                    }
                }
            })
            console.log(da)
            setData(da)
            setName(doc.data().MainForm.Title)

            let count = doc.data().contentQuestion.filter((e: { isrequired: boolean }) => {
                return e.isrequired;

            })

            setCount(count.length)
        })
        return () => {
            questions()
        }
    }, [])


    let [solution, editSolution] = useState([]);




    let [color, setColor] = useState("white");
    let [timerr, setTimer] = useState(false)

    let [title, setTitle] = useState("")
    let [desc, setDesc] = useState("")
    useEffect(() => {
        const changeco = async () => {
            let getdata: any = (await getDoc(doc(db, "forms", `${params.preview_id}`))).data()

            setColor(getdata.background)
            setTimer(getdata.Timer)
            setTitle(getdata.MainForm.Title)
            setDesc(getdata.MainForm.description)
        }

        document.body.style.background = color
        return () => {
            changeco()
        }
    })

    let [next, setNext] = useState(false)


    // let solutions = async () => {
    //     let getdata: any = (await getDoc(doc(db, "forms", `${params.preview_id}`))).data();
    //     let filterttt = getdata?.contentQuestion?.map((e: any) => {
    //         if (e.type === "question") {
    //             return {
    //                 Title: e.Title,
    //                 id: e.id,
    //                 solution: e.kind === "radio" ? "yes" : [true, false],
    //                 kind: e.kind
    //             }

    //         } else if (e.type === "input") {
    //             return {
    //                 Title: e.Title,
    //                 id: e.id,
    //                 solution_content: "",
    //             }
    //         } else if (e.type === "rates") {
    //             return {
    //                 Title: e.Title,
    //                 id: e.id,
    //                 rate_count: e.rate_count,
    //                 rate_kind: e.rate_kind,
    //             }
    //         } else {
    //             return e
    //         }
    //     })

    //     console.log(filterttt)

    //     try {
    //         await updateDoc(doc(db, "form_solution", `${params.preview_id}`), {
    //             solutions: filterttt,
    //         })
    //     } catch (err) {
    //         console.log("Error" + err)
    //     }
    // }







    let [valuee, setValue]: any = useState([]);
    let [requ, setReq] = useState(0)

    useEffect(() => {
        console.log(valuee)
    }, [valuee])

    useEffect(() => {
        console.log(requ)
    }, [requ])


    let [userName, setUserName] = useState("guest");


    let [final, setFinal] = useState(false)

    let [sec, setSec] = useState(0)
    let [minute, setminute] = useState(0)
    let [timeon, setTimeon] = useState(false)
    const uploadsolution = async () => {
        await updateDoc(doc(db, "form_solution", `${params.preview_id}`), {
            solutions: arrayUnion({
                UserName: userName,
                id: Date.now(),
                solutions: valuee,
                Time: `${minute}:${sec}`
            })
        })
    }





    useEffect(() => {
        let timer: any;
        if (timeon) {
            let num = 0
            let min = 0
            timer = setInterval(() => {
                num++
                if (num >= 60) {
                    num = 0
                    min++
                    setminute(min)
                }
                setSec(num)
            }, 1000);
        } else {
            clearInterval(timer)
            console.log("off")
        }

        return () => clearInterval(timer)

    }, [timeon])



    let filterpoints = valuee.map((e) => {
        return e.kind === "que" ? e.points : 0
    }).reduce((a, b) => a + b, 0)

    return (


        <div className={`parent  ${inter.className}`}>

            <SnackbarProvider />

            <div className="page w-full flex justify-center">
                <div className="content w-[700px]   mt-[30px] rounded-xl">
                    <div className={`section_one bg-slate-100 shadow-forms mt-[30px] rounded-xl ${next ? "block" : "hidden"} shadow-[0px 0px 12px 3px #ddd] ${final ? "hidden" : "block"}`}>
                        <div className="header_section bg-[#8612f1] text-white p-[10px] w-full ">
                            <h1>{Name}</h1>
                        </div>
                        <div className="main my-[40px] border-b-[1px] border-b-[#ddd] rounded-[10px] p-[20px]">
                            <div className="title text-[45px] font-bold">
                                <h1>{title}</h1>
                            </div>
                            <div className="description"
                            >
                                <p>{desc}</p>
                            </div>
                        </div>


                        <form action="" id="sss" method="post" onSubmit={(e) => {
                            e.preventDefault();
                            let arr = [...valuee];
                            let filterr = arr.map((e) => {
                                let ia = e.id;
                                return e.id !== ia
                            })
                            console.log(filterr)

                            if (requ == counter) {
                                uploadsolution()
                                setFinal(true)
                                setTimeon(false)
                            } else {
                                const test = enqueueSnackbar('Complete The requeried questions !', {
                                    variant: 'error',
                                    persist: true
                                })

                                setTimeout(() => {
                                    closeSnackbar(test)
                                }, 3000)
                            }
                        }}>
                            <div className="p">
                                <Contex.Provider value={{ valuee, setValue, requ, setReq }}>
                                    {data.map((e: any) => (
                                        <form>
                                            {e.kind === "que" ? (
                                                <Question_pre points={e.points} kind={e.kind} id={e.id} name={params.preview_id} isrequired={e.isrequired} />
                                            ) : e.kind === "rate" ? (
                                                <Rate_pre kind={e.kind} id={e.id} name={params.preview_id} isrequired={e.isrequired} />
                                            ) : e.kind === "text" ? (
                                                <Text_pre kind={e.kind} id={e.id} name={params.preview_id} isrequired={e.isrequired} />
                                            ) : e.kind === "input" ? (
                                                <Input_pre kind={e.kind} id={e.id} name={params.preview_id} isrequired={e.isrequired} />
                                            ) : null}
                                        </form>
                                    ))}
                                </Contex.Provider>
                            </div>

                            <div className="buttons w-full flex justify-between px-[30px] py-[15px] flex-row-reverse">


                                <div className="button mt-[30px] flex justify-end">
                                    <a
                                        className="group relative inline-block overflow-hidden border border-indigo-600 px-8 py-3 focus:outline-none focus:ring"
                                        href="#"

                                    >
                                        <input type="submit" value="" className='w-full h-full font-[600] absolute z-10' />
                                        <span
                                            className="absolute inset-y-0 left-0 w-[2px] bg-indigo-600 transition-all group-hover:w-full group-active:bg-indigo-500"
                                        ></span>

                                        <span
                                            className="relative text-sm font-medium text-indigo-600 transition-colors group-hover:text-white"
                                        >
                                            Send
                                        </span>
                                    </a>
                                </div>

                            </div>

                        </form>

                    </div>
                    <div className={`section bg-slate-100 mt-[30px] rounded-xl ${next ? "hidden" : "block"} ${final ? "hidden" : "block"}`}>
                        <div className="header_section bg-[#8612f1] text-white p-[10px] ">
                            <h1>Start</h1>
                        </div>

                        <div className="content">
                            <div className="main my-[40px] border-b-[1px] border-b-[#ddd] rounded-[10px] p-[20px]">
                                <div className="title font-bold" >
                                    <h1 className='text-[45px]'>{title}</h1>
                                    <p>{desc}</p>
                                </div>
                                <div className="start my-[15px]">
                                    <p>Click Next to start</p>
                                </div>
                                <form action="" className='flex flex-col cursor-pointer' onClick={(e) => {
                                    e.preventDefault()
                                    console.log(e.target)
                                }}>
                                    <div className="button mt-[30px] flex justify-end" onClick={() => {
                                        !next ? setNext(true) : setNext(false)
                                        setTimeon(true)
                                    }}>
                                        <a
                                            className="group relative inline-block overflow-hidden border border-indigo-600 px-8 py-3 focus:outline-none focus:ring"
                                            href="#"
                                        >
                                            <input type="submit" value="" className='w-full h-full font-[600] absolute z-10' />
                                            <span
                                                className="absolute inset-y-0 left-0 w-[2px] bg-indigo-600 transition-all group-hover:w-full group-active:bg-indigo-500"
                                            ></span>

                                            <span
                                                className="relative text-sm font-medium text-indigo-600 transition-colors group-hover:text-white"
                                            >
                                                Next
                                            </span>
                                        </a>
                                    </div>

                                </form>

                            </div>



                        </div>
                    </div>
                </div>
            </div>


            <div className={`final bg-slate-100 mt-[30px] rounded-xl  absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[600px] max-md:w-[400px] ${final ? "block" : "hidden"}`}>
                <div className="header_section bg-[#8612f1] text-white p-[10px] w-full ">
                    <h1>Thank you to solution the form {Name}</h1>
                </div>
                <div className="content  p-[20px]">
                    <h1 className='font-[700] text-[30px] uppercase'>Thank You !</h1>
                    <p className='text-[20px]'>Your Form is submited to Admin !</p>
                    <p>Time :   {minute}:{sec}</p>
                    <p>points :  {filterpoints}</p>
                </div>
                <div className="buttons mt-[10px] p-[15px]">
                    <div className="button flex justify-end">
                        <a
                            className="group relative inline-block overflow-hidden border border-indigo-600 px-8 py-3 focus:outline-none focus:ring"
                            href="#"
                            onClick={() => {
                                location.reload()
                            }}
                        >
                            <input type="submit" value="" className='w-full h-full font-[600] absolute z-10' />
                            <span
                                className="absolute inset-y-0 left-0 w-[2px] bg-indigo-600 transition-all group-hover:w-full group-active:bg-indigo-500"
                            ></span>

                            <span
                                className="relative text-sm font-medium text-indigo-600 transition-colors group-hover:text-white"
                            >
                                Resend Other
                            </span>
                        </a>
                    </div>
                </div>
            </div>

            {timerr ? (
                <div className="timer fixed right-[20px] bottom-[33px]">
                    <span className="whitespace-nowrap rounded-[10px] bg-purple-100 px-[25px] py-[13px] text-xl text-blue-950">
                        {minute}:{sec}
                    </span>
                </div>
            ) : null}

        </div>
    )
}

export default page
