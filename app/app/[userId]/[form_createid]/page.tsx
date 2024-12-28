"use client"

import React, { useEffect, useRef, useState } from 'react'
import { IoIosColorPalette } from "react-icons/io";
import { IoEyeOutline, IoPrintSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import Sidemenu from '../../_componants/sidemenu';
import "../../styles/style1.css"
import { CiStar, CiHeart } from "react-icons/ci";
import Element from '../../_componants/form_comps/question';
import { deleteDoc, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../_config/confg';
import Rate from '../../_componants/form_comps/rate';
import Question from '../../_componants/form_comps/question';
import Selector from '../../_componants/form_comps/selector';
import Text_comp from '../../_componants/form_comps/text';
import Input_comp from '../../_componants/form_comps/input';
import Link from 'next/link';
import { FaUsers } from "react-icons/fa";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Baro from '../../_componants/bar';

import { FaUserAlt, FaUserFriends } from "react-icons/fa";
import { MdOutlineNavigateNext } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import Question_pre_dis from '../../_componants/preview_comps(disabled)/question_sec2';
import Rate_pre_dis from '../../_componants/preview_comps(disabled)/rate';
import Input_pre_dis from '../../_componants/preview_comps(disabled)/input_sec2';
import { IoSettingsSharp } from "react-icons/io5";
import Settings from '../../_componants/settings';
import { LuImagePlus } from "react-icons/lu";
import { MdDragIndicator } from "react-icons/md";
import { closeSnackbar, enqueueSnackbar, SnackbarProvider } from 'notistack';
import { IoMdPrint } from "react-icons/io";
import "../../styles/print.css"
import { AiOutlineClear } from "react-icons/ai";
import { IoHome } from "react-icons/io5";
import { onAuthStateChanged } from 'firebase/auth';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);


function page({ params }: any) {


    let [id, setId] = useState("")
    let [active, setActive] = useState(false)

    let [data, setData]: any = useState([]);
    let [data2, setData2] = useState([])
    let [testmode, setTestmode] = useState(false)
    let [title, setTitle] = useState("")
    let [desc, setDesc] = useState("")
    let [timer, setTimer] = useState(false)
    useEffect(() => {
        const questions = onSnapshot(doc(db, "forms", `${params.form_createid}`), (doc: any) => {
            let da = doc.data().contentQuestion.map((e: any) => {
                if (e.type === "rates") {
                    return {
                        kind: "rate",
                        id: e.id,
                        Title: e.Title,
                    }
                } else if (e.type === "question") {
                    return {
                        kind: "que",
                        id: e.id,
                        Title: e.Title,
                        questions: e.solutions
                    }
                } else if (e.type === "text") {
                    return {
                        kind: "text",
                        id: e.id,
                        Title: e.Title,
                    }
                } else if (e.type === "input") {
                    return {
                        kind: "input",
                        id: e.id,
                        Title: e.Title,
                    }
                }
            })
            console.log(da)
            setData(da)
            setData2(doc.data().contentQuestion)
            setTitle(doc.data().MainForm.Title)
            setDesc(doc.data().MainForm.description)
            setColor(doc.data().background)
            setTestmode(doc.data().testmode)
            setId(doc.data().userEditor)
            setTimer(doc.data().Timer)
        })
        return () => {
            questions()
        }
    }, [])


    // useEffect(() => {
    //     const authy = onAuthStateChanged(auth, (user) => {
    //         if (user?.uid === id) {
    //             console.log("welcome")
    //         } else {
    //             window.open("/home", "_parent")
    //         }
    //     })
    //     return () => {
    //         authy()
    //     }
    // }, [])


    let [color, setColor] = useState("white")


    const changecolor = async () => {
        await updateDoc(doc(db, "forms", `${params.form_createid}`), {
            background: color
        })
    }
    document.body.style.background = color


    const Delete = async () => {
        await deleteDoc(doc(db, "forms", `${params.form_createid}`))
        window.open("/home")
    }


    let [quee, setQuee] = useState([])
    let [quee2, setQuee2]: any = useState([])
    let [Namety, setNamety] = useState("")
    const getData = async () => {
        let datas: any = (await getDoc(doc(db, "form_solution", `${params.form_createid}`))).data();
        let datas2: any = (await getDoc(doc(db, "forms", `${params.form_createid}`))).data();

        let questions = datas2.contentQuestion.map((e) => {
            return {
                Namequestion: e.Title,
                id: e.id,
                kind: e.type,
                isrequired: e.isrequired,
                solutions: e.solutions,
            }
        })




        setQuee(questions)
        setNamety(datas2.ProjectName)

    }
    useEffect(() => {
        const questions2 = onSnapshot(doc(db, "form_solution", `${params.form_createid}`), (doc: any) => {

            setQuee2(doc.data().solutions)
        })

        return () => {
            getData();
            questions2()
        }
    }, [])


    const filterquestions = quee2.map((e: any) => {
        return e.solutions
    })

    console.log('tr', filterquestions)
    const filterquestions2 = filterquestions.map((e: any) => {
        return e.filter((item, index, self) => {
            if (item.type === "checkbox") {
                return index === self.findLastIndex((t) => t.id === item.id)
            } else {
                return index === self.findLastIndex((t) => t.id_Question === item.id_Question)
            }
        })
    })

    const solutions = filterquestions2.flat(Infinity)
    const s2 = solutions.filter((e) => {
        return e.kind === "que"
    })
    let [quantity, setQua] = useState(1)
    let [inde, setInde] = useState(0)

    let [switcher, setSwitch] = useState(false)
    let [switcher2, setSwitch2] = useState(true)

    let [active2, setActive2] = useState(false)

    let [titleAct, setAct] = useState(false)
    let [descAct, setAct2] = useState(false)

    const changet_d = async (bol: boolean, value: string) => {
        if (bol) {
            await updateDoc(doc(db, "forms", `${params.form_createid}`), {
                "MainForm.Title": value
            })
        } else {
            await updateDoc(doc(db, "forms", `${params.form_createid}`), {
                "MainForm.description": value
            })
        }
    }

    console.log("this is filter", filterquestions2)



    useEffect(() => { console.log(quantity) }, [quantity])

    const handleDragStart = (e: any, index: number) => {
        e.dataTransfer.setData("draggedItemIndex", index);
    };

    const handleDrop = async (e: any, dropIndex: number) => {
        const draggedItemIndex = e.dataTransfer.getData("draggedItemIndex");
        const newItems = [...data2];
        const [draggedItem] = newItems.splice(draggedItemIndex, 1);
        newItems.splice(dropIndex, 0, draggedItem);
        await updateDoc(doc(db, "forms", `${params.form_createid}`), {
            contentQuestion: newItems
        })
    };

    const deletesol = async () => {
        await updateDoc(doc(db, "form_solution", `${params.form_createid}`), {
            solutions: [],
        })
    }
    let [danger, setdanger] = useState(false)

    const action = (snackbarId: any) => (
        <>
            <button className='p-[10px] text-red-500' onClick={() => {
                deletesol()
                closeSnackbar(snackbarId)
            }}>
                Yes
            </button>
            <button className='p-[10px] text-blue-500' onClick={() => { closeSnackbar(snackbarId) }}>
                No
            </button>
        </>
    );

    return (
        <>
            <SnackbarProvider />
            <div className="parent">
                <div className="nav_creator hide_print flex justify-between shadow-forms px-[40px] items-center w-full h-[50px] bg-[#F5F5F5] max-md:flex-col max-md:h-fit max-md:py-[13px] max-md:gap-[20px]">
                    <h1 className='text-[20px] font-bold'>{Namety}</h1>
                    <div className="tools flex justify-center items-center">
                        <div className="color_edit relative text-[#424242] text-[20px] ml-[15px] cursor-pointer" >
                            <div className="test" onClick={() => active ? setActive(false) : setActive(true)}>
                                <IoIosColorPalette />
                            </div>
                            {active ? (
                                <div className="window_colors absolute p-[10px] right-0 w-[200px] flex justify-center bg-slate-300 rounded-lg">
                                    <fieldset className="flex flex-wrap justify-center gap-3" onChange={() => {

                                    }}>
                                        <legend className="sr-only">Color</legend>

                                        <label
                                            htmlFor="ColorBlack"
                                            className="block size-8 cursor-pointer rounded-full bg-black shadow-sm has-[:checked]:ring-2 has-[:checked]:ring-black has-[:checked]:ring-offset-2"
                                        >
                                            <input
                                                type="radio"
                                                name="ColorOption"
                                                value="#000"
                                                id="ColorBlack"
                                                className="sr-only"

                                                onClick={(e) => {
                                                    setColor(e.currentTarget.value)
                                                    changecolor()
                                                }}
                                            />

                                            <span className="sr-only"> Texas Tea </span>
                                        </label>

                                        <label
                                            htmlFor="ColorRed"
                                            className="block size-8 cursor-pointer rounded-full bg-red-500 shadow-sm has-[:checked]:ring-2 has-[:checked]:ring-red-500 has-[:checked]:ring-offset-2"
                                        >
                                            <input type="radio" name="ColorOption" value="rgb(239 68 68 / 1)" id="ColorRed" className="sr-only" onClick={(e) => {
                                                setColor(e.currentTarget.value)
                                                changecolor()
                                            }} />

                                            <span className="sr-only">Fiesta Red</span>
                                        </label>

                                        <label
                                            htmlFor="ColorBlue"
                                            className="block size-8 cursor-pointer rounded-full bg-blue-500 shadow-sm has-[:checked]:ring-2 has-[:checked]:ring-blue-500 has-[:checked]:ring-offset-2"
                                        >
                                            <input type="radio" name="ColorOption" value="rgb(59 130 246 / 1)" id="ColorBlue" className="sr-only" onClick={(e) => {
                                                setColor(e.currentTarget.value)
                                                changecolor()
                                            }} />

                                            <span className="sr-only">Cobalt Blue</span>
                                        </label>

                                        <label
                                            htmlFor="ColorGold"
                                            className="block size-8 cursor-pointer rounded-full bg-amber-500 shadow-sm has-[:checked]:ring-2 has-[:checked]:ring-amber-500 has-[:checked]:ring-offset-2"

                                        >
                                            <input type="radio" name="ColorOption" id="ColorGold" className="sr-only" value="#f59e0b"
                                                onClick={(e) => {
                                                    setColor(e.currentTarget.value)
                                                    changecolor()
                                                }}
                                            />

                                            <span className="sr-only">Goldtop</span>
                                        </label>
                                        <label
                                            htmlFor="colorliGreen"

                                            className="block size-8 cursor-pointer rounded-full bg-gradient-to-r from-[#11998e] to-[#38ef7d] shadow-sm has-[:checked]:ring-2 has-[:checked]:ring-amber-500 has-[:checked]:ring-offset-2"
                                        >
                                            <input type="radio" name="ColorOption" value="ColorGold" id="colorliGreen" className="sr-only" value="linear-gradient(40deg, #11998e, #38ef7d)"
                                                onClick={(e) => {
                                                    setColor(e.currentTarget.value)
                                                    changecolor()
                                                }}
                                            />

                                            <span className="sr-only">Goldtop</span>
                                        </label>
                                        <label
                                            htmlFor="ColorLiGold"
                                            className="block size-8 cursor-pointer rounded-full bg-gradient-to-r from-[#FFB75E] to-[#ED8F03] shadow-sm has-[:checked]:ring-2 has-[:checked]:ring-amber-500 has-[:checked]:ring-offset-2"
                                        >
                                            <input type="radio" name="ColorOption" id="ColorLiGold" className="sr-only" value="linear-gradient(40deg, #FFB75E, #ED8F03)"
                                                onClick={(e) => {
                                                    setColor(e.currentTarget.value)
                                                    changecolor()
                                                }} />

                                            <span className="sr-only">Goldtop</span>
                                        </label>
                                        <label
                                            htmlFor="colorLigb"
                                            className="block size-8 cursor-pointer rounded-full bg-gradient-to-r from-[#00C9FF] to-[#92FE9D] shadow-sm has-[:checked]:ring-2 has-[:checked]:ring-amber-500 has-[:checked]:ring-offset-2"
                                        >
                                            <input type="radio" name="ColorOption" id="colorLigb" className="sr-only" value="linear-gradient(40deg, #00C9FF, #92FE9D)"
                                                onClick={(e) => {
                                                    setColor(e.currentTarget.value)
                                                    changecolor()
                                                }} />

                                            <span className="sr-only">Goldtop</span>
                                        </label>
                                        <label
                                            htmlFor="colorLigre"
                                            className="block size-8 cursor-pointer rounded-full bg-gradient-to-r from-[#005C97] to-[#363795] shadow-sm has-[:checked]:ring-2 has-[:checked]:ring-amber-500 has-[:checked]:ring-offset-2"
                                        >
                                            <input type="radio" name="ColorOption" id="colorLigre" className="sr-only" value="linear-gradient(40deg, #005C97,#363795)"
                                                onClick={(e) => {
                                                    setColor(e.currentTarget.value)
                                                    changecolor()
                                                }} />

                                            <span className="sr-only">Goldtop</span>
                                        </label>
                                    </fieldset>
                                </div>
                            ) : null}
                        </div>
                        <div className="settings text-[#424242] text-[25px] ml-[25px] cursor-pointer" onClick={() => active2 ? setActive2(false) : setActive2(true)}>
                            <IoSettingsSharp />
                        </div>
                        <div className="preveiw text-[#424242] text-[25px] ml-[25px] cursor-pointer">
                            <Link href={`/preview/${params.form_createid}`}>
                                <IoEyeOutline />
                            </Link>
                        </div>
                        <div className="print text-[#424242] text-[25px] ml-[25px] cursor-pointer" onClick={() => document.body.style.background = "whitesmoke"}>
                            <Link href={"/home"}>
                                <IoHome />
                            </Link>
                        </div>
                        <div className="delete text-[#424242] text-[25px] ml-[25px] cursor-pointer" onClick={() => {
                            Delete()
                        }}>
                            <MdDelete />
                        </div>
                        <div className="users_solution text-[#424242] text-[25px] ml-[25px] cursor-pointer" onClick={() => switcher ? setSwitch(false) : setSwitch(true)}>
                            <FaUsers />
                        </div>

                    </div>
                </div>


                <div className="page w-full flex justify-center ">

                    {switcher ? (
                        <div className="content_two bg-slate-100 rounded-3xl p-[30px]  w-[700px]   mt-[30px] rounded-xls max-md:w-[392px]">
                            <div className="main text-[30px] font-[900] uppercase ">
                                <h1>User solution</h1>
                            </div>



                            <div className="flex  hide_print justify-center rounded-lg border border-gray-100 bg-gray-100 p-1">
                                <button
                                    className=" mt-[30px] inline-flex items-center  shadow-sm bg-white gap-3 rounded-md py-[16px] px-[90px] max-md:px-[45px] text-lg text-gray-500 hover:text-gray-700 focus:relative"
                                    onClick={() => setSwitch2(false)}
                                >
                                    <FaUserAlt size={20} />

                                    Single
                                </button>

                                <button
                                    className="mt-[30px] inline-flex items-center  shadow-sm bg-white gap-3 rounded-md py-[16px] px-[90px]  max-md:px-[45px] text-lg text-gray-500 hover:text-gray-700 focus:relative"
                                    onClick={() => setSwitch2(true)}
                                >
                                    <FaUserFriends size={20} />

                                    General
                                </button>


                            </div>
                            {/* general */}
                            {switcher2 ? (
                                <div className="general">
                                    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                                        <div className="mx-auto max-w-3xl text-center">
                                            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Solutions</h2>

                                            <p className="mt-4 text-gray-500 sm:text-xl">
                                                Great ! Your Form is have {quee2.length} users
                                            </p>
                                        </div>

                                        <dl className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-1 lg:grid-cols-1">
                                            <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
                                                <dt className="order-last text-lg font-medium text-gray-500">Users</dt>

                                                <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">{quee2.length}</dd>
                                            </div>
                                        </dl>
                                    </div>
                                    <div className="charts">
                                        <div className="main text-3xl font-bold text-gray-900 sm:text-4xl">
                                            <h1>Review</h1>
                                        </div>
                                        <div className="charts mt-[20px]">
                                            {data.map((a) => (
                                                <form>

                                                    {a.kind === "que" ? (
                                                        <div className="chart my-[15px] border-t-[1px] border-t-[#ddd] ">
                                                            <div className="main text-xl font-bold text-gray-900 mt-[7px]">
                                                                <h1>
                                                                    - {a.Title}
                                                                </h1>
                                                            </div>
                                                            <div className="bar">
                                                                <Baro data={a.questions} id={a.id} solutions={s2} />
                                                            </div>
                                                        </div>
                                                    ) : null}

                                                </form>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : null}

                            {/* single */}

                            {!switcher2 ? (
                                <div className="single">
                                    <div className="main flex hide_print justify-between mt-[22px] items-center">
                                        <div className="two flex">
                                            <div className="delete text-slate-500 text-[25px] ml-[25px] cursor-pointer" onClick={() => {
                                                setdanger(true)
                                                enqueueSnackbar('Clear All Solutions ?', {
                                                    action,
                                                })

                                            }}>
                                                <AiOutlineClear />
                                            </div>
                                            <div className="print text-slate-500 text-[25px] ml-[10px] cursor-pointer" onClick={() => {
                                                print()
                                            }}>
                                                <IoMdPrint />
                                            </div>
                                        </div>
                                        <div className="quantity">
                                            <div>

                                                <div className="flex items-center rounded border border-gray-200">
                                                    <button type="button" className="size-10 text-[30px] rotate-[180deg] leading-10 text-gray-600 transition hover:opacity-75 minus">
                                                        <span onClick={() => {
                                                            if (quantity > 0 && inde != 0) {
                                                                setQua(quantity => quantity - 1)
                                                                setInde(inde => inde - 1)
                                                            }
                                                        }}>
                                                            <MdOutlineNavigateNext />
                                                        </span>
                                                    </button>


                                                    <input
                                                        type="number"
                                                        value={quantity}
                                                        className="h-10 vip w-16 max-md:w-[50px] border-transparent text-center  sm:text-sm "
                                                    />
                                                    <span className='ml-[5px]' > /{quee2.length}</span>

                                                    <button type="button" className="size-10 text-[30px] leading-10 text-gray-600 transition hover:opacity-75 plus" >
                                                        <span onClick={() => {
                                                            if (quantity !== quee2.length) {
                                                                setQua(quantity => quantity + 1)
                                                                setInde(inde => inde + 1)
                                                            }
                                                        }}>
                                                            <MdOutlineNavigateNext />
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>



                                    </div>


                                    <div className="mx-auto hide_print max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                                        <div className="flex justify-around items-center gap-5">
                                            {timer ? (
                                                <dl className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-1 lg:grid-cols-1">
                                                    <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
                                                        <dt className="order-last text-lg font-medium text-gray-500">Time</dt>

                                                        <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">{quee2[inde].Time}</dd>
                                                    </div>
                                                </dl>
                                            ) : null}
                                            <dl className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-1 lg:grid-cols-1">
                                                <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
                                                    <dt className="order-last text-lg font-medium text-gray-500">Points</dt>

                                                    <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">{filterquestions2[inde].map((e) => {
                                                        return e.kind === "que" ? e.points : 0
                                                    }).reduce((a, b) => a + b, 0)}
                                                    </dd>
                                                </div>
                                            </dl>
                                        </div>
                                    </div>


                                    <div className="form ready_for_print mt-[30px]">
                                        {filterquestions2.length > 0 ? (
                                            <>
                                                {filterquestions2[inde].map((a) => (
                                                    <>
                                                        <form>
                                                            {a.kind === "que" ? (
                                                                <Question_pre_dis correct={a.iscorrect} soly={filterquestions2[inde]} count={quantity} title={a.NameQuestion} idsol={a.id} ischeacked={a.ischeacked} kind={a.type} id={a.id_Question} name={params.form_createid} isrequired={a.isrequired} />
                                                            ) : a.kind === "rate" ? (
                                                                <Rate_pre_dis title={a.NameQuestion} on={a.solution} kind={a.kind} id={a.id} name={params.form_createid} isrequired={a.isrequired} />
                                                            ) : a.kind === "input" ? (
                                                                <Input_pre_dis title={a.NameQuestion} on={a.solution} kind={a.kind} id={a.id} name={params.form_createid} isrequired={a.isrequired} />
                                                            ) : null}
                                                        </form>
                                                    </>
                                                ))}
                                            </>
                                        ) : (
                                            <div className="grid  place-content-center px-4">
                                                <h1 className="uppercase tracking-widest text-gray-500">No Solutions</h1>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    ) : (
                        <div className="content w-[700px]   mt-[30px] rounded-xl  max-md:w-[392px]">
                            <div className="section_one shadow-forms bg-[#F5F5F5] mt-[30px] rounded-xl">
                                <div className="main my-[40px] border-b-[1px] border-b-[#ddd] rounded-[10px] p-[20px]">
                                    <div className="title text-[45px] font-bold">

                                        {titleAct ? (
                                            <input type="text" onBlur={(e) => {
                                                setAct(false)
                                                if (e.target.value !== "") {
                                                    changet_d(true, e.target.value)
                                                }
                                            }} className='p-[15px] mb-[10px] rouded-[15px] w-[400px] border-l-[#798645] border-l-[5px]' placeholder='edit here' />
                                        ) : (
                                            <h1 onClick={() => {
                                                setAct(true)
                                            }}>{title}</h1>
                                        )}
                                    </div>
                                    <div className="description">
                                        {descAct ? (
                                            <input onBlur={(e) => {
                                                setAct2(false)
                                                if (e.target.value !== "") {
                                                    changet_d(false, e.target.value)
                                                }
                                            }} className='p-[13px] rouded-[13px] w-[200px] border-l-[#798645] border-l-[5px]' type="text" placeholder='edit here' />
                                        ) : (
                                            <p onClick={() => {
                                                setAct2(true)
                                            }}>{desc}</p>
                                        )}
                                    </div>
                                    {/* <div className="image mt-[20px] flex flex-row-reverse relative">
                                        <input type="file fixed right-0 opacity-0 w-[150px]" onChange={(e: any) => {
                                            uploadimage(e.target.files[0])
                                        }} className="fixed right-0 opacity-0 w-[150px]" />
                                        <span className='text-[#00CCDD] mb-[10px] flex items-center  cursor-pointer' onClick={() => {
                                        }}><span className='text-[25px] mr-[7px]'><LuImagePlus /></span> Add Image</span>
                                    </div> */}
                                </div>


                                <div className="p">
                                    {data.map((e: any, index: number) => (
                                        <>
                                            {e.kind === "que" ? (
                                                <div className="question my-[55px]" draggable onDragStart={(e) => {
                                                    handleDragStart(e, index)
                                                }}
                                                    onDragOver={(e) => e.preventDefault()}
                                                    onDrop={(e) => {
                                                        handleDrop(e, index)
                                                    }}
                                                >

                                                    <Question kind={e.kind} testmode={testmode} id={e.id} name={params.form_createid} />
                                                </div>
                                            ) : e.kind === "rate" ? (
                                                <div className="rate" draggable onDragStart={(e) => {
                                                    handleDragStart(e, index)
                                                }}
                                                    onDragOver={(e) => e.preventDefault()}
                                                    onDrop={(e) => {
                                                        handleDrop(e, index)
                                                    }}
                                                >

                                                    <Rate kind={e.kind} id={e.id} testmode={testmode} name={params.form_createid} />
                                                </div>
                                            ) : e.kind === "text" ? (
                                                <div className="text " draggable onDragStart={(e) => {
                                                    handleDragStart(e, index)
                                                }}
                                                    onDragOver={(e) => e.preventDefault()}
                                                    onDrop={(e) => {
                                                        handleDrop(e, index)
                                                    }}
                                                >
                                                    <Text_comp kind={e.kind} id={e.id} name={params.form_createid} />
                                                </div>
                                            ) : e.kind === "input" ? (
                                                <div className="input" draggable onDragStart={(e) => {
                                                    handleDragStart(e, index)
                                                }}
                                                    onDragOver={(e) => e.preventDefault()}
                                                    onDrop={(e) => {
                                                        handleDrop(e, index)
                                                    }}
                                                >
                                                    <Input_comp kind={e.kind} id={e.id} name={params.form_createid} />
                                                </div>
                                            ) : null}
                                        </>
                                    ))}
                                </div>


                            </div>
                            {/* <div className="section bg-[#F5F5F5] mt-[30px] rounded-xl">
                                <div className="header_section bg-[#8612f1] text-white p-[10px] ">
                                    <h1>section 2</h1>
                                </div>

                                <div className="content">
                                    <div className="main my-[40px] border-b-[1px] border-b-[#ddd] rounded-[10px] p-[20px]">
                                        <div className="title text-[45px] font-bold">
                                            <h1 onDoubleClick={() => {

                                            }}>Form</h1>
                                            <input type="text" className='hidden' placeholder='edit here' />
                                        </div>
                                        <div className="description">
                                            <p>lorelorelaofkfsmgfdogmodag</p>
                                            <input className='hidden' type="text" placeholder='edit here' />
                                        </div>
                                    </div>



                                </div>
                            </div> */}
                        </div>
                    )}
                </div>



                <Sidemenu name={params.form_createid} />
            </div>
            {active2 ? (
                <Settings Name={params.form_createid} />
            ) : null}
        </>
    )
}

export default page
