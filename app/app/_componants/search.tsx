"use client"
import React, { useContext } from 'react'
import { Seeea } from '../home/page'

function Search() {
    let { setSearch }: any = useContext(Seeea)
    return (
        <div className="relative">
            <label htmlFor="Search" className="sr-only"> Search </label>

            <input
                type="text"
                id="Search"
                onChange={(e) => {
                    setSearch(e.target.value)
                }}
                placeholder="Search for..."
                className="w-full rounded-md pl-[20px] py-[15px] border-none outline-none focus:border-emerald-500 focus:border-[1px] focus:border-solid border-gray-200 pr-[135px] pe-10 shadow-sm sm:text-sm"
            />

            <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                <button type="button" className="text-gray-600 hover:text-gray-700">
                    <span className="sr-only">Search</span>

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                    </svg>
                </button>
            </span>
        </div>
    )
}

export default Search
