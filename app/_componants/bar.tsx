"use client"

import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
function Baro(props: any) {
    ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
    const data3 = props.solutions.filter((e) => {
        return e.id_Question === props.id
    })

    const tes = data3.reduce((e, a) => {
        const key = a.solution;
        if (!e[key]) {
            e[key] = [];
        }
        e[key].push(a);

        return e;
    }, [])

    const values = Object.keys(tes);

    let [count, setCount] = useState([])
    useEffect(() => {
        let arr = []
        for (let i = 0; i < values.length; i++) {
            arr.push({
                name: values[i],
                count: tes[values[i]].length
            })
        }
        setCount(arr)
    }, [])


    const numbers = count.map((e) => {
        return e.count
    })
    const names = count.map((e) => {
        return e.name
    })



    console.log("testests", tes[0])

    console.log("testest", tes)

    console.log("data3", data3)



    const data = {
        labels: names,
        datasets: [
            {
                label: "solutions",
                data: numbers,
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: "top" },
            tooltip: { enabled: true },
        },
    };


    return (
        <Bar data={data} options={options} />
    )
}

export default Baro
