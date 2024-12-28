import React, { useContext, useEffect, useState } from 'react'
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '@/app/_config/confg';
import { Contex } from '@/app/preview/[preview_id]/page';

function Input_pre_dis(props: any) {
    return (
        <div className="text flex flex-col my-[15px] px-[15px] border-b-[#ccc] border-b-[1px] " draggable>
            <div className="title mb-[15px]">
                <h2 className='text-[25px] font-[600] w-full'>{props.title} {props.isrequired ? (<span className='text-red-500'>*</span>) : null}</h2>
            </div>
            <div className="decription">
                <textarea readOnly value={props.on} name="" className='w-[450px] p-[10px] text-[15px]' placeholder="Solution" id=""></textarea>
            </div>


        </div>
    )
}

export default Input_pre_dis
